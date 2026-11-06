import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { InstallButton } from "./InstallButton";
import { LogoMark } from "./LogoMark";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { getNavItems } from "./navItems";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SearchButton } from "@/components/SearchButton";
import { dictionaries, Locale } from "@/lib/dictionaries";

export function Header({ lang = "bn" }: { lang: string }) {
  const t = dictionaries[lang as Locale].header;
  const navItems = getNavItems(lang);

  return (
    <header className="border-line bg-bg sticky top-[env(safe-area-inset-top,0px)] z-50 border-b print:hidden">
      <nav className="wrap flex min-h-[60px] items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-2.5 text-[15px] font-medium"
        >
          <LogoMark />
          <span>
            Trade<span className="text-gold">Notes</span>
          </span>
        </Link>

        <div className="hidden flex-1 justify-center xl:flex">
          <NavLinks lang={lang} items={navItems} />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <SearchButton lang={lang} labels={t} />
          <LanguageSwitcher currentLang={lang} />
          <InstallButton lang={lang} />
          <ThemeToggle />
          <MobileNav lang={lang} items={navItems} />
        </div>
      </nav>
    </header>
  );
}
