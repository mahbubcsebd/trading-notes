import type { Metadata } from "next";
import { NotesList } from "@/components/notes/NotesList";
import { PageHeader } from "@/components/layout/PageHeader";
import { dictionaries, type Locale } from "@/lib/dictionaries";
import { fmtDate, getNoteMetas, getTags } from "@/lib/notes";
import { notesCopy } from "@/lib/notes-copy";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ lang?: string }>;
};

const toLocale = (lang?: string): Locale => (lang === "en" ? "en" : "bn");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  return pageMetadata({
    lang: locale,
    path: "/notes",
    title: dictionaries[locale].header.notes,
    description: notesCopy[locale].lead,
  });
}

export default async function NotesPage({ params }: Props) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const copy = notesCopy[locale];
  const notes = getNoteMetas(locale);
  const tags = getTags(locale);
  const dates = Object.fromEntries(
    notes.map((n) => [n.slug, fmtDate(n.date, locale)]),
  );

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow(notes.length, tags.length)}
        title={copy.title}
        desc={copy.lead}
      />
      <div className="wrap py-12 md:py-16">
        <NotesList
          notes={notes}
          tags={tags}
          lang={locale}
          dates={dates}
        />

        <div className="card mt-14 max-w-2xl">
          <h3 className="mb-2 text-xl">{copy.addTitle}</h3>
          <p className="text-fg2">{copy.addBody}</p>
          <pre className="border-line bg-bg2 mt-4 overflow-x-auto rounded-xl border p-4 font-mono text-[13px] leading-relaxed">{`---
title: Silver Bullet setup
date: 2026-11-06
tags: [ICT, Gold]
summary: One line for the list.
---
## Idea
Write here. Use **bold**, lists, tables and images.`}</pre>
          <p className="text-mute mt-4 text-sm">{copy.addBnHint}</p>
        </div>
      </div>
    </>
  );
}
