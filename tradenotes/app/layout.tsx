import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LangProvider } from "@/components/LangProvider";
import { buildSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: { default: "TradeNotes", template: "%s · TradeNotes" },
  description:
    "A personal learning journal for Forex and Gold trading: structured lessons, candlestick patterns, annotated charts, a glossary and a risk calculator, in English and Bengali.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0c1120",
};

// Runs before first paint so the saved (or system) theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('tn-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const index = buildSearchIndex();
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <LangProvider>
          <Header index={index} />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
