/* ============================================================
   Vercel serverless entry — handles every /api/* request.
   Reuses the same router/controllers/models as local server.js.
   ============================================================ */
const url = require("url");
const { connect } = require("../src/db");
const routes = require("../src/routes");
const { currentUser } = require("../src/controllers");
const { json } = require("../src/lib/http");

module.exports = async (req, res) => {
  try {
    await connect();
    const { pathname, query } = url.parse(req.url, true);
    const me = await currentUser(req);
    for (const r of routes) {
      if (r.method !== req.method) continue;
      const m = pathname.match(r.pattern);
      if (!m) continue;
      const params = m.slice(1).map((x) => decodeURIComponent(x));
      return await r.handler({ req, res, me, params, query });
    }
    return json(res, 404, { error: "API không tồn tại." });
  } catch (e) {
    console.error("API error:", e);
    json(res, 500, { error: String((e && e.message) || e) });
  }
};
