import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/CopyLink";
import { Toc } from "@/components/Toc";
import { fmtDate, getAllNotes, getNote, relatedNotes } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  return n ? { title: n.title, description: n.summary } : {};
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const related = relatedNotes(slug);

  return (
    <div className="wrap grid items-start gap-16 pb-16 pt-8 lg:grid-cols-[minmax(0,1fr)_220px]">
      <article className="max-w-[700px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 font-mono text-xs text-mute">
          <Link href="/notes" className="hover:text-fg">Notes</Link>
          <span>/</span>
          <span>{note.title}</span>
        </nav>
        <header>
          <div className="eyebrow mt-7 tabular-nums">
            {fmtDate(note.date)} · {note.minutes} min read
          </div>
          <h1 className="mb-3 mt-3.5 text-[clamp(34px,5vw,52px)] leading-[1.06] tracking-[-0.025em]">{note.title}</h1>
          {note.summary && <p className="text-lg leading-relaxed text-fg2">{note.summary}</p>}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {note.tags.map((t) => (
              <Link key={t} href={`/notes?tag=${encodeURIComponent(t)}`} className="pill pill-gold">
                {t}
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <CopyLink />
          </div>
        </header>

        <div className="md mt-8" dangerouslySetInnerHTML={{ __html: note.html }} />

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-8">
            <h2 className="eyebrow mb-4">Related notes</h2>
            <ul className="grid gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/notes/${r.slug}`} className="link text-lg">
                    {r.title}
                  </Link>
                  <span className="ml-3 font-mono text-xs text-mute">{r.tags.join(" · ")}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      {note.headings.length > 0 && <Toc items={note.headings} />}
    </div>
  );
}
