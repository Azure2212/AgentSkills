/* ============================================================
   Controllers — request handlers. Each receives a ctx:
   { req, res, me, params, query }
   ============================================================ */
const JSZip = require("jszip");
const { json, readBody, parseCookies, newSession, delSession, sessions, hashPw, today } = require("./lib/http");
const { RANK, PLATFORM_IDS, makeUser, publicUser, canManageTarget, slugify } = require("./lib/helpers");
const Users = require("./models/users");
const Skills = require("./models/skills");
const Cats = require("./models/categories");
const Visits = require("./models/visits");

const SESSION_COOKIE = (token) => `sh_session=${token}; HttpOnly; Path=/; SameSite=Lax`;
const visitsTotal = (v) => Object.values(v.daily).reduce((a, b) => a + b, 0);

async function currentUser(req) {
  const token = parseCookies(req)["sh_session"];
  if (!token) return null;
  const username = sessions.get(token);
  return username ? await Users.findUser(username) : null;
}

async function profileFor(username) {
  const u = await Users.findUser(username);
  if (!u) return null;
  const mine = (await Skills.listSkills()).filter((s) => s.authorUsername === u.username && s.status !== "rejected");
  const stats = {
    totalStars: mine.reduce((a, s) => a + (s.stars || 0), 0),
    totalDownloads: mine.reduce((a, s) => a + (s.downloads || 0), 0),
    skillsCount: mine.filter((s) => s.type === "skill").length,
    collectionsCount: mine.filter((s) => s.type === "collection").length,
    categories: {},
  };
  mine.forEach((s) => { stats.categories[s.category] = (stats.categories[s.category] || 0) + 1; });
  return {
    user: publicUser(u),
    stats,
    contributions: mine.map((s) => ({
      id: s.id, title: s.title, type: s.type, category: s.category,
      stars: s.stars, downloads: s.downloads, lang: s.lang, format: s.format, status: s.status, updated: s.updated,
    })),
  };
}

/* ---------- auth ---------- */
function me({ res, me }) { json(res, 200, { user: publicUser(me) }); }

async function register({ req, res }) {
  const b = await readBody(req);
  const username = (b.username || "").trim();
  if (!username || !b.password) return json(res, 400, { error: "Thiếu tên đăng nhập hoặc mật khẩu." });
  if (await Users.findUser(username)) return json(res, 409, { error: "Tên đăng nhập đã tồn tại." });
  const user = makeUser({ username, displayName: b.displayName || username, password: b.password, role: "user" });
  user.lastLogin = today();
  await Users.saveUser(user);
  json(res, 200, { user: publicUser(user) }, { "Set-Cookie": SESSION_COOKIE(newSession(user.username)) });
}

async function login({ req, res }) {
  const b = await readBody(req);
  const user = await Users.findUser(b.username);
  if (!user || !user.passHash || hashPw(b.password || "", user.salt) !== user.passHash)
    return json(res, 401, { error: "Sai tên đăng nhập hoặc mật khẩu." });
  if (user.status === "banned") return json(res, 403, { error: "Tài khoản đã bị cấm." });
  user.lastLogin = today();
  await Users.saveUser(user);
  json(res, 200, { user: publicUser(user) }, { "Set-Cookie": SESSION_COOKIE(newSession(user.username)) });
}

async function oauth({ req, res }) {
  const b = await readBody(req);
  const provider = (b.provider || "google").toLowerCase();
  const ident = (b.identifier || "").trim().toLowerCase();
  if (!ident) return json(res, 400, { error: "Thiếu email/handle." });
  const username = `${provider}_${ident.replace(/[^a-z0-9]/g, "").slice(0, 24)}`;
  let user = await Users.findUser(username);
  if (!user) user = makeUser({ username, displayName: ident.split("@")[0], handle: "@" + ident.split("@")[0], role: "user", provider });
  if (user.status === "banned") return json(res, 403, { error: "Tài khoản đã bị cấm." });
  user.lastLogin = today();
  await Users.saveUser(user);
  json(res, 200, { user: publicUser(user) }, { "Set-Cookie": SESSION_COOKIE(newSession(user.username)) });
}

function logout({ req, res }) {
  const token = parseCookies(req)["sh_session"];
  if (token) delSession(token);
  json(res, 200, { ok: true }, { "Set-Cookie": "sh_session=; HttpOnly; Path=/; Max-Age=0" });
}

