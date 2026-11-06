import type { ReactNode } from "react";
import { ImageIcon, ShieldAlert } from "lucide-react";

const DISCLAIMERS = {
  bn: "এই লেখাটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। এটি কোনো financial advice নয়। Trading-এ উল্লেখযোগ্য আর্থিক ঝুঁকি রয়েছে এবং আপনি আপনার বিনিয়োগের পুরোটাই হারাতে পারেন। Real money দিয়ে trade করার আগে demo account-এ অনুশীলন করুন।",
  en: "This material is for educational purposes only and does not constitute investment advice. Leveraged trading carries substantial risk of loss and is not suitable for all investors. Never trade with capital you cannot afford to lose. Practice thoroughly on a demo account before trading live funds.",
};

export function Disclaimer({
  children,
  lang = "bn",
}: {
  children?: ReactNode;
  lang?: "en" | "bn";
}) {
  return (
    <aside className="border-border bg-panel text-muted-foreground my-8 flex gap-3 rounded-xl border p-4 text-sm">
      <ShieldAlert className="text-gold mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>{children ?? DISCLAIMERS[lang] ?? DISCLAIMERS.bn}</p>
    </aside>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link decoration-link/50 hover:decoration-link underline underline-offset-2"
    >
      {children}
    </a>
  );
}

interface ChartPlaceholderProps {
  id: string;
  symbol?: string;
  timeframe?: string;
  period?: string;
  annotations?: string;
  caption?: string;
}

/** Visible TODO box for a chart image/JSON that still has to be produced. */
export function ChartPlaceholder({
  id,
  symbol,
  timeframe,
  period,
  annotations,
  caption,
}: ChartPlaceholderProps) {
  const meta = [symbol, timeframe, period].filter(Boolean).join(" · ");
  return (
    <figure className="border-placeholder/60 bg-placeholder/10 my-6 rounded-xl border-2 border-dashed p-5">
      <div className="text-placeholder flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
        <ImageIcon className="h-4 w-4" aria-hidden />
        Chart needed · {id}
      </div>
      {meta && <p className="text-foreground mt-2 text-sm">{meta}</p>}
      {annotations && (
        <p className="text-muted-foreground mt-1 text-sm">{annotations}</p>
      )}
      {caption && (
        <figcaption className="text-foreground mt-3 text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
