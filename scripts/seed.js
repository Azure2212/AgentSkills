/* Run once to seed/populate MongoDB:  node scripts/seed.js
   (Imports real guides from config.GUIDES_DIR when collections are empty.) */
const { connect } = require("../src/db");
const { seed } = require("../src/seed");

(async () => {
  await connect();
  await seed();
  console.log("✔ Seed hoàn tất.");
  process.exit(0);
})().catch((e) => { console.error("Seed lỗi:", e.message); process.exit(1); });
