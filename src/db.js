/* ============================================================
   MongoDB connection (singleton)
   ============================================================ */
const { MongoClient } = require("mongodb");
const { MONGODB_URI, DB_NAME } = require("../config");

let client = null;
let db = null;

async function connect() {
  if (db) return db;
  client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`✔ Connected to MongoDB → db "${DB_NAME}"`);
  return db;
}

function getDb() {
  if (!db) throw new Error("MongoDB chưa kết nối. Gọi connect() trước.");
  return db;
}

const col = (name) => getDb().collection(name);

module.exports = { connect, getDb, col };
