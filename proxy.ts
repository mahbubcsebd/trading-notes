import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { i18n } from "@/lib/i18n";

export default createI18nMiddleware(i18n);

export const config = {
  // Metadata files (sitemap/robots/manifest/sw) must stay locale-less, so skip them here.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|sitemap.xml|robots.txt|manifest.webmanifest|sw.js|offline.html|icons).*)",
  ],
};
