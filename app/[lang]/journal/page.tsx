import type { Metadata } from "next";
import { JournalApp } from "@/components/journal/JournalApp";
import { PageHeader } from "@/components/layout/PageHeader";
import { dictionaries, type Locale } from "@/lib/dictionaries";
import { journalCopy } from "@/lib/journal/copy";
import { getNoteMetas } from "@/lib/notes";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang?: string }> };

const toLocale = (lang?: string): Locale => (lang === "en" ? "en" : "bn");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  return pageMetadata({
    lang: locale,
    path: "/journal",
    title: dictionaries[locale].header.journal,
    description: journalCopy[locale].lead,
  });
}

export default async function JournalPage({ params }: Props) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const copy = journalCopy[locale];
  const notes = getNoteMetas(locale).map(({ slug, title }) => ({
    slug,
    title,
  }));

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} desc={copy.lead} />
      <div className="wrap py-12 md:py-16">
        <JournalApp lang={locale} notes={notes} />
      </div>
    </>
  );
}
