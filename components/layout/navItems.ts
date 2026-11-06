import { dictionaries, Locale } from "@/lib/dictionaries";

export interface SiteNavItem {
  href: string;
  label: string;
}

/** Primary navigation, shared by desktop header, mobile menu and footer. */
export function getNavItems(lang: string): SiteNavItem[] {
  const t = dictionaries[lang as Locale].header;
  return [
    { href: "/learn", label: t.learn },
    { href: "/patterns", label: t.patterns },
    { href: "/charts", label: t.charts },
    { href: "/glossary", label: t.glossary },
    { href: "/tools/risk-calculator", label: t.riskCalc },
    { href: "/notes", label: t.notes },
    { href: "/journal", label: t.journal },
  ];
}

/** Secondary links (footer only). */
export function getInfoItems(lang: string): SiteNavItem[] {
  const t = dictionaries[lang as Locale].header;
  return [
    { href: "/about", label: t.about },
    { href: "/disclaimer", label: t.disclaimer },
  ];
}
