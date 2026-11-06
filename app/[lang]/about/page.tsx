import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import type { Locale } from "@/lib/dictionaries";
import { getLearnModules } from "@/lib/learn-modules";
import { pageMetadata } from "@/lib/seo";
import { aboutCopy } from "@/lib/site-copy";

type Props = { params: Promise<{ lang?: string }> };

const toLocale = (lang?: string): Locale => (lang === "en" ? "en" : "bn");

function courseSize(lang: Locale) {
  const modules = getLearnModules(lang);
  const lessons = modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => !/overview/.test(l.id)).length,
    0,
  );
  return { chapters: modules.length, lessons };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const copy = aboutCopy[locale];
  return pageMetadata({
    lang: locale,
    path: "/about",
    title: copy.eyebrow,
    description: copy.aim,
  });
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const copy = aboutCopy[locale];
  const { chapters, lessons } = courseSize(locale);

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} />
      <div className="wrap py-12 md:py-16">
        <div className="text-fg2 grid max-w-[720px] gap-5 text-[19px] leading-[1.7]">
          <p>{copy.intro(chapters, lessons)}</p>
          <p>{copy.aim}</p>
          <h2 className="text-fg mt-6 text-[28px]">{copy.findTitle}</h2>
          <ul className="marker:text-gold grid list-disc gap-2.5 pl-5">
            {copy.find.map((item) => (
              <li key={item.href}>
                {item.before}
                <Link href={`/${locale}${item.href}`} className="link">
                  {item.link}
                </Link>
                {item.after}
              </li>
            ))}
          </ul>
          <h2 className="text-fg mt-6 text-[28px]">{copy.notTitle}</h2>
          <p>
            {copy.notBefore}
            <Link href={`/${locale}/disclaimer`} className="link">
              {copy.notLink}
            </Link>
            {copy.notAfter}
          </p>
        </div>
      </div>
    </>
  );
}
