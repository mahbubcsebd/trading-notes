import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, getChapter, pad } from "@/lib/curriculum";
import { ChapterProgress, LessonRows, StartButton } from "@/components/ChapterClient";

type Props = { params: Promise<{ chapter: string }> };

export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter } = await params;
  const c = getChapter(chapter);
  return c ? { title: `${c.title} · Chapter ${pad(c.n)}`, description: c.summary } : {};
}

export default async function ChapterPage({ params }: Props) {
  const { chapter } = await params;
  const c = getChapter(chapter);
  if (!c) notFound();

  const minutes = c.lessons.reduce((s, l) => s + l.minutes, 0);
  const next = chapters.find((x) => x.n === c.n + 1);
  const ideas = c.lessons.map((l) => l.takeaways[0]).slice(0, 6);
  const groupLabel = c.group === "foundations" ? "Foundations" : c.group === "strategy" ? "Strategy and execution" : "Mastery";
  const levelPill = c.level === "Beginner" ? "pill-up" : c.level === "Intermediate" ? "pill-gold" : "pill-down";

  return (
    <div className="wrap">
      <div className="max-w-[760px] pb-10 pt-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 font-mono text-xs text-mute">
          <Link href="/learn" className="hover:text-fg">Learn</Link>
          <span>/</span>
          <span>{groupLabel}</span>
          <span>/</span>
          <span>Chapter {pad(c.n)}</span>
        </nav>
        <div className="eyebrow mt-7">
          Chapter {pad(c.n)} · {c.title}
        </div>
        <h1 className="mb-[18px] mt-4 text-[clamp(38px,6vw,64px)] leading-[1.04] tracking-[-0.025em]">{c.headline}</h1>
        <p className="max-w-[34em] text-[19px] leading-relaxed text-fg2">{c.summary}</p>
        <div className="mt-[22px] flex flex-wrap gap-2.5 tabular-nums">
          <span className={`pill ${levelPill}`}>{c.level}</span>
          <span className="pill">{c.lessons.length} lessons</span>
          <span className="pill">About {minutes} min</span>
        </div>
        <StartButton chapter={c} />
      </div>

      <div className="grid items-start gap-10 border-t border-line pb-20 pt-12 md:grid-cols-[minmax(0,1fr)_300px] md:gap-14">
        <div>
          <h2 className="mb-5 text-[30px] leading-tight">Key ideas</h2>
          <ul className="grid gap-3.5">
            {ideas.map((t) => (
              <li key={t} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3 text-[17px] leading-normal">
                <svg className="mt-1" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" fill="none" stroke="var(--gold)" strokeWidth="1.3" />
                  <path d="M6 10.4l2.8 2.8L14 7.6" fill="none" stroke="var(--gold)" strokeWidth="1.6" />
                </svg>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <h2 className="mb-5 mt-14 text-[30px] leading-tight">Lessons in this chapter</h2>
          <LessonRows chapter={c} />
        </div>
        <aside className="grid gap-4 md:sticky md:top-[calc(env(safe-area-inset-top,0px)+84px)]" aria-label="Chapter sidebar">
          <ChapterProgress chapter={c} />
          <div className="card">
            <h3 className="mb-3 text-xl">Before you start</h3>
            <p className="text-sm text-fg2">
              No experience needed. Open a demo charting platform to check the examples as you go, and keep live money out of the early chapters.
            </p>
          </div>
          {next && (
            <Link href={`/learn/${next.slug}`} className="card block transition-colors hover:border-mute">
              <div className="eyebrow">Up next</div>
              <h3 className="mb-1 mt-2 text-xl">{next.title}</h3>
              <p className="font-mono text-[13px] tabular-nums text-fg2">
                Chapter {pad(next.n)} · {next.lessons.length} lessons
              </p>
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
