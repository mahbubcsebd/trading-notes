"use client";

import { useEffect, useState } from "react";

const ACTIVE_OFFSET_PX = 150;

export function NoteToc({
  items,
  label,
}: {
  items: { id: string; title: string }[];
  label: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < ACTIVE_OFFSET_PX)
          current = it.id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[calc(env(safe-area-inset-top,0px)+88px)] hidden lg:block"
    >
      <span className="eyebrow !text-mute mb-3 block">{label}</span>
      <ul className="border-line border-l">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={`hover:text-fg -ml-px block border-l py-1.5 pl-3.5 text-sm leading-snug ${
                active === it.id
                  ? "border-gold text-gold"
                  : "text-fg2 border-transparent"
              }`}
            >
              {it.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
