/* ============================================================
   Vercel serverless entry — handles every /api/* request.
   vercel.json routes "/api/(.*)" → "/api/index.js?p=$1", so the
   original path is reconstructed from the `p` query param.
   ============================================================ */
const url = require("url");
const { connect } = require("../src/db");
const routes = require("../src/routes");
const { currentUser } = require("../src/controllers");
const { json } = require("../src/lib/http");

module.exports = async (req, res) => {
  try {
    await connect();
    const parsed = url.parse(req.url, true);
    const pathname = parsed.query && parsed.query.p !== undefined
      ? "/api/" + parsed.query.p
      : parsed.pathname;

    const me = await currentUser(req);
    for (const r of routes) {
      if (r.method !== req.method) continue;
      const m = pathname.match(r.pattern);
      if (!m) continue;
      const params = m.slice(1).map((x) => decodeURIComponent(x));
      return await r.handler({ req, res, me, params, query: parsed.query });
    }
    return json(res, 404, { error: "API không tồn tại." });
  } catch (e) {
    console.error("API error:", e);
    try { json(res, 500, { error: String((e && e.message) || e) }); } catch (_) {}
  }
};
