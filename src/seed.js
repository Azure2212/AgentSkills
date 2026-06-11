/* ============================================================
   Seed initial data into MongoDB (first run only).
   - Exactly ONE user: Azure (admin).
   - Categories: the taxonomy used by the real guides.
   - Skills/collections: imported from real guide content in
     config.GUIDES_DIR (no synthetic/sample data).
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { col } = require("./db");
const { makeUser, slugify } = require("./lib/helpers");
const { today } = require("./lib/http");
const { GUIDES_DIR } = require("../config");

const AZURE = { name: "Azure", handle: "@azure", avatar: "AZ" };

const CATEGORIES = [
  { id: "ai", vi: "AI & Prompting", en: "AI & Prompting" },
  { id: "coding", vi: "Lập trình", en: "Coding" },
  { id: "research", vi: "Nghiên cứu", en: "Research" },
  { id: "writing", vi: "Viết & Tài liệu", en: "Writing & Docs" },
  { id: "workflow", vi: "Quy trình & Tổ chức", en: "Workflow & Org" },
];

/* Curated metadata; file list + readme are read from disk. */
const GUIDES = [
  {
    id: "project-structure-templates", folder: "project_structure_templates",
    type: "collection", category: "coding", lang: "en",
    title: "Project Structure Templates",
    description: "Reusable blueprints for organizing deep-learning projects — a domain-agnostic CORE skeleton plus VISION, NLP and AUDIO domain contracts, an index and a starter prompt.",
    tags: ["project-structure", "deep-learning", "template"],
    readmeFile: "INDEX.md",
  },
  {
    id: "research-paper-templates", folder: "research_paper_templates",
    type: "collection", category: "research", lang: "en",
    title: "Research Paper Templates",
    description: "Guides for reading papers, planning a new research topic end-to-end, and the mandatory rules for citing literature and writing up findings.",
    tags: ["research", "paper", "citation", "writing"],
    readmeFile: "PAPER_READING_GUIDE.md",
  },
  {
    id: "working-in-organization", folder: "Working_In_Organization",
    type: "collection", category: "workflow", lang: "vi",
    title: "Vận hành tổ chức Coding-Agent",
    description: "Bộ quy tắc vận hành cho tổ chức coding-agent: mô hình Manager–Worker (GuideTeam) và tác phong làm việc Solo giữa Boss và một AI agent.",
    tags: ["agent", "tổ-chức", "quy-trình"],
    readmeFile: "GuideTeam.md",
  },
  {
    id: "latex-rules", folder: "tool_use",
    type: "skill", category: "writing", lang: "en",
    title: "LaTeX Rules",
    description: "Mandatory rules to follow whenever producing LaTeX — documents, reports, papers, CVs or slides — with each job living in its own package folder.",
    tags: ["latex", "document", "rules"],
    readmeFile: "latex.md",
  },
];

function sizeStr(bytes) {
  return bytes > 1048576 ? (bytes / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(bytes / 1024)) + " KB";
}

function buildSkillFromDisk(g) {
  const dir = path.join(GUIDES_DIR, g.folder);
  const mdFiles = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".md"));
  if (!mdFiles.length) return null;
  const files = mdFiles.map((name) => ({ name, type: "MD", size: sizeStr(fs.statSync(path.join(dir, name)).size) }));
  const readmeName = mdFiles.includes(g.readmeFile) ? g.readmeFile : mdFiles[0];
  const readme = fs.readFileSync(path.join(dir, readmeName), "utf8");
  return {
    id: g.id, type: g.type, lang: g.lang, title: g.title,
    authorUsername: "azure", author: AZURE,
    description: g.description, category: g.category, tags: g.tags,
    stars: 0, downloads: 0, rating: 0, updated: today(), license: "MIT", format: "MD",
    files, readme, comments: [], status: "approved",
  };
}

async function seed() {
  const users = col("users"), skills = col("skills"), cats = col("categories"), visits = col("visits");
  await users.createIndex({ username: 1 }, { unique: true });
  await skills.createIndex({ id: 1 }, { unique: true });
  await cats.createIndex({ id: 1 }, { unique: true });

  if (await users.countDocuments() === 0) {
    const azure = makeUser({ username: "Azure", displayName: "Azure", handle: "@azure", password: "22122002", role: "admin" });
    azure.avatar = "AZ";
    await users.insertOne(azure);
    console.log("✔ user seeded: Azure / 22122002 (admin)");
  }

  if (await cats.countDocuments() === 0) {
    await cats.insertMany(CATEGORIES.map((c) => ({ ...c })));
    console.log(`✔ categories seeded (${CATEGORIES.length})`);
  }

  if (await skills.countDocuments() === 0) {
    const docs = [];
    for (const g of GUIDES) {
      try {
        const s = buildSkillFromDisk(g);
        if (s) docs.push(s);
        else console.warn(`⚠ bỏ qua "${g.folder}" (không có file .md)`);
      } catch (e) {
        console.warn(`⚠ không đọc được "${g.folder}": ${e.message}`);
      }
    }
    if (docs.length) {
      await skills.insertMany(docs);
      console.log(`✔ guides imported from ${GUIDES_DIR} (${docs.length})`);
    } else {
      console.warn(`⚠ Không import được guide nào — kiểm tra GUIDES_DIR: ${GUIDES_DIR}`);
    }
  }

  if (await visits.countDocuments({ _id: "global" }) === 0) {
    await visits.insertOne({ _id: "global", daily: {} });
  }
}

module.exports = { seed };
