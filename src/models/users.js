/* Model: users collection */
const { col } = require("../db");
const C = () => col("users");

async function findUser(username) {
  if (!username) return null;
  return C().findOne({ username: String(username).toLowerCase() });
}
async function listUsers() { return C().find({}).toArray(); }
async function saveUser(user) {
  const { _id, ...doc } = user;
  await C().replaceOne({ username: doc.username }, doc, { upsert: true });
  return user;
}
async function countUsers() { return C().countDocuments(); }

module.exports = { findUser, listUsers, saveUser, countUsers };
