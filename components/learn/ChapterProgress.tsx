"use client";

import { useEffect, useState } from "react";
import { getCompleted } from "@/lib/progress";

interface Props {
  slugPaths: string[];
  isEn: boolean;
}

export function ChapterProgress({ slugPaths, isEn }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const done = getCompleted();
    setCount(slugPaths.filter((s) => done.has(s)).length);
  }, [slugPaths]);

  const total = slugPaths.length;
  const pct = total ? Math.round((count / total) * 100) : 0;

  return (
    <div className="card">
      <h3 className="mb-3 text-xl">
        {isEn ? "Your progress" : "আপনার অগ্রগতি"}
      </h3>
      <div
        className="bg-line h-1.5 overflow-hidden rounded-full"
        role="progressbar"
        aria-label={isEn ? "Your progress" : "আপনার অগ্রগতি"}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={count}
      >
        <i
          className="bg-gold block h-full rounded-full transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-mute mt-2.5 flex justify-between font-mono text-xs tabular-nums">
        <span>
          {count} / {total} {isEn ? "lessons" : "পাঠ"}
        </span>
        <span>{pct}%</span>
      </div>
      <p className="text-mute mt-3 font-mono text-[11px]">
        {isEn ? "Saved in this browser." : "এই ব্রাউজারে সংরক্ষিত।"}
      </p>
    </div>
  );
}
