/* Model: categories collection */
const { col } = require("../db");
const C = () => col("categories");

async function listCategories() { return C().find({}).toArray(); }
async function findCategory(id) { return C().findOne({ id }); }
async function insertCategory(cat) { await C().insertOne(cat); return cat; }
async function updateCategory(id, fields) { await C().updateOne({ id }, { $set: fields }); return findCategory(id); }
async function deleteCategory(id) { return (await C().deleteOne({ id })).deletedCount > 0; }

module.exports = { listCategories, findCategory, insertCategory, updateCategory, deleteCategory };
