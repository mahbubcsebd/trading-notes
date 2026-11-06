import type { Metadata } from "next";
import { NotesList } from "@/components/NotesList";
import { getNoteMetas, getTags } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Personal trading notes on ICT, SMC, price action and psychology, filtered by tag.",
};

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function NotesPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const notes = getNoteMetas();
  const tags = getTags();
  const initial = tag && tags.some((t) => t.tag === tag) ? tag : "all";

  return (
    <div className="wrap py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <div className="eyebrow">{notes.length} notes · {tags.length} tags</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Notes</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-fg2">
          My own write-ups on ICT, SMC, price action, gold and psychology. Everything here is a note to myself, not advice.
        </p>
      </div>
      <NotesList notes={notes} tags={tags} initialTag={initial} />

      <div className="card mt-14 max-w-2xl">
        <h3 className="mb-2 text-xl">Add a note</h3>
        <p className="text-fg2">
          Create a file in <code className="font-mono text-[13px] text-gold">content/notes/</code> named like{" "}
          <code className="font-mono text-[13px] text-gold">my-note.md</code>. Start it with a short header and write in Markdown. It shows up here after a rebuild.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-bg2 p-4 font-mono text-[13px] leading-relaxed">{`---
title: Silver Bullet setup
date: 2026-11-06
tags: [ICT, Gold]
summary: One line for the list.
---
## Idea
Write here. Use **bold**, lists, tables and images.`}</pre>
      </div>
    </div>
  );
}
