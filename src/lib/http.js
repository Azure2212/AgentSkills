/* ============================================================
   HTTP infrastructure helpers (sessions, cookies, json, static)
   ============================================================ */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { SESSION_SECRET } = require("../../config");

const PUBLIC_DIR = path.join(__dirname, "..", "..", "public");
const SESSION_TTL = 7 * 24 * 3600 * 1000; // 7 days

/* ---- crypto / dates ---- */
function hashPw(pw, salt) { return crypto.scryptSync(pw, salt, 32).toString("hex"); }
const today = () => new Date().toISOString().slice(0, 10);

/* ---- stateless sessions (HMAC-signed cookie; works on serverless) ---- */
function signSession(username) {
  const payload = Buffer.from(String(username)).toString("base64url") + "." + (Date.now() + SESSION_TTL);
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  return payload + "." + sig;
}
function verifySession(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [u, exp, sig] = parts;
  const good = crypto.createHmac("sha256", SESSION_SECRET).update(u + "." + exp).digest("base64url");
  if (sig !== good || Date.now() > Number(exp)) return null;
  try { return Buffer.from(u, "base64url").toString("utf8"); } catch { return null; }
}

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
    // Vercel may have already parsed the body
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === "string") { try { return resolve(JSON.parse(req.body)); } catch { return resolve({}); } }
      return resolve(req.body || {});
    }
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
  hashPw, today, signSession, verifySession,
  parseCookies, readBody, json, serveStatic, PUBLIC_DIR,
};
