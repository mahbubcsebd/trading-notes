import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="font-mono text-6xl font-bold text-gold mb-4">404</p>
      <h1 className="text-2xl font-bold text-foreground mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        এই page টি পাওয়া যাচ্ছে না। হয়তো সরানো হয়েছে অথবা URL ভুল।
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-gold text-background font-semibold text-sm hover:bg-gold/90 transition-colors"
      >
        ← Go Home
      </Link>
    </div>
  );
}
