import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, getLesson, lessonHref, neighbours, pad } from "@/lib/curriculum";
import { getLessonBody } from "@/lib/lesson-bodies";
import { lessonId } from "@/lib/lesson-id";
import { Prose } from "@/components/Prose";
import { Quiz } from "@/components/Quiz";
import { LessonBar } from "@/components/LessonBar";
import { Toc } from "@/components/Toc";
import { CopyLink } from "@/components/CopyLink";

type Props = { params: Promise<{ chapter: string; lesson: string }> };

export function generateStaticParams() {
  return chapters.flatMap((c) => c.lessons.map((l) => ({ chapter: c.slug, lesson: l.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter, lesson } = await params;
  const f = getLesson(chapter, lesson);
  return f ? { title: f.lesson.title, description: f.lesson.summary } : {};
}

export default async function LessonPage({ params }: Props) {
  const { chapter, lesson } = await params;
  const found = getLesson(chapter, lesson);
  if (!found) notFound();
  const { chapter: c, lesson: l } = found;
  const body = getLessonBody(c.n, l.slug);
  const { prev, next } = neighbours(c.slug, l.slug);

  const prevNav = prev ? { href: lessonHref(prev.c, prev.l), label: prev.l.title } : { href: `/learn/${c.slug}`, label: "Chapter overview" };
  const nextNav = next ? { href: lessonHref(next.c, next.l), label: next.l.title } : { href: "/learn", label: "Back to curriculum" };

  const tocItems = body ? [...body.sections.map((s) => ({ id: s.id, title: s.title })), { id: "check", title: "Quick check" }] : [];

  return (
    <div className="wrap grid items-start gap-16 pb-10 pt-8 lg:grid-cols-[minmax(0,1fr)_220px]">
      <article className="max-w-[700px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 font-mono text-xs text-mute">
          <Link href="/learn" className="hover:text-fg">Learn</Link>
          <span>/</span>
          <Link href={`/learn/${c.slug}`} className="hover:text-fg">Chapter {pad(c.n)}</Link>
          <span>/</span>
          <span>Lesson {l.n}</span>
        </nav>
        <header>
          <div className="eyebrow mt-7 tabular-nums">
            Lesson {l.n} of {c.lessons.length} · {l.level} · {l.minutes} min
          </div>
          <h1 className="mb-3 mt-3.5 text-[clamp(34px,5vw,52px)] leading-[1.06] tracking-[-0.025em]">{l.title}</h1>
          <p className="text-lg leading-relaxed text-fg2">{l.summary}</p>
          <div className="mt-5">
            <CopyLink />
          </div>
        </header>

        <div className="mb-2 mt-8 rounded-2xl border border-line bg-surface p-6">
          <h2 className="eyebrow mb-3.5 !font-mono">Key takeaways</h2>
          <ul className="grid list-disc gap-2.5 pl-5 text-base marker:text-gold">
            {l.takeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {body ? (
          <>
            <Prose sections={body.sections} />
            <section id="check" className="scroll-mt-24">
              <h2 className="mb-3.5 mt-12 text-[28px] leading-tight">Quick check</h2>
              <Quiz items={body.quiz} />
            </section>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-line p-7 text-fg2">
            The full text for this lesson is being written. The key takeaways above summarise what it will cover, and the lesson uses the same layout as the finished ones: article, diagrams, then a three question check.
          </div>
        )}

        <LessonBar id={lessonId(c.n, l.slug)} prev={prevNav} next={nextNav} />
      </article>
      {body && <Toc items={tocItems} />}
    </div>
  );
}
