import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/notes/CopyLink";
import { NoteToc } from "@/components/notes/NoteToc";
import { LinkedTrades } from "@/components/journal/LinkedTrades";
import { i18n } from "@/lib/i18n";
import type { Locale } from "@/lib/dictionaries";
import { fmtDate, getAllNotes, getNote, relatedNotes } from "@/lib/notes";
import { notesCopy } from "@/lib/notes-copy";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang?: string; slug: string }> };

const toLocale = (lang?: string): Locale => (lang === "en" ? "en" : "bn");

export function generateStaticParams() {
  return i18n.languages.flatMap((lang) =>
    getAllNotes(toLocale(lang)).map((n) => ({ lang, slug: n.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const note = getNote(slug, locale);
  if (!note) return {};
  return pageMetadata({
    lang: locale,
    path: `/notes/${slug}`,
    title: note.title,
    description: note.summary || notesCopy[locale].lead,
    type: "article",
  });
}

export default async function NotePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const copy = notesCopy[locale];
  const note = getNote(slug, locale);
  if (!note) notFound();
  const related = relatedNotes(slug, locale);

  return (
    <div className="wrap grid items-start gap-16 pt-8 pb-16 lg:grid-cols-[minmax(0,1fr)_220px]">
      <article className="max-w-[700px]">
        <nav
          aria-label="Breadcrumb"
          className="text-mute flex flex-wrap gap-2 font-mono text-xs"
        >
          <Link href={`/${locale}/notes`} className="hover:text-fg">
            {copy.breadcrumb}
          </Link>
          <span>/</span>
          <span>{note.title}</span>
        </nav>
        <header>
          <div className="eyebrow mt-7 tabular-nums">
            {fmtDate(note.date, locale)} · {copy.minRead(note.minutes)}
          </div>
          <h1 className="mt-3.5 mb-3 text-[clamp(34px,5vw,52px)] leading-[1.06] tracking-[-0.025em]">
            {note.title}
          </h1>
          {note.summary && (
            <p className="text-fg2 text-lg leading-relaxed">{note.summary}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {note.tags.map((t) => (
              <Link
                key={t}
                href={`/${locale}/notes?tag=${encodeURIComponent(t)}`}
                className="pill pill-gold"
              >
                {t}
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <CopyLink
              label={copy.copyLink}
              copiedLabel={copy.linkCopied}
              failedLabel={copy.copyFailed}
            />
          </div>
        </header>

        <div
          lang={note.fallback ? "en" : locale}
          className="md mt-8"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />

        {related.length > 0 && (
          <section className="border-line mt-16 border-t pt-8">
            <h2 className="eyebrow mb-4">{copy.related}</h2>
            <ul className="grid gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${locale}/notes/${r.slug}`}
                    className="link text-lg"
                  >
                    {r.title}
                  </Link>
                  <span className="text-mute ml-3 font-mono text-xs">
                    {r.tags.join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <LinkedTrades slug={slug} lang={locale} />
      </article>
      {note.headings.length > 0 && (
        <NoteToc items={note.headings} label={copy.onPage} />
      )}
    </div>
  );
}
