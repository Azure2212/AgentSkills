/* ============================================================
   AgentSkills — central config
   Credentials can be overridden by environment variables.
   ============================================================ */
module.exports = {
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://dasanbob22122002_db_user:8XYiITr1vitIEt93@aisharingskills.d7tjwq7.mongodb.net/?appName=AISharingSkills",
  DB_NAME: process.env.DB_NAME || "agentskills",
  PORT: Number(process.env.PORT) || 3000,
  // Source of real guide content imported into the DB on first run.
  GUIDES_DIR: process.env.GUIDES_DIR || "C:/Users/Dasan/OneDrive/Desktop/Vite_Code_Guides",
};
