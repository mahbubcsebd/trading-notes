"use client";

import { useMemo, useState } from "react";
import { glossary } from "@/lib/glossary";

export const termId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function GlossaryList() {
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = glossary.filter(
      (g) => !term || g.term.toLowerCase().includes(term) || g.def.toLowerCase().includes(term) || g.bn.includes(q.trim()),
    );
    const map = new Map<string, typeof glossary>();
    for (const g of list) {
      const k = g.term[0].toUpperCase();
      map.set(k, [...(map.get(k) ?? []), g]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [q]);

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search terms in English or Bengali"
        aria-label="Search the glossary"
        className="mb-6 h-11 w-full max-w-md rounded-full border border-line bg-bg2 px-5 text-[15px] outline-none placeholder:text-mute focus:border-gold"
      />
      {groups.length === 0 && <p className="border-t border-line py-8 text-mute">No terms match that search. Try a shorter word.</p>}
      <div className="grid gap-10">
        {groups.map(([letter, items]) => (
          <section key={letter} aria-label={`Terms starting with ${letter}`}>
            <h2 className="mb-1 font-display text-3xl text-gold">{letter}</h2>
            <dl className="border-t border-line">
              {items.map((g) => (
                <div key={g.term} id={termId(g.term)} className="grid scroll-mt-24 gap-1 border-b border-line py-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-8">
                  <dt>
                    <span className="text-lg font-medium">{g.term}</span>
                    <span className="ml-3 text-gold">{g.bn}</span>
                  </dt>
                  <dd className="m-0">
                    <p className="text-fg2">{g.def}</p>
                    <p className="mt-1">{g.bnDef}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
