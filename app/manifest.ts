import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

const THEME_COLOR = "#0c1120";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${SITE_NAME} — Trading Learning`,
    short_name: SITE_NAME,
    description:
      "Structured trading course, candlestick pattern library, notes and journal — Bengali & English.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    categories: ["education", "finance"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
