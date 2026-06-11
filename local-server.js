/* ============================================================
   AgentSkills — entry point (MVC + MongoDB)
   Run:  npm start   →   http://localhost:3000

   Layout:
     config.js            connection string & port
     src/db.js            MongoDB connection
     src/models/*         data access (Model)
     src/controllers.js   request handlers (Controller)
     src/routes.js        route table
     src/seed.js          first-run seeding / migration
     public/              frontend (View)
   ============================================================ */
const http = require("http");
const url = require("url");
const { PORT } = require("./config");
const { connect } = require("./src/db");
const { seed } = require("./src/seed");
const routes = require("./src/routes");
const { currentUser } = require("./src/controllers");
const { json, serveStatic } = require("./src/lib/http");

const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  try {
    if (pathname.startsWith("/api/")) {
      const me = await currentUser(req);
      for (const r of routes) {
        if (r.method !== req.method) continue;
        const m = pathname.match(r.pattern);
        if (!m) continue;
        const params = m.slice(1).map((x) => decodeURIComponent(x));
        return await r.handler({ req, res, me, params, query });
      }
      return json(res, 404, { error: "API không tồn tại." });
    }
    serveStatic(res, pathname);
  } catch (e) {
    console.error("Request error:", e);
    json(res, 500, { error: String((e && e.message) || e) });
  }
});

(async () => {
  await connect();
  await seed();
  server.listen(PORT, () => {
    console.log(`\n  AgentSkills → http://localhost:${PORT}\n  Admin: Azure / 221222002\n`);
  });
})().catch((e) => {
  console.error("❌ Khởi động thất bại:", e.message);
  process.exit(1);
});
