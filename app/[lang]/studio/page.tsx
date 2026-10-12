import { notFound } from 'next/navigation';

// Studio is only accessible in development
export default async function StudioPage({ params }: { params: { lang?: string } }) {
  const { lang = 'bn' } = await params;
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono mb-4">
          DEV ONLY
        </div>
        <h1 className="text-3xl font-bold text-foreground">Studio</h1>
        <p className="text-muted-foreground mt-1">Authoring tools — development mode only</p>
      </div>
      <div className="grid gap-4">
        <a
          href={`/${lang}/studio/write`}
          className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-gold/50 transition-all"
        >
          <span className="text-2xl">✍️</span>
          <div>
            <p className="font-semibold text-foreground">Article Editor</p>
            <p className="text-sm text-muted-foreground">MDX editor with live preview, image paste, frontmatter form</p>
          </div>
        </a>
        <a
          href={`/${lang}/studio/chart-lab`}
          className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-gold/50 transition-all"
        >
          <span className="text-2xl">📊</span>
          <div>
            <p className="font-semibold text-foreground">Chart Lab</p>
            <p className="text-sm text-muted-foreground">Manual candle drawing, annotations, CSV import, replay, export</p>
          </div>
        </a>
      </div>
    </div>
  );
}
