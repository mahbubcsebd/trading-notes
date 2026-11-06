import {
  Fraunces,
  Hanken_Grotesk,
  JetBrains_Mono,
  Hind_Siliguri,
} from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { RootProvider } from "fumadocs-ui/provider";
import "fumadocs-ui/style.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegisterServiceWorker } from "@/components/layout/RegisterServiceWorker";
import "../globals.css";
import { i18n } from "@/lib/i18n";

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

import type { Metadata, Viewport } from "next";
import { SITE_NAME, SITE_URL, isIndexable } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Personal Trading Learning Platform`,
  },
  description:
    "Personal trading notes and structured learning for Forex and Gold (XAUUSD) — Bengali & English.",
  robots: isIndexable ? "index,follow" : "noindex,nofollow",
  openGraph: { siteName: SITE_NAME, type: "website" },
  applicationName: SITE_NAME,
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black-translucent" },
  icons: { apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c1120" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
  ],
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${hanken.variable} ${hindSiliguri.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="bg-background text-foreground flex min-h-full flex-col antialiased"
      >
        <ThemeProvider>
          {/* Site search is our own (components/search); fumadocs' default dialog would double-bind ⌘K. */}
          <RootProvider theme={{ enabled: false }} search={{ enabled: false }}>
            <Header lang={lang} />
            <main className="flex-1">{children}</main>
            <Footer lang={lang} />
            <RegisterServiceWorker />
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
