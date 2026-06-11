/* ============================================================
   Route table — order matters (specific patterns first).
   ============================================================ */
const c = require("./controllers");

module.exports = [
  { method: "GET", pattern: /^\/api\/me$/, handler: c.me },
  { method: "POST", pattern: /^\/api\/me\/links$/, handler: c.meLinks },
  { method: "POST", pattern: /^\/api\/visit$/, handler: c.visit },
  { method: "GET", pattern: /^\/api\/visits$/, handler: c.visitsGet },
  { method: "GET", pattern: /^\/api\/report$/, handler: c.report },

  { method: "POST", pattern: /^\/api\/register$/, handler: c.register },
  { method: "POST", pattern: /^\/api\/login$/, handler: c.login },
  { method: "POST", pattern: /^\/api\/oauth$/, handler: c.oauth },
  { method: "POST", pattern: /^\/api\/logout$/, handler: c.logout },

  { method: "GET", pattern: /^\/api\/users$/, handler: c.usersList },
  { method: "POST", pattern: /^\/api\/users\/([^/]+)\/role$/, handler: c.roleChange },
  { method: "POST", pattern: /^\/api\/users\/([^/]+)\/status$/, handler: c.statusChange },
  { method: "GET", pattern: /^\/api\/users\/([^/]+)$/, handler: c.profileGet },

  { method: "GET", pattern: /^\/api\/categories$/, handler: c.categoriesList },
  { method: "POST", pattern: /^\/api\/categories$/, handler: c.categoryCreate },
  { method: "PATCH", pattern: /^\/api\/categories\/([^/]+)$/, handler: c.categoryUpdate },
  { method: "PUT", pattern: /^\/api\/categories\/([^/]+)$/, handler: c.categoryUpdate },
  { method: "DELETE", pattern: /^\/api\/categories\/([^/]+)$/, handler: c.categoryDelete },

  { method: "GET", pattern: /^\/api\/download\/all$/, handler: c.downloadAll },
  { method: "GET", pattern: /^\/api\/download\/category\/([^/]+)$/, handler: c.downloadCategory },
  { method: "GET", pattern: /^\/api\/download\/skill\/([^/]+)$/, handler: c.downloadSkill },

  { method: "GET", pattern: /^\/api\/skills$/, handler: c.skillsList },
  { method: "POST", pattern: /^\/api\/skills$/, handler: c.skillCreate },
  { method: "GET", pattern: /^\/api\/skills\/([^/]+)$/, handler: c.skillGet },
  { method: "PATCH", pattern: /^\/api\/skills\/([^/]+)$/, handler: c.skillUpdate },
  { method: "PUT", pattern: /^\/api\/skills\/([^/]+)$/, handler: c.skillUpdate },
  { method: "DELETE", pattern: /^\/api\/skills\/([^/]+)$/, handler: c.skillDelete },
];
