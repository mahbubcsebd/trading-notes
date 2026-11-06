import Link from "next/link";
import { dictionaries, Locale } from "@/lib/dictionaries";
import { LogoMark } from "./LogoMark";
import { getInfoItems, getNavItems } from "./navItems";

export function Footer({ lang = "bn" }: { lang?: string }) {
  const t = dictionaries[lang as Locale].footer;
  const links = [...getNavItems(lang), ...getInfoItems(lang)];

  return (
    <footer className="border-line mt-auto border-t py-10 print:hidden">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 text-[15px] font-medium">
              <LogoMark />
              <span>
                Trade<span className="text-gold">Notes</span>
              </span>
            </div>
            <p className="text-mute mt-3 max-w-xl text-[13px]">
              {t.disclaimer}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="text-fg2 flex max-w-xl flex-wrap gap-x-6 gap-y-2 text-sm"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={`/${lang}${l.href}`}
                className="hover:text-fg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-mute mt-8 font-mono text-[11px]">
          © 2026 TradeNotes
        </p>
      </div>
    </footer>
  );
}
