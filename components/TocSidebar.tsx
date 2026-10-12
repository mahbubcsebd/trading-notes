'use client';

import { useEffect, useState } from 'react';

export function TocSidebar({ toc }: { toc: any[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc
        .map((item) => document.getElementById(item.url.substring(1)))
        .filter(Boolean) as HTMLElement[];

      let currentId = '';
      for (const el of headingElements) {
        if (el.getBoundingClientRect().top < 120) {
          currentId = `#${el.id}`;
        }
      }
      
      // If we are at the absolute top, just highlight the first one
      if (!currentId && headingElements.length > 0 && window.scrollY < 100) {
        currentId = `#${headingElements[0].id}`;
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          On this page
        </p>
        <div className="relative border-l border-border">
          <ul className="space-y-1">
            {toc.map((item) => {
              const isActive = activeId === item.url;
              return (
                <li key={item.url} style={{ paddingLeft: `${(item.depth - 2) * 12}px` }}>
                  <a
                    href={item.url}
                    className={`text-xs transition-all block py-1.5 -ml-[1px] border-l-2 pl-3 ${
                      isActive
                        ? 'text-gold border-gold font-medium'
                        : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
