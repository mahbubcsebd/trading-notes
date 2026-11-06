import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";

const TOOLS = [
  {
    href: "write",
    title: "Article Editor",
    desc: "MDX editor with live preview, image paste, frontmatter form",
  },
  {
    href: "chart-lab",
    title: "Chart Lab",
    desc: "Manual candle drawing, annotations, CSV import, replay, export",
  },
] as const;

// Studio is only accessible in development
export default async function StudioPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang = "bn" } = await params;
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <>
      <PageHeader
        eyebrow="Dev only"
        title="Studio"
        desc="Authoring tools, available in development mode only."
      />
      <div className="wrap py-12">
        <ol className="border-line border-t">
          {TOOLS.map((tool, i) => (
            <li key={tool.href} className="border-line border-b">
              <Link
                href={`/${lang}/studio/${tool.href}`}
                className="group hover:bg-bg2 flex items-baseline gap-6 px-2 py-6 transition-colors"
              >
                <span className="text-mute group-hover:text-gold w-8 shrink-0 font-mono text-sm tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="font-display group-hover:text-gold block text-2xl transition-colors">
                    {tool.title}
                  </span>
                  <span className="text-fg2 mt-1 block text-sm">
                    {tool.desc}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
