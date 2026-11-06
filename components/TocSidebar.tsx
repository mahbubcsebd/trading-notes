"use client";

import { useEffect, useMemo, useState } from "react";

export function TocSidebar({ toc }: { toc: any[] }) {
  const [activeId, setActiveId] = useState<string>("");
  // h2 only (matches tradenotes Toc; short enough to never need a scrollbar)
  const items = useMemo(() => (toc ?? []).filter((t) => t.depth === 2), [toc]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.url.substring(1)))
        .filter(Boolean) as HTMLElement[];

      let currentId = "";
      for (const el of headingElements) {
        if (el.getBoundingClientRect().top < 150) {
          currentId = `#${el.id}`;
        }
      }

      // If we are at the absolute top, just highlight the first one
      if (!currentId && headingElements.length > 0 && window.scrollY < 100) {
        currentId = `#${headingElements[0].id}`;
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  // sticky on the grid item itself (grid uses items-start), no inner scroll
  return (
    <nav
      aria-label="On this page"
      className="sticky top-[calc(env(safe-area-inset-top,0px)+88px)] hidden lg:block"
    >
      <span className="eyebrow !text-mute mb-3 block">On this page</span>
      <ul className="border-line border-l">
        {items.map((item) => {
          const isActive = activeId === item.url;
          return (
            <li key={item.url}>
              <a
                href={item.url}
                aria-current={isActive ? "true" : undefined}
                className={`hover:text-fg -ml-px block border-l py-1.5 pl-3.5 text-sm leading-snug ${
                  isActive
                    ? "border-gold text-gold"
                    : "text-fg2 border-transparent"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
