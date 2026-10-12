import { Inter, Hind_Siliguri, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';
import { i18n } from '@/lib/i18n';

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  variable: '--font-hind-siliguri',
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | TradeNotes',
    default: 'TradeNotes — Personal Trading Learning Platform',
  },
  description:
    'Personal trading notes and structured learning for Forex and Gold (XAUUSD) — Bengali & English.',
  robots: process.env.NEXT_PUBLIC_INDEXABLE === 'true' ? 'index,follow' : 'noindex,nofollow',
  openGraph: {
    siteName: 'TradeNotes',
    type: 'website',
    locale: 'bn_BD',
  },
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${hindSiliguri.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col antialiased bg-background text-foreground">
        <ThemeProvider>
          <RootProvider theme={{ enabled: false }}>
            <Header lang={lang} />
            <main className="flex-1">{children}</main>
            <Footer lang={lang} />
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
