"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import type { NavItem } from "./NavLinks";

interface MobileNavProps {
  lang: string;
  items: NavItem[];
}

export function MobileNav({ lang, items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="chip !px-2.5"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={14} /> : <Menu size={14} />}
      </button>

      {isOpen && (
        <div className="border-line bg-bg animate-in fade-in slide-in-from-top-2 fixed inset-x-0 top-[60px] z-50 max-h-[calc(100dvh-60px)] overflow-y-auto border-b px-4 pt-2 pb-6 duration-200">
          <nav className="wrap flex flex-col !px-0">
            {items.map(({ href, label }, i) => (
              <Link
                key={href}
                href={`/${lang}${href}`}
                onClick={() => setIsOpen(false)}
                className="border-line group flex items-center gap-4 border-b py-3.5"
              >
                <span className="text-mute font-mono text-[11px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display group-hover:text-gold flex-1 text-xl transition-colors">
                  {label}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-mute group-hover:text-gold transition-colors"
                />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
