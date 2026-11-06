import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CandleMini } from "@/components/home/CandleMini";
import { dictionaries, type Locale } from "@/lib/dictionaries";
import { homeExtraCopy } from "@/lib/home-copy";
import { fmtDate, getNoteMetas } from "@/lib/notes";

type HomeDict = (typeof dictionaries)[Locale]["home"];
const LATEST_NOTES = 4;

export function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export function Toolkit({ lang, t }: { lang: Locale; t: HomeDict }) {
  const small = [
    { href: "/charts", title: t.chartTitle, desc: t.chartDesc },
    { href: "/glossary", title: t.glossaryTitle, desc: t.glossaryDesc },
    { href: "/tools/risk-calculator", title: t.riskCalc, desc: t.riskDesc },
  ];

  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow={t.toolkit} title={t.toolkitTitle} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Link
            href={`/${lang}/patterns`}
            className="bg-gold text-gold-ink group flex min-h-[360px] flex-col gap-7 rounded-[20px] p-6 sm:p-8"
          >
            <div>
              <div className="eyebrow !text-gold-ink opacity-75">
                {t.toolkit}
              </div>
              <h3 className="mt-3 text-[clamp(32px,4.4vw,48px)] leading-[1.05]">
                {t.patternTitle}
              </h3>
              <p className="mt-2.5 max-w-[24em] text-[15px] opacity-85">
                {t.patternDesc}
              </p>
            </div>
            <CandleMini />
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              {t.viewAll}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {small.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="card hover:border-mute flex flex-col gap-2 transition-colors"
              >
                <h3 className="text-[22px]">{item.title}</h3>
                <p className="text-fg2 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Workspace({ lang }: { lang: Locale }) {
  const c = homeExtraCopy[lang];
  const notes = getNoteMetas(lang).slice(0, LATEST_NOTES);

  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow={c.workspaceEyebrow} title={c.workspaceTitle} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="card">
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="text-[22px]">{c.latestNotes}</h3>
              <Link href={`/${lang}/notes`} className="link text-sm">
                {c.allNotes}
              </Link>
            </div>
            <ul className="grid">
              {notes.map((n) => (
                <li
                  key={n.slug}
                  className="border-line border-t first:border-t-0"
                >
                  <Link
                    href={`/${lang}/notes/${n.slug}`}
                    className="group flex flex-wrap items-baseline justify-between gap-x-4 py-3"
                  >
                    <span className="group-hover:text-gold font-medium transition-colors">
                      {n.title}
                    </span>
                    <span className="text-mute font-mono text-xs">
                      {fmtDate(n.date, lang)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/${lang}/journal`}
            className="card hover:border-mute flex flex-col gap-2 transition-colors"
          >
            <div className="eyebrow">{c.journalEyebrow}</div>
            <h3 className="text-[22px]">{c.journalTitle}</h3>
            <p className="text-fg2 text-sm">{c.journalDesc}</p>
            <span className="text-gold mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium">
              {c.openJournal} <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutTeaser({ lang }: { lang: Locale }) {
  const c = homeExtraCopy[lang];
  return (
    <section className="sec">
      <div className="wrap grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-14">
        <div>
          <div className="eyebrow">{c.aboutEyebrow}</div>
          <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">
            {c.aboutTitle}
          </h2>
        </div>
        <div className="text-fg2 text-lg leading-[1.65]">
          <p className="max-w-[34em]">{c.aboutP1}</p>
          <p className="mt-4 max-w-[34em]">
            {c.aboutP2}{" "}
            <Link href={`/${lang}/about`} className="link">
              {c.readMore}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Faq({ lang }: { lang: Locale }) {
  const c = homeExtraCopy[lang];
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow={c.faqEyebrow} title={c.faqTitle} />
        <div className="max-w-[820px]">
          {c.faqs.map((f, i) => (
            <details
              key={f.q}
              className={`group border-line border-t ${i === c.faqs.length - 1 ? "border-b" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-gold font-mono text-[22px] leading-none group-open:hidden">
                  +
                </span>
                <span className="text-gold hidden font-mono text-[22px] leading-none group-open:inline">
                  −
                </span>
              </summary>
              <p className="text-fg2 max-w-[42em] px-1 pb-[22px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
