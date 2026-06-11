/* Model: visits collection — single doc { _id: "global", daily: { "YYYY-MM-DD": n } } */
const { col } = require("../db");
const C = () => col("visits");
const ID = "global";

async function getVisits() {
  const d = await C().findOne({ _id: ID });
  return d || { _id: ID, daily: {} };
}
async function incVisit(day) {
  await C().updateOne({ _id: ID }, { $inc: { ["daily." + day]: 1 } }, { upsert: true });
  return getVisits();
}

module.exports = { getVisits, incVisit };
