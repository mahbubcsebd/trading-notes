"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useLang } from "./LangProvider";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-auto border-t border-line py-10">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Logo />
            <p className="mt-3 max-w-xl text-[13px] text-mute">{t("footer.disclaimer")}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg2">
            <Link href="/learn" className="hover:text-fg">{t("nav.learn")}</Link>
            <Link href="/patterns" className="hover:text-fg">{t("nav.patterns")}</Link>
            <Link href="/glossary" className="hover:text-fg">{t("nav.glossary")}</Link>
            <Link href="/risk-calculator" className="hover:text-fg">{t("nav.risk")}</Link>
            <Link href="/notes" className="hover:text-fg">{t("nav.notes")}</Link>
            <Link href="/journal" className="hover:text-fg">{t("nav.journal")}</Link>
            <Link href="/about" className="hover:text-fg">About</Link>
            <Link href="/disclaimer" className="hover:text-fg">Disclaimer</Link>
          </nav>
        </div>
        <p className="mt-8 font-mono text-[11px] text-mute">© 2026 TradeNotes</p>
      </div>
    </footer>
  );
}
