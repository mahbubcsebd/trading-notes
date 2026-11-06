"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SearchItem } from "@/lib/search";
import type { Key } from "@/lib/i18n";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchPalette } from "./SearchPalette";
import { useLang } from "./LangProvider";

const NAV: { href: string; key: Key }[] = [
  { href: "/learn", key: "nav.learn" },
  { href: "/patterns", key: "nav.patterns" },
  { href: "/charts", key: "nav.charts" },
  { href: "/glossary", key: "nav.glossary" },
  { href: "/risk-calculator", key: "nav.risk" },
  { href: "/notes", key: "nav.notes" },
  { href: "/journal", key: "nav.journal" },
];

export function Header({ index }: { index: SearchItem[] }) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-line bg-bg">
      <div className="wrap flex min-h-[60px] flex-wrap items-center justify-between gap-x-4">
        <Logo />
        <nav
          aria-label="Main"
          className="order-3 flex w-full gap-6 overflow-x-auto whitespace-nowrap pb-3 text-sm text-fg2 md:order-none md:w-auto md:pb-0"
        >
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`py-1 hover:text-fg ${active ? "text-fg shadow-[0_2px_0_var(--gold)]" : ""}`}
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setOpen(true)} className="chip" aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9.2 9.2L12.5 12.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span className="hidden sm:inline">{t("search.placeholder")}</span>
            <kbd className="hidden rounded border border-line px-1.5 text-[10px] text-mute sm:inline">Ctrl K</kbd>
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            aria-label="Switch language"
          >
            {lang === "en" ? "বাং" : "EN"}
          </button>
          <ThemeToggle />
        </div>
      </div>
      <SearchPalette items={index} open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
