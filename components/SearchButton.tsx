'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';

const DefaultSearchDialog = dynamic(
  () => import('fumadocs-ui/components/dialog/search-default'),
  { ssr: false }
);

export function SearchButton({ label, lang }: { label: string; lang?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        className="flex w-full max-w-sm items-center gap-2 rounded-md border border-input bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors sm:w-64"
        aria-label={label}
        onClick={() => setOpen(true)}
      >
        <Search size={14} className="shrink-0" />
        <span className="flex-1 text-left line-clamp-1">{label}...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {mounted && (
        <DefaultSearchDialog
          open={open}
          onOpenChange={setOpen}
          api="/api/search"
          type="fetch"
          links={[
            ['Home', `/${lang || 'bn'}`],
            ['Learn', `/${lang || 'bn'}/learn`],
            ['Patterns', `/${lang || 'bn'}/patterns`],
            ['Charts', `/${lang || 'bn'}/charts`],
            ['Glossary', `/${lang || 'bn'}/glossary`],
            ['Risk Calculator', `/${lang || 'bn'}/tools/risk-calculator`],
          ]}
        />
      )}
    </>
  );
}
