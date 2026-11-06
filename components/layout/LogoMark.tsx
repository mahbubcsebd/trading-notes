/** Brand mark: gold tile with a display-serif "T". Decorative. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-gold text-gold-ink font-display grid size-6 place-items-center rounded-[7px] text-[13px] leading-none ${className}`}
    >
      T
    </span>
  );
}
