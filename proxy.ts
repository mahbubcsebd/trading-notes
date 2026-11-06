import { NextResponse, type NextRequest } from "next/server";
import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { i18n } from "@/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";

const fumadocsProxy = createI18nMiddleware(i18n);

function hasLocalePrefix(pathname: string): boolean {
  const first = pathname.split("/")[1];
  return i18n.languages.includes(first);
}

export default function proxy(
  request: NextRequest,
  event: Parameters<typeof fumadocsProxy>[1],
) {
  const { pathname } = request.nextUrl;
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;

  // Locale-less URL + saved choice: honour it instead of the default/Accept-Language.
  if (!hasLocalePrefix(pathname) && saved && i18n.languages.includes(saved)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${saved}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }
  return fumadocsProxy(request, event);
}

export const config = {
  // Metadata files (sitemap/robots/manifest/sw) must stay locale-less, so skip them here.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|sitemap.xml|robots.txt|manifest.webmanifest|sw.js|offline.html|icons).*)",
  ],
};
