import type { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";
import { source, patternsSource } from "@/lib/source";
import { patternsData } from "@/lib/patterns-data";
import { getNoteMetas } from "@/lib/notes";
import { SITE_URL, localeAlternates } from "@/lib/seo";

const STATIC_PATHS = [
  "",
  "/patterns",
  "/charts",
  "/glossary",
  "/tools/risk-calculator",
  "/notes",
  "/journal",
  "/about",
  "/disclaimer",
];

const absolute = (path: string) => new URL(path, SITE_URL).toString();

type Entry = MetadataRoute.Sitemap[number];

/** One entry per locale, each carrying hreflang alternates for the locales that have the page. */
function localizedEntries(
  path: string,
  available: readonly string[],
  extra: Partial<Entry> = {},
): MetadataRoute.Sitemap {
  const { languages = {} } = localeAlternates(available[0], path, available);
  const alternates = {
    languages: Object.fromEntries(
      Object.entries(languages).map(([l, href]) => [l, absolute(String(href))]),
    ),
  };
  return available.map((lang) => ({
    url: absolute(`/${lang}${path}`),
    alternates,
    ...extra,
  }));
}

function learnEntries(): MetadataRoute.Sitemap {
  const bySlug = new Map<string, string[]>();
  for (const lang of i18n.languages) {
    for (const page of source.getPages(lang)) {
      const key = page.slugs.join("/");
      bySlug.set(key, [...(bySlug.get(key) ?? []), lang]);
    }
  }
  return [...bySlug].flatMap(([slug, langs]) =>
    localizedEntries(slug ? `/learn/${slug}` : "/learn", langs, {
      changeFrequency: "monthly",
    }),
  );
}

function patternEntries(): MetadataRoute.Sitemap {
  const ids = new Set<string>(patternsData.map((p) => p.id));
  for (const page of patternsSource.getPages()) {
    if (page.slugs[0]) ids.add(page.slugs[0]);
  }
  return [...ids].flatMap((id) =>
    localizedEntries(`/patterns/${id}`, i18n.languages, {
      changeFrequency: "monthly",
    }),
  );
}

function noteEntries(): MetadataRoute.Sitemap {
  return getNoteMetas("en").flatMap((n) =>
    localizedEntries(`/notes/${n.slug}`, i18n.languages, {
      changeFrequency: "monthly",
    }),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.flatMap((path) =>
      localizedEntries(path, i18n.languages, { changeFrequency: "weekly" }),
    ),
    ...learnEntries(),
    ...patternEntries(),
    ...noteEntries(),
  ];
}
