import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <div className="eyebrow">404</div>
      <h1 className="mx-auto mt-4 max-w-xl text-[clamp(36px,6vw,56px)] leading-[1.08]">That page does not exist</h1>
      <p className="mx-auto mt-4 max-w-md text-fg2">The link may be old or mistyped. Try the curriculum, or press Ctrl K to search.</p>
      <div className="mt-8 flex justify-center gap-2.5">
        <Link href="/learn" className="btn btn-gold">Open curriculum</Link>
        <Link href="/" className="btn">Home</Link>
      </div>
    </div>
  );
}
