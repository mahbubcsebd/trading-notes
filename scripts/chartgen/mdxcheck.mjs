import { compile } from "file:///D:/trading-knowledge/node_modules/@mdx-js/mdx/index.js";
import gfm from "file:///D:/trading-knowledge/node_modules/remark-gfm/index.js";
import { readFileSync, existsSync } from "node:fs";

const PATTERN_IDS = readFileSync("D:/trading-knowledge/lib/patternsData.ts", "utf8");
const files = process.argv.slice(2);
let bad = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8").replace(/^---[\s\S]*?---/, "");
  try {
    await compile(src, { remarkPlugins: [gfm] });
  } catch (e) {
    bad++;
    console.log("FAIL", f, e.message);
  }
  for (const m of src.matchAll(/id="([a-z0-9-]+)"/g)) {
    const p = `D:/trading-knowledge/content/charts/${m[1]}.json`;
    if (m[1].includes("-win-") || m[1].includes("-fail-")) {
      if (!existsSync(p)) { bad++; console.log("MISSING chart", m[1], f); }
    }
  }
  const body = src.split(/^## (?:Next steps|পরের ধাপ)/m)[0];
  const seen = new Map();
  for (const m of body.matchAll(/\]\((\/(?:bn|en)\/[^)#\s]+)/g)) seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  for (const [u, n] of seen) if (n > 1) { bad++; console.log("DUP link", u, n, f); }
  for (const m of src.matchAll(/\]\((\/(?:bn|en)\/(?:learn|patterns)\/[^)#\s]+)/g)) {
    const [, lang, kind, ...rest] = m[1].split("/");
    const slug = rest.join("/");
    const p = kind === "learn"
      ? `D:/trading-knowledge/content/learn/${slug}.mdx`
      : `D:/trading-knowledge/content/patterns/${slug}.${lang}.mdx`;
    const ok = kind === "learn" ? existsSync(p) : PATTERN_IDS.includes(`id: '${slug}'`);
    if (!ok) { bad++; console.log("BROKEN link", m[1], f); }
  }
}
console.log(bad ? `${bad} problem(s)` : `ok ${files.length} files`);
