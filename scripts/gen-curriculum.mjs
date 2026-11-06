// Generates docs/CURRICULUM.md (chapter + lesson map with URLs) from content/learn. Run: npm run curriculum
import fs from "node:fs";
import path from "node:path";

const ROOT = "content/learn";
const stripQuotes = (v) => v.replace(/^["']|["']$/g, "");
const field = (src, key) => {
  const line = src.split("\n").find((l) => l.startsWith(key + ":"));
  return line ? stripQuotes(line.slice(key.length + 1).trim()) : "";
};
const chapters = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

const lines = [
  "# Curriculum map (generated — do not edit by hand)",
  "",
  "Source of truth for chapter order, lesson order and internal link URLs. Regenerate: `npm run curriculum`.",
  "Status: draft = stub, in-progress = partial, done = passes ARTICLE_WRITING_RULES.md self-check (legacy stubs may say published).",
  "Each chapter starts with `00-overview` (chapter intro + roadmap). It is not counted as a lesson.",
  "",
];
for (const c of chapters) {
  const meta = JSON.parse(
    fs.readFileSync(path.join(ROOT, c, "meta.json"), "utf8"),
  );
  lines.push(`## ${c}`, "", `Chapter title: ${meta.title ?? c}`, "");
  const pages = [
    ...new Set(
      fs
        .readdirSync(path.join(ROOT, c))
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/(\.en|\.bn)?\.mdx$/, ""))
    ),
  ].sort();
  fs.writeFileSync(
    path.join(ROOT, c, "meta.json"),
    JSON.stringify({ ...meta, pages }, null, 2) + "\n",
  );
  lines.push("| # | Lesson | Level | Status | URL |", "|---|---|---|---|---|");
  const files = fs
    .readdirSync(path.join(ROOT, c))
    .filter((f) => f.endsWith(".mdx") && !f.endsWith(".en.mdx"))
    .sort();
  for (const f of files) {
    const src = fs
      .readFileSync(path.join(ROOT, c, f), "utf8")
      .replaceAll("\r", "");
    const slug = f.replace(/\.mdx$/, "");
    lines.push(
      `| ${slug.slice(0, 2)} | ${field(src, "title")} | ${field(src, "level")} | ${field(src, "status")} | \`/bn/learn/${c}/${slug}\` |`,
    );
  }
  lines.push("");
}
fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/CURRICULUM.md", lines.join("\n"));
console.log("docs/CURRICULUM.md written,", chapters.length, "chapters");
