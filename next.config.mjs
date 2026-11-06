import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  async headers() {
    // Service worker must never be served stale from HTTP cache.
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
    ];
  },
  async redirects() {
    // Chapter 16 "Advanced" became "Trading Methodologies" (2026-11-07).
    const moved = [
      [
        "16-advanced/01-smart-money-concepts-ict-basics",
        "16-trading-methodologies/06-smc-ict",
      ],
      [
        "16-advanced/02-volume-profile-market-profile",
        "16-trading-methodologies/05-volume-profile",
      ],
      [
        "16-advanced/03-wyckoff-basics",
        "16-trading-methodologies/03-wyckoff-method",
      ],
      [
        "16-advanced/04-elliott-wave",
        "16-trading-methodologies/07-elliott-wave",
      ],
      ["16-advanced/05-automation", "15-backtesting-journal/06-automation"],
      ["16-advanced/00-overview", "16-trading-methodologies/00-overview"],
      ["16-advanced", "16-trading-methodologies"],
    ];
    return moved.map(([from, to]) => ({
      source: `/:lang(bn|en)/learn/${from}`,
      destination: `/:lang/learn/${to}`,
      permanent: true,
    }));
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withMDX(nextConfig);
