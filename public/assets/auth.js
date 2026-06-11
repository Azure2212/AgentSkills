/* ============================================================
   AgentSkills — frontend auth & nav (runs on every page)
   ============================================================ */
window.CURRENT_USER = null;

const ROLE_STYLE = {
  admin: "bg-rose-100 text-rose-700",
  "sub-admin": "bg-amber-100 text-amber-700",
  user: "bg-slate-100 text-slate-600",
};
function roleBadge(role) {
  return `<span class="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${ROLE_STYLE[role] || ROLE_STYLE.user}">${t("role." + role) || role}</span>`;
}

async function fetchMe() {
  try {
    const r = await fetch("/api/me");
    const d = await r.json();
    window.CURRENT_USER = d.user || null;
  } catch (e) { window.CURRENT_USER = null; }
  renderNavAuth();
  guard();
  document.dispatchEvent(new CustomEvent("auth:changed"));
}

function renderNavAuth() {
  const el = document.getElementById("navAuth");
  if (!el) return;
  const u = window.CURRENT_USER;

  if (!u) {
    el.innerHTML = `
      <a href="login.html" class="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">${t("nav.login")}</a>
      <a href="register.html" class="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors">${t("nav.register")}</a>`;
    return;
  }

  const isAdmin = u.role === "admin" || u.role === "sub-admin";
  el.innerHTML = `
    <div class="relative">
      <button id="userMenuBtn" class="flex items-center gap-2 rounded-full hover:opacity-90 transition-opacity">
        <span class="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold grid place-items-center">${u.avatar}</span>
      </button>
      <div id="userMenu" class="hidden absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/60 py-1 z-50">
        <div class="px-4 py-3 border-b border-slate-100">
          <div class="text-sm font-semibold text-slate-800 truncate">${u.displayName}</div>
          <div class="text-xs text-slate-400 mb-1.5">${u.handle}</div>
          ${roleBadge(u.role)}
        </div>
        <a href="profile.html?u=${u.username}" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">${t("nav.profile")}</a>
        ${isAdmin ? `<a href="admin.html" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">${t("nav.admin")}</a>` : ""}
        <button onclick="doLogout()" class="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">${t("nav.logout")}</button>
      </div>
    </div>`;

  const btn = document.getElementById("userMenuBtn");
  const menu = document.getElementById("userMenu");
  btn.addEventListener("click", (e) => { e.stopPropagation(); menu.classList.toggle("hidden"); });
  document.addEventListener("click", () => menu.classList.add("hidden"));
}

async function doLogout() {
  await fetch("/api/logout", { method: "POST" });
  window.CURRENT_USER = null;
  location.href = "index.html";
}

/* page guards via <body data-require-auth> / <body data-require-role="sub-admin"> */
function guard() {
  const reqAuth = document.body.hasAttribute("data-require-auth");
  const reqRole = document.body.getAttribute("data-require-role");
  if ((reqAuth || reqRole) && !window.CURRENT_USER) {
    location.href = "login.html?next=" + encodeURIComponent(location.pathname.replace(/^\//, "") + location.search);
  }
}

async function countVisit() {
  try {
    const r = await fetch("/api/visit", { method: "POST" });
    if (r.ok) { const d = await r.json(); window.SITE_VISITS = d.total; if (typeof renderFooter === "function") renderFooter(); }
  } catch (e) { /* ignore */ }
}

document.addEventListener("DOMContentLoaded", fetchMe);
document.addEventListener("DOMContentLoaded", countVisit);
document.addEventListener("i18n:changed", renderNavAuth);
