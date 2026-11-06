import type { Metadata } from "next";
import { GlossaryList } from "@/components/GlossaryList";
import { glossary } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Trading terms explained in plain English and Bengali.",
};

export default function GlossaryPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <div className="eyebrow">{glossary.length} terms · English and Bengali</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Glossary</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-fg2">
          Short definitions of the words used across the lessons, in English and Bengali.
        </p>
      </div>
      <GlossaryList />
    </div>
  );
}
