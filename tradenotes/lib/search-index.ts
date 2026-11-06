import { chapters, lessonHref, pad } from "./curriculum";
import { glossary } from "./glossary";
import { patterns } from "./patterns";
import { getNoteMetas } from "./notes";
import type { SearchItem } from "./search";

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [
    { title: "Learn", kind: "Page", href: "/learn", hint: "All chapters" },
    { title: "Candlestick Patterns", kind: "Page", href: "/patterns" },
    { title: "Charts", kind: "Page", href: "/charts", hint: "Annotated examples" },
    { title: "Glossary", kind: "Page", href: "/glossary", hint: "English and Bengali" },
    { title: "Risk Calculator", kind: "Page", href: "/risk-calculator", hint: "Position size from account risk" },
    { title: "Notes", kind: "Page", href: "/notes", hint: "ICT, SMC and price action notes" },
    { title: "Journal", kind: "Page", href: "/journal", hint: "Trade log and stats" },
    { title: "About", kind: "Page", href: "/about" },
    { title: "Disclaimer", kind: "Page", href: "/disclaimer" },
  ];
  for (const c of chapters) {
    items.push({ title: `${pad(c.n)} ${c.title}`, kind: "Chapter", href: `/learn/${c.slug}`, hint: `${c.lessons.length} lessons` });
    for (const l of c.lessons) {
      items.push({ title: l.title, kind: "Lesson", href: lessonHref(c, l), hint: `Chapter ${pad(c.n)} · ${l.summary}` });
    }
  }
  for (const p of patterns) {
    items.push({ title: p.name, kind: "Pattern", href: `/patterns/${p.slug}`, hint: `${p.size} · ${p.signal}` });
  }
  for (const g of glossary) {
    items.push({ title: g.term, kind: "Glossary", href: `/glossary#${g.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, hint: g.def });
  }
  for (const n of getNoteMetas()) {
    items.push({ title: n.title, kind: "Note", href: `/notes/${n.slug}`, hint: n.tags.join(" · ") });
  }
  return items;
}