async function meLinks({ req, res, me }) {
  if (!me) return json(res, 401, { error: "Cần đăng nhập." });
  const b = await readBody(req);
  const arr = Array.isArray(b.links) ? b.links : [];
  me.links = arr.slice(0, 20).map((l) => ({
    platform: PLATFORM_IDS.has(String(l && l.platform)) ? String(l.platform) : "website",
    value: String((l && l.value) || "").trim().slice(0, 300),
  })).filter((l) => l.value);
  await Users.saveUser(me);
  json(res, 200, { user: publicUser(me) });
}

/* ---------- users ---------- */
async function usersList({ res, me }) {
  if (!me || RANK[me.role] < 2) return json(res, 403, { error: "Không đủ quyền." });
  json(res, 200, { users: (await Users.listUsers()).map(publicUser) });
}

async function profileGet({ res, me, params }) {
  const uname = params[0].toLowerCase();
  const prof = await profileFor(uname);
  if (!prof) return json(res, 404, { error: "Không tìm thấy người dùng." });
  if (!me || me.username !== uname) {
    const u = await Users.findUser(uname);
    u.profileViews = (u.profileViews || 0) + 1;
    await Users.saveUser(u);
    prof.user.profileViews = u.profileViews;
  }
  json(res, 200, prof);
}

async function roleChange({ req, res, me, params }) {
  if (!me) return json(res, 401, { error: "Cần đăng nhập." });
  const b = await readBody(req);
  const target = await Users.findUser(params[0]);
  const newRole = b.role;
  if (!target) return json(res, 404, { error: "Không tìm thấy người dùng." });
  if (!RANK[newRole]) return json(res, 400, { error: "Role không hợp lệ." });
  if (target.username === "azure") return json(res, 403, { error: "Không thể đổi role của admin gốc (Azure)." });
  if (me.username === target.username) return json(res, 403, { error: "Không thể tự đổi role của chính mình." });
  if (me.role === "admin") { /* full control */ }
  else if (me.role === "sub-admin") {
    if (target.role !== "user") return json(res, 403, { error: "Sub-admin chỉ chỉnh được tài khoản đang ở bậc user." });
    if (newRole === "admin") return json(res, 403, { error: "Sub-admin không thể tạo admin." });
  } else return json(res, 403, { error: "Không đủ quyền." });
  target.role = newRole;
  await Users.saveUser(target);
  json(res, 200, { user: publicUser(target) });
}

async function statusChange({ req, res, me, params }) {
  if (!me) return json(res, 401, { error: "Cần đăng nhập." });
  const b = await readBody(req);
  const target = await Users.findUser(params[0]);
  const st = b.status;
  if (!target) return json(res, 404, { error: "Không tìm thấy người dùng." });
  if (st !== "active" && st !== "banned") return json(res, 400, { error: "Trạng thái không hợp lệ." });
  if (target.username === "azure") return json(res, 403, { error: "Không thể cấm admin gốc (Azure)." });
  if (me.username === target.username) return json(res, 403, { error: "Không thể tự đổi trạng thái của mình." });
  if (!canManageTarget(me, target)) return json(res, 403, { error: "Không đủ quyền." });
  target.status = st;
  await Users.saveUser(target);
  json(res, 200, { user: publicUser(target) });
}

/* ---------- categories ---------- */
async function categoriesList({ res }) { json(res, 200, { categories: await Cats.listCategories() }); }

async function categoryCreate({ req, res, me }) {
  if (!me || RANK[me.role] < 2) return json(res, 403, { error: "Chỉ admin / sub-admin được thêm danh mục." });
  const b = await readBody(req);
  const vi = (b.vi || "").trim(), en = (b.en || "").trim();
  if (!vi || !en) return json(res, 400, { error: "Cần nhập tên cả 2 ngôn ngữ." });
  const id = (b.id && slugify(b.id)) || slugify(en) || slugify(vi) || "cat-" + Date.now().toString(36);
  if (await Cats.findCategory(id)) return json(res, 409, { error: "Danh mục đã tồn tại." });
  const cat = { id, vi, en };
  await Cats.insertCategory(cat);
  json(res, 200, { category: cat });
}

async function categoryUpdate({ req, res, me, params }) {
  if (!me || me.role !== "admin") return json(res, 403, { error: "Chỉ admin được quản lý danh mục." });
  const b = await readBody(req);
  const c = await Cats.findCategory(params[0]);
  if (!c) return json(res, 404, { error: "Không tìm thấy danh mục." });
  const fields = {};
  if (b.vi) fields.vi = b.vi.trim();
  if (b.en) fields.en = b.en.trim();
  json(res, 200, { category: await Cats.updateCategory(params[0], fields) });
}

