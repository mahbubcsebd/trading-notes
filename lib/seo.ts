import type { Metadata } from "next";
import { i18n } from "@/lib/i18n";

const FALLBACK_SITE_URL = "http://localhost:3000";
export const SITE_NAME = "TradeNotes";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** Absolute origin used for canonical / hreflang / OG URLs. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
  try {
    return new URL(raw);
  } catch {
    console.error(
      `[seo] invalid NEXT_PUBLIC_SITE_URL "${raw}", using fallback`,
    );
    return new URL(FALLBACK_SITE_URL);
  }
})();

export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

const OG_LOCALE: Record<string, string> = { bn: "bn_BD", en: "en_US" };

export const ogLocale = (lang: string) => OG_LOCALE[lang] ?? OG_LOCALE.bn;

/**
 * `path` is the locale-less path ("" for home, "/patterns/hammer" …).
 * `available` limits hreflang to locales that actually have this page.
 */
export function localeAlternates(
  lang: string,
  path: string,
  available: readonly string[] = i18n.languages,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = Object.fromEntries(
    available.map((l) => [l, `/${l}${path}`]),
  );
  const defaultLang = available.includes(i18n.defaultLanguage)
    ? i18n.defaultLanguage
    : available[0];
  if (defaultLang) languages["x-default"] = `/${defaultLang}${path}`;
  return { canonical: `/${lang}${path}`, languages };
}

/** Standard per-page metadata: title, description, canonical, hreflang, OG, Twitter. */
export function pageMetadata({
  lang,
  path,
  title,
  description,
  type = "website",
  available,
}: {
  lang: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  available?: readonly string[];
}): Metadata {
  const alternates = localeAlternates(lang, path, available);
  const canonical = `/${lang}${path}`;
  // Shared card from app/[lang]/opengraph-image.tsx; set explicitly because a
  // page-level `openGraph` object replaces the inherited file-based image.
  const image = {
    url: `/${lang}/opengraph-image`,
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
    alt: SITE_NAME,
  };
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      locale: ogLocale(lang),
      alternateLocale: (available ?? i18n.languages)
        .filter((l) => l !== lang)
        .map(ogLocale),
      siteName: SITE_NAME,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
