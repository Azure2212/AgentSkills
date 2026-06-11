/* ============================================================
   MongoDB connection (singleton)
   ============================================================ */
const { MongoClient } = require("mongodb");
const { MONGODB_URI, DB_NAME } = require("../config");

let db = null;
// Cache the connection promise across (warm) serverless invocations.
let _promise = globalThis.__agentskillsMongo || null;

async function connect() {
  if (db) return db;
  if (!_promise) {
    const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 8000, connectTimeoutMS: 8000 });
    _promise = client.connect().then((c) => {
      db = c.db(DB_NAME);
      console.log(`✔ Connected to MongoDB → db "${DB_NAME}"`);
      return db;
    }).catch((e) => {
      // don't cache a failed connection — let the next request retry
      _promise = null;
      globalThis.__agentskillsMongo = null;
      throw e;
    });
    globalThis.__agentskillsMongo = _promise;
  }
  db = await _promise;
  return db;
}

function getDb() {
  if (!db) throw new Error("MongoDB chưa kết nối. Gọi connect() trước.");
  return db;
}

const col = (name) => getDb().collection(name);

module.exports = { connect, getDb, col };
