import type { MetadataRoute } from "next";
import { SITE_URL, isIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/*/studio"] },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
