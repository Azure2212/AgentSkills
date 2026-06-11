/* Model: skills collection (skills + collections) */
const { col } = require("../db");
const C = () => col("skills");

async function listSkills() { return C().find({}).sort({ _id: -1 }).toArray(); }
async function findSkill(id) { return C().findOne({ id }); }
async function insertSkill(skill) { await C().insertOne(skill); return skill; }
async function saveSkill(skill) {
  const { _id, ...doc } = skill;
  await C().replaceOne({ id: skill.id }, doc, { upsert: true });
  return skill;
}
async function deleteSkill(id) { return (await C().deleteOne({ id })).deletedCount > 0; }
async function countSkills(filter = {}) { return C().countDocuments(filter); }
async function incDownloads(id) { await C().updateOne({ id }, { $inc: { downloads: 1 } }); }

module.exports = { listSkills, findSkill, insertSkill, saveSkill, deleteSkill, countSkills, incDownloads };
