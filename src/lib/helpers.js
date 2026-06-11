/* ============================================================
   Domain helpers (roles, user factory, sanitisers)
   ============================================================ */
const crypto = require("crypto");
const { hashPw, today } = require("./http");

const RANK = { user: 1, "sub-admin": 2, admin: 3 };
const PLATFORM_IDS = new Set([
  "email", "github", "facebook", "twitter", "linkedin",
  "instagram", "youtube", "discord", "telegram", "website",
]);

function makeUser({ username, displayName, handle, password, role = "user", provider = "local" }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const initials = (displayName || username).trim().slice(0, 2).toUpperCase();
  return {
    username: username.toLowerCase(),
    displayName: displayName || username,
    handle: handle || "@" + username.toLowerCase(),
    salt,
    passHash: password != null ? hashPw(password, salt) : "",
    role,
    provider,
    avatar: initials,
    status: "active",
    createdAt: today(),
    lastLogin: null,
    lastContribution: null,
    profileViews: 0,
    links: [],
  };
}

/* strip secrets + Mongo _id before sending to the client */
function publicUser(u) {
  if (!u) return null;
  const { _id, salt, passHash, ...safe } = u;
  return safe;
}

/* who may manage another account's role/status */
function canManageTarget(me, target) {
  if (!me || !target) return false;
  if (target.username === "azure" || me.username === target.username) return false;
  if (me.role === "admin") return true;
  if (me.role === "sub-admin") return target.role === "user";
  return false;
}

function slugify(s) {
  return String(s || "").toLowerCase().normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24);
}

module.exports = { RANK, PLATFORM_IDS, makeUser, publicUser, canManageTarget, slugify };