async function categoryDelete({ res, me, params }) {
  if (!me || me.role !== "admin") return json(res, 403, { error: "Chỉ admin được quản lý danh mục." });
  if (!(await Cats.deleteCategory(params[0]))) return json(res, 404, { error: "Không tìm thấy danh mục." });
  const affected = (await Skills.listSkills()).filter((s) => s.category === params[0]).length;
  json(res, 200, { ok: true, affected });
}

/* ---------- skills ---------- */
async function skillsList({ res }) { json(res, 200, { skills: await Skills.listSkills() }); }

async function skillCreate({ req, res, me }) {
  if (!me) return json(res, 401, { error: "Cần đăng nhập để đóng góp." });
  if (me.status === "banned") return json(res, 403, { error: "Tài khoản đã bị cấm." });
  const b = await readBody(req);
  let category = b.category || "ai";
  if (category === "__other__") {
    const cvi = String(b.newCatVi || "").trim(), cen = String(b.newCatEn || "").trim();
    if (cvi && cen) {
      const cid = slugify(cen) || slugify(cvi) || "cat-" + Date.now().toString(36);
      if (!(await Cats.findCategory(cid))) await Cats.insertCategory({ id: cid, vi: cvi, en: cen });
      category = cid;
    } else category = "ai";
  }
  const id = (b.title || "skill").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) + "-" + Date.now().toString(36);
  const skill = {
    id, type: b.type === "collection" ? "collection" : "skill", lang: b.lang === "en" ? "en" : "vi",
    title: b.title || "Untitled", authorUsername: me.username,
    author: { name: me.displayName, handle: me.handle, avatar: me.avatar },
    description: b.description || "", category,
    tags: Array.isArray(b.tags) ? b.tags : String(b.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
    stars: 0, downloads: 0, rating: 0, updated: today(), license: b.license || "MIT", format: (b.format || "MD").toUpperCase(),
    files: Array.isArray(b.files) && b.files.length ? b.files : [{ name: (b.title || "skill") + ".md", type: "MD", size: "—" }],
    readme: b.readme || `# ${b.title || "Skill"}\n\n${b.description || ""}`,
    comments: [], status: "approved",
  };
  await Skills.insertSkill(skill);
  me.lastContribution = today();
  await Users.saveUser(me);
  json(res, 200, { skill });
}

async function skillGet({ res, params }) {
  const s = await Skills.findSkill(params[0]);
  return s ? json(res, 200, { skill: s }) : json(res, 404, { error: "Không tìm thấy." });
}

async function skillUpdate({ req, res, me, params }) {
  if (!me) return json(res, 401, { error: "Cần đăng nhập." });
  if (me.status === "banned") return json(res, 403, { error: "Tài khoản đã bị cấm." });
  const s = await Skills.findSkill(params[0]);
  if (!s) return json(res, 404, { error: "Không tìm thấy." });
  const isOwner = s.authorUsername === me.username;
  if (!isOwner && RANK[me.role] < 2) return json(res, 403, { error: "Bạn không có quyền sửa nội dung này." });
  const b = await readBody(req);
  if (b.title != null && String(b.title).trim()) s.title = String(b.title).trim().slice(0, 200);
  if (b.description != null) s.description = String(b.description).slice(0, 2000);
  if (b.category != null) s.category = String(b.category);
  if (b.lang != null) s.lang = b.lang === "en" ? "en" : "vi";
  if (b.license != null) s.license = String(b.license).slice(0, 40);
  if (b.tags != null) s.tags = Array.isArray(b.tags) ? b.tags : String(b.tags).split(",").map((x) => x.trim()).filter(Boolean);
  if (b.readme != null) s.readme = String(b.readme).slice(0, 20000);
  s.edited = true; s.editedAt = today(); s.updated = today();
  await Skills.saveSkill(s);
  json(res, 200, { skill: s });
}

async function skillDelete({ res, me, params }) {
  if (!me || RANK[me.role] < 2) return json(res, 403, { error: "Chỉ admin / sub-admin được xoá skill." });
  if (!(await Skills.deleteSkill(params[0]))) return json(res, 404, { error: "Không tìm thấy." });
  json(res, 200, { ok: true });
}

