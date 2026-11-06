import { Star } from "lucide-react";

/**
 * Summary box at the top of a lesson.
 * @param {{ children: React.ReactNode }} props
 */
export function KeyTakeaways({ children }) {
  return (
    <div className="border-keynote/40 border-l-keynote bg-keynote/10 my-6 overflow-hidden rounded-xl border border-l-4">
      <div className="border-keynote/20 bg-keynote/10 flex items-center gap-2 border-b px-4 py-2.5">
        <Star size={14} className="text-keynote" aria-hidden="true" />
        <span className="text-keynote text-sm font-semibold">
          Key Takeaways
        </span>
      </div>
      <div className="px-4 py-3 text-sm leading-relaxed [&>ul]:my-0 [&>ul]:pl-4 [&>ul>li]:my-1">
        {children}
      </div>
    </div>
  );
}
