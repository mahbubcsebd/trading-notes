import type { Metadata } from "next";
import { Suspense } from "react";
import { CurriculumList } from "@/components/CurriculumList";
import { ContinueStrip } from "@/components/ContinueStrip";
import { chapters, totalLessons } from "@/lib/curriculum";
import type { Group } from "@/lib/types";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "18 chapters and 104 lessons on Forex and Gold trading, from market basics to your own trading system.",
};

export default async function LearnPage({ searchParams }: { searchParams: Promise<{ group?: string }> }) {
  const { group } = await searchParams;
  const initial: Group | "all" = group === "foundations" || group === "strategy" || group === "mastery" ? group : "all";
  return (
    <div className="wrap py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <div className="eyebrow">
          {chapters.length} chapters · {totalLessons} lessons
        </div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Curriculum</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-fg2">
          Work through the chapters in order, or jump to the one you need. Chapters 1 to 5 are the foundation for everything after them.
        </p>
      </div>
      <div className="mb-10">
        <ContinueStrip />
      </div>
      <Suspense>
        <CurriculumList initialGroup={initial} />
      </Suspense>
    </div>
  );
}
