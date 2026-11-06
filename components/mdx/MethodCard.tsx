import { cn } from "@/lib/utils";

type Reads =
  | "Price"
  | "Price + Volume"
  | "Price + Liquidity narrative"
  | "Indicators (math on price/volume)";
type Level = "beginner" | "intermediate" | "advanced";
type Subjectivity = "low" | "medium" | "high";
type Lang = "bn" | "en";

interface MethodCardProps {
  name: string;
  origin: string;
  reads: Reads;
  question: string;
  timeframes: string;
  difficulty: Level;
  subjectivity: Subjectivity;
  needsVolume?: boolean;
  lang?: Lang;
}

const LABELS: Record<Lang, Record<string, string>> = {
  bn: {
    eyebrow: "এক নজরে",
    question: "মূল প্রশ্ন",
    origin: "উৎপত্তি",
    reads: "কী পড়ে",
    timeframes: "সাধারণ timeframe",
    volume: "Volume লাগে?",
    yes: "হ্যাঁ",
    no: "না",
    difficulty: "Learning curve",
    subjectivity: "Subjectivity",
  },
  en: {
    eyebrow: "At a glance",
    question: "Core question",
    origin: "Origin",
    reads: "Reads",
    timeframes: "Typical timeframes",
    volume: "Needs volume?",
    yes: "Yes",
    no: "No",
    difficulty: "Learning curve",
    subjectivity: "Subjectivity",
  },
};

/** Semantic tone: less subjective = calmer (up), more = caution (down). */
const SUBJECTIVITY_PILL: Record<Subjectivity, string> = {
  low: "pill-up",
  medium: "pill-gold",
  high: "pill-down",
};

const LEVEL_PILL: Record<Level, string> = {
  beginner: "pill-up",
  intermediate: "pill-gold",
  advanced: "pill-down",
};

/** Fixed "at a glance" card for the Trading Methodologies series (same fields in every lesson). */
export function MethodCard({
  name,
  origin,
  reads,
  question,
  timeframes,
  difficulty,
  subjectivity,
  needsVolume = false,
  lang = "bn",
}: MethodCardProps) {
  const t = LABELS[lang] ?? LABELS.bn;
  const facts: [string, string][] = [
    [t.origin, origin],
    [t.reads, reads],
    [t.timeframes, timeframes],
    [t.volume, needsVolume ? t.yes : t.no],
  ];

  return (
    <section
      aria-label={`${t.eyebrow}: ${name}`}
      className="not-prose border-line bg-surface my-8 rounded-2xl border"
    >
      <div className="border-line border-b px-5 pt-5 pb-4 sm:px-6">
        <p className="eyebrow">{t.eyebrow}</p>
        <p className="font-display text-fg mt-2 text-[26px] leading-tight tracking-tight">
          {name}
        </p>
        <p className="text-fg2 border-gold mt-3 border-l-2 pl-3 text-[15px] leading-relaxed">
          <span className="text-mute block font-mono text-[11px] tracking-wider uppercase">
            {t.question}
          </span>
          {question}
        </p>
      </div>
      <dl className="divide-line grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0">
        {facts.map(([label, value], i) => (
          <div
            key={label}
            className={cn(
              "px-5 py-3 sm:px-6",
              i >= 2 && "sm:border-line sm:border-t",
              i % 2 === 1 && "sm:border-line sm:border-l",
            )}
          >
            <dt className="text-mute font-mono text-[11px] tracking-wider uppercase">
              {label}
            </dt>
            <dd className="text-fg mt-1 text-sm leading-relaxed">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="border-line flex flex-wrap items-center gap-2 border-t px-5 py-3 sm:px-6">
        <span className={cn("pill", LEVEL_PILL[difficulty])}>
          {t.difficulty}: {difficulty}
        </span>
        <span className={cn("pill", SUBJECTIVITY_PILL[subjectivity])}>
          {t.subjectivity}: {subjectivity}
        </span>
      </div>
    </section>
  );
}
