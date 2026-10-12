// @ts-nocheck
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  const allTags = new Set();
  for (const page of source.getPages()) {
    for (const tag of (page.data.tags ?? [])) {
      allTags.add(tag);
    }
  }
  return [...allTags].map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string; lang?: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag}` };
}

export default async function TagPage({ params }) {
  const { tag, lang } = await params;
  const pages = source.getPages(lang).filter((p) => p.data.tags?.includes(tag));
  if (!pages.length) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">#{tag}</h1>
        <p className="text-muted-foreground mt-1">{pages.length} lessons</p>
      </div>
      <ul className="space-y-3">
        {pages.map((page) => (
          <li key={page.url}>
            <Link
              href={page.url}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-gold/50 hover:bg-card/80 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground group-hover:text-gold transition-colors truncate">
                  {page.data.title}
                </p>
                {page.data.description && (
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">{page.data.description}</p>
                )}
              </div>
              <ChevronRight size={16} className="text-muted-foreground shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
