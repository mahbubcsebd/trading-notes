import { Star } from 'lucide-react';

/**
 * Summary box at the top of a lesson.
 * @param {{ children: React.ReactNode }} props
 */
export function KeyTakeaways({ children }) {
  return (
    <div className="my-6 rounded-xl border border-gold/30 bg-gold/5 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gold/20 bg-gold/10">
        <Star size={14} className="text-gold" aria-hidden="true" />
        <span className="text-sm font-semibold text-gold">Key Takeaways</span>
      </div>
      <div className="px-4 py-3 text-sm leading-relaxed [&>ul]:my-0 [&>ul]:pl-4 [&>ul>li]:my-1">
        {children}
      </div>
    </div>
  );
}
