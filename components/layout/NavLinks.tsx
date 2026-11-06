"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
}

export function NavLinks({ lang, items }: { lang: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6">
      {items.map(({ href, label }) => {
        const fullHref = `/${lang}${href}`;
        const isActive =
          pathname === fullHref || pathname.startsWith(`${fullHref}/`);
        return (
          <li key={href}>
            <Link
              href={fullHref}
              aria-current={isActive ? "page" : undefined}
              className={`block py-1 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "text-fg shadow-[0_2px_0_var(--gold)]"
                  : "text-fg2 hover:text-fg"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
