import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-[15px] font-medium" aria-label="TradeNotes home">
      <span className="grid size-6 place-items-center rounded-[7px] bg-gold font-display text-[13px] leading-none text-gold-ink">
        T
      </span>
      <span>
        Trade<span className="text-gold">Notes</span>
      </span>
    </Link>
  );
}
