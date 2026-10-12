// @ts-nocheck
import type { Metadata } from 'next';
import { source } from '@/lib/source';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Tag, CheckCircle2 } from 'lucide-react';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { components as customMdxComponents } from '@/mdx-components';
import { TocSidebar } from '@/components/TocSidebar';

export async function generateStaticParams() {
  return source.generateParams();
}

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[]; lang?: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const page = source.getPage(slug, lang);
  if (!page) return {};
  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function LearnPage({ params }) {
  const { slug = [], lang } = await params;
  const page = source.getPage(slug, lang);
  
  if (!page) {
    const allPages = source.getPages(lang);
    const slugPath = slug.join('/');
    console.log('[LearnPage] Not found for exact slug:', slugPath);
    console.log('[LearnPage] Total pages:', allPages.length);
    
    const childPages = allPages.filter(p => p.file.path.replace(/\\/g, '/').startsWith(slugPath));
    
    if (childPages.length > 0) {
      // Instead of redirecting, render a module overview page listing the lessons
      const moduleName = slugPath.split('/').pop()?.replace(/^\d+-/, '').replace(/-/g, ' ') || 'Module';
      
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-10 max-w-3xl">
            <Link href={`/${lang}/learn`} className="inline-flex text-sm text-muted-foreground hover:text-gold items-center gap-1 mb-6 transition-colors">
              <ChevronLeft size={16} /> Back to Curriculum
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground capitalize mb-3">
              {moduleName}
            </h1>
            <p className="text-lg text-muted-foreground">
              {childPages.length} Lessons in this module. Select a lesson to start learning.
            </p>
          </div>
          
          <div className="grid gap-4 max-w-3xl">
            {childPages.map((child, i) => {
              let targetUrl = child.url;
              if (!targetUrl.startsWith(`/${lang}`)) {
                targetUrl = `/${lang}${targetUrl.startsWith('/') ? '' : '/'}${targetUrl}`;
              }
              return (
                <Link 
                  key={child.url} 
                  href={targetUrl}
                  className="p-5 rounded-lg border border-border bg-card hover:border-gold/50 transition-all duration-200 flex items-center justify-between group hover:bg-card/80"
                >
                  <div>
                    <div className="text-xs text-muted-foreground font-mono mb-1">
                      Lesson {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-gold transition-colors">
                      {child.data.title}
                    </h3>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground group-hover:text-gold transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      );
    }
    
    notFound();
  }

  const { body: MDXContent, toc } = page.data;
  const { title, description, level, tags, status, updated, sources } = page.data;
  const isServer = typeof window === 'undefined';

  const levelColors = {
    beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    advanced: 'text-red-400 bg-red-400/10 border-red-400/30',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex gap-8">
        {/* Main content */}
        <article className="flex-1 min-w-0 max-w-[72ch]">
          {/* Header */}
          <header className="mb-8">
            {status === 'draft' && (
              <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-medium">
                ⚠ Draft — এই lesson টি এখনো সম্পূর্ণ হয়নি
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
              {title}
            </h1>

            {description && (
              <p className="text-lg text-muted-foreground mb-4">{description}</p>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {level && (
                <span className={`px-2 py-0.5 rounded-full border font-medium ${levelColors[level]}`}>
                  {level}
                </span>
              )}
              {tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-border bg-muted text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Tag size={10} />
                  {tag}
                </Link>
              ))}
              {updated && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={10} />
                  {new Date(updated).toLocaleDateString('bn-BD')}
                </span>
              )}
            </div>
          </header>

          {/* MDX Content */}
          <div className="prose prose-invert prose-sm max-w-none
            prose-headings:text-foreground prose-headings:font-bold
            prose-p:text-foreground/90 prose-p:leading-[1.8]
            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
            prose-code:text-gold prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-code:text-[0.85em]
            prose-pre:bg-card prose-pre:border prose-pre:border-border
            prose-blockquote:border-gold prose-blockquote:bg-gold/5
            prose-strong:text-foreground
            prose-ul:pl-5 prose-li:my-0.5
            prose-table:text-sm prose-th:text-foreground prose-td:text-foreground/90
            prose-hr:border-border">
            <MDXContent components={{
              ...defaultMdxComponents,
              ...customMdxComponents,
              KeyTakeaways: ({ children }: any) => (
                <div className="my-6 p-5 rounded-xl border border-gold/30 bg-gold/5 not-prose">
                  <h3 className="text-lg font-bold text-gold mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Key Takeaways
                  </h3>
                  <div className="text-sm text-foreground/90 space-y-2">
                    {children}
                  </div>
                </div>
              ),
              Callout: defaultMdxComponents.Callout,
            }} />
          </div>

          {/* Sources */}
          {sources && sources.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <h2 className="text-lg font-semibold text-foreground mb-3">Sources</h2>
              <ul className="space-y-2">
                {sources.map((src, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-muted-foreground text-xs mt-1 w-12 shrink-0 font-mono uppercase">
                      [{src.type}]
                    </span>
                    <div>
                      {src.url ? (
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                          {src.title}
                        </a>
                      ) : (
                        <span className="text-foreground">{src.title}</span>
                      )}
                      {src.note && <span className="text-muted-foreground ml-2">— {src.note}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Dynamic TOC sidebar */}
        <TocSidebar toc={toc} />
      </div>
    </div>
  );
}
