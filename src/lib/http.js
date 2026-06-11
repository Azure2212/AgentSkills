/* ============================================================
   HTTP infrastructure helpers (sessions, cookies, json, static)
   ============================================================ */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "..", "public");

/* ---- crypto / dates ---- */
function hashPw(pw, salt) { return crypto.scryptSync(pw, salt, 32).toString("hex"); }
const today = () => new Date().toISOString().slice(0, 10);

/* ---- in-memory sessions (token -> username) ---- */
const sessions = new Map();
function newSession(username) {
  const token = crypto.randomBytes(24).toString("hex");
  sessions.set(token, username);
  return token;
}
function delSession(token) { sessions.delete(token); }

/* ---- request helpers ---- */
function parseCookies(req) {
  const out = {};
  (req.headers.cookie || "").split(";").forEach((c) => {
    const i = c.indexOf("=");
    if (i > -1) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim());
  });
  return out;
}
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
  });
}

/* ---- responses ---- */
function json(res, code, obj, headers = {}) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", ...headers });
  res.end(JSON.stringify(obj));
}

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
};
function serveStatic(res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === "/") rel = "/index.html";
  const filePath = path.join(PUBLIC_DIR, path.normalize(rel));
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.readFile(filePath, (err, buf) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    res.end(buf);
  });
}

module.exports = {
  hashPw, today, sessions, newSession, delSession,
  parseCookies, readBody, json, serveStatic, PUBLIC_DIR,
};
