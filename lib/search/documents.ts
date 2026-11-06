import glossary from "@/content/glossary.json";
import { glossaryAnchorHash } from "@/lib/glossary";
import { i18n } from "@/lib/i18n";
import { getNoteMetas } from "@/lib/notes";
import { patternsSource, source } from "@/lib/source";
import {
  buildIndex,
  type SearchEntry,
  type SearchIndex,
  type SearchSection,
} from "./engine";

interface StructuredData {
  headings: { id: string; content: string }[];
  contents: { heading?: string; content: string }[];
}

interface MdxPage {
  url: string;
  data: {
    title?: string;
    description?: string;
    structuredData?: StructuredData;
    exports?: { structuredData?: StructuredData };
  };
}

interface GlossaryTerm {
  term: string;
  en: string;
  bn: string;
  exampleEn?: string;
  exampleBn?: string;
}

interface PageSource {
  getPages: (lang?: string) => MdxPage[];
}

const EMPTY_STRUCTURE: StructuredData = { headings: [], contents: [] };

function pageEntries(page: MdxPage, section: SearchSection): SearchEntry[] {
  const pageTitle = page.data.title ?? page.url;
  const base = { pageUrl: page.url, pageTitle, section };
  const data =
    page.data.structuredData ??
    page.data.exports?.structuredData ??
    EMPTY_STRUCTURE;
  const headingText = new Map(data.headings.map((h) => [h.id, h.content]));

  return [
    { ...base, url: page.url, kind: "page", text: page.data.description ?? "" },
    ...data.headings.map((h): SearchEntry => ({
      ...base,
      url: `${page.url}#${h.id}`,
      kind: "heading",
      text: h.content,
    })),
    ...data.contents
      .filter((c) => c.content.trim().length > 0)
      .map((c): SearchEntry => ({
        ...base,
        url: c.heading ? `${page.url}#${c.heading}` : page.url,
        kind: "text",
        heading: c.heading ? headingText.get(c.heading) : undefined,
        text: c.content,
      })),
  ];
}

function glossaryEntries(lang: string): SearchEntry[] {
  const isEn = lang === "en";
  return (glossary as GlossaryTerm[]).map((item) => {
    const definition = isEn ? item.en : item.bn;
    const example = isEn ? item.exampleEn : item.exampleBn;
    const url = `/${lang}/glossary#${glossaryAnchorHash(item.term)}`;
    return {
      pageUrl: url,
      pageTitle: item.term,
      section: "glossary",
      url,
      kind: "page",
      text: [definition, example].filter(Boolean).join(" "),
    };
  });
}

function noteEntries(lang: string): SearchEntry[] {
  return getNoteMetas(lang === "en" ? "en" : "bn").map((n) => {
    const url = `/${lang}/notes/${n.slug}`;
    return {
      pageUrl: url,
      pageTitle: n.title,
      section: "notes",
      url,
      kind: "page",
      text: [n.summary, n.tags.join(" ")].filter(Boolean).join(" "),
    };
  });
}

function collectEntries(lang: string): SearchEntry[] {
  const fromSource = (src: PageSource, section: SearchSection) =>
    src.getPages(lang).flatMap((page) => pageEntries(page, section));
  return [
    ...fromSource(source as PageSource, "learn"),
    ...fromSource(patternsSource as PageSource, "patterns"),
    ...glossaryEntries(lang),
    ...noteEntries(lang),
  ];
}

// Content is static per build, so each language index is built once per server process.
const cache = new Map<string, SearchIndex>();

export function isSearchLanguage(lang: string): boolean {
  return i18n.languages.includes(lang);
}

export function getSearchIndex(lang: string): SearchIndex {
  const cached = cache.get(lang);
  if (cached) return cached;
  const index = buildIndex(collectEntries(lang));
  cache.set(lang, index);
  return index;
}