/* ---------- analytics ---------- */
async function visit({ req, res }) {
  const td = today();
  let headers = {};
  if (parseCookies(req)["sh_seen"] !== td) {
    await Visits.incVisit(td);
    headers = { "Set-Cookie": `sh_seen=${td}; Path=/; Max-Age=86400; SameSite=Lax` };
  }
  const v = await Visits.getVisits();
  json(res, 200, { total: visitsTotal(v), today: v.daily[td] || 0 }, headers);
}
async function visitsGet({ res }) {
  const v = await Visits.getVisits();
  json(res, 200, { total: visitsTotal(v), today: v.daily[today()] || 0 });
}

async function report({ res, me }) {
  if (!me || RANK[me.role] < 2) return json(res, 403, { error: "Không đủ quyền." });
  const users = await Users.listUsers();
  const skills = await Skills.listSkills();
  const v = await Visits.getVisits();
  const td = today();
  const catCount = {};
  skills.forEach((s) => { catCount[s.category] = (catCount[s.category] || 0) + 1; });
  const byUser = {};
  skills.forEach((s) => {
    if (!s.authorUsername) return;
    byUser[s.authorUsername] = byUser[s.authorUsername] || { count: 0, stars: 0 };
    byUser[s.authorUsername].count++;
    byUser[s.authorUsername].stars += (s.stars || 0);
  });
  const topContributors = Object.entries(byUser).map(([username, d]) => {
    const u = users.find((x) => x.username === username);
    return { username, displayName: u ? u.displayName : username, avatar: u ? u.avatar : "?", count: d.count, stars: d.stars };
  }).sort((a, b) => b.count - a.count).slice(0, 10);
  json(res, 200, {
    visits: { total: visitsTotal(v), today: v.daily[td] || 0, daily: v.daily },
    totals: {
      users: users.length,
      skills: skills.filter((s) => s.type === "skill").length,
      collections: skills.filter((s) => s.type === "collection").length,
      contributions: skills.length,
    },
    categories: Object.entries(catCount).map(([id, count]) => ({ id, count })),
    topContributors,
    registrations: users.map((u) => ({ date: u.createdAt })),
  });
}

/* ---------- downloads (ZIP export) ---------- */
function metaOf(s) { const { _id, readme, ...x } = s; return x; }
function addSkillToZip(zip, s, prefix) {
  const f = prefix ? zip.folder(prefix) : zip;
  f.file(`${s.id}.md`, s.readme || `# ${s.title}\n`);
  f.file(`${s.id}.json`, JSON.stringify(metaOf(s), null, 2));
}
function sendZip(res, buf, filename) {
  res.writeHead(200, {
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": buf.length,
  });
  res.end(buf);
}

async function downloadSkill({ res, params }) {
  const s = await Skills.findSkill(params[0]);
  if (!s) return json(res, 404, { error: "Không tìm thấy." });
  await Skills.incDownloads(s.id);
  const zip = new JSZip();
  addSkillToZip(zip, s, "");
  sendZip(res, await zip.generateAsync({ type: "nodebuffer" }), `${s.id}.zip`);
}

async function downloadCategory({ res, params }) {
  const catId = params[0];
  const items = (await Skills.listSkills()).filter((s) => s.category === catId);
  if (!items.length) return json(res, 404, { error: "Danh mục trống hoặc không tồn tại." });
  const zip = new JSZip();
  for (const s of items) { addSkillToZip(zip, s, s.id); await Skills.incDownloads(s.id); }
  sendZip(res, await zip.generateAsync({ type: "nodebuffer" }), `category-${catId}.zip`);
}

async function downloadAll({ res }) {
  const items = await Skills.listSkills();
  if (!items.length) return json(res, 404, { error: "Chưa có nội dung." });
  const zip = new JSZip();
  for (const s of items) { addSkillToZip(zip, s, `${s.category}/${s.id}`); await Skills.incDownloads(s.id); }
  sendZip(res, await zip.generateAsync({ type: "nodebuffer" }), "agentskills-all.zip");
}

module.exports = {
  currentUser,
  me, register, login, oauth, logout, meLinks,
  usersList, profileGet, roleChange, statusChange,
  categoriesList, categoryCreate, categoryUpdate, categoryDelete,
  skillsList, skillCreate, skillGet, skillUpdate, skillDelete,
  visit, visitsGet, report,
  downloadSkill, downloadCategory, downloadAll,
};
