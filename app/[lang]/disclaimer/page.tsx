import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import type { Locale } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { disclaimerCopy } from "@/lib/site-copy";

type Props = { params: Promise<{ lang?: string }> };

const toLocale = (lang?: string): Locale => (lang === "en" ? "en" : "bn");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const copy = disclaimerCopy[locale];
  return pageMetadata({
    lang: locale,
    path: "/disclaimer",
    title: copy.title,
    description: copy.description,
  });
}

export default async function DisclaimerPage({ params }: Props) {
  const { lang } = await params;
  const copy = disclaimerCopy[toLocale(lang)];

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} />
      <div className="wrap py-12 md:py-16">
        <div className="text-fg2 grid max-w-[720px] gap-5 text-[18px] leading-[1.7]">
          {copy.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </>
  );
}
