import { notFound } from 'next/navigation';
export default function ChartLabPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold mb-2">Chart Lab</h1>
      <p className="text-muted-foreground">Phase 3 e implement হবে (Lightweight Charts v5 + candle editor)।</p>
    </div>
  );
}
