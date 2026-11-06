import type { Block, Section } from "@/lib/types";
import { Figure } from "./Figures";

function Rich({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-fg">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return (
        <p>
          <Rich text={b.text} />
        </p>
      );
    case "def":
      return (
        <div className="my-6 rounded-xl border border-line bg-bg2 px-[18px] py-4 text-base leading-relaxed">
          <span className="eyebrow mb-1.5 block">Definition</span>
          <Rich text={b.text} />
        </div>
      );
    case "note":
      return (
        <div className="my-6 rounded-xl border border-line bg-bg2 px-[18px] py-4 text-base leading-relaxed">
          <span className="eyebrow mb-1.5 block">Note</span>
          <Rich text={b.text} />
        </div>
      );
    case "ul":
      return (
        <ul className="grid list-disc gap-2.5 pl-5 marker:text-gold">
          {b.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="grid list-decimal gap-2.5 pl-5 marker:text-gold">
          {b.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ol>
      );
    case "fig":
      return <Figure id={b.id} caption={b.caption} />;
    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-bg2">
                {b.head.map((h) => (
                  <th key={h} className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider text-gold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-line">
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium" : "text-fg2"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function Prose({ sections }: { sections: Section[] }) {
  return (
    <div className="text-[17px] leading-[1.75]">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24">
          <h2 className="mb-3.5 mt-12 text-[28px] leading-tight">{s.title}</h2>
          <div className="grid gap-4">
            {s.blocks.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
