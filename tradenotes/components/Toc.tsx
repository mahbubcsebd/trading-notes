"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";

export function Toc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const { t } = useLang();

  useEffect(() => {
    function onScroll() {
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < 150) current = it.id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-[calc(env(safe-area-inset-top,0px)+88px)] hidden lg:block">
      <span className="eyebrow mb-3 block !text-mute">{t("lesson.onPage")}</span>
      <ul className="border-l border-line">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={`-ml-px block border-l py-1.5 pl-3.5 text-sm leading-snug hover:text-fg ${
                active === it.id ? "border-gold text-gold" : "border-transparent text-fg2"
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
