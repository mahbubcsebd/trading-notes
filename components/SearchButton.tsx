"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import type { SearchLabels } from "@/components/search/SearchDialog";

const SearchDialog = dynamic(
  () =>
    import("@/components/search/SearchDialog").then((m) => m.SearchDialog),
  { ssr: false },
);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

export function SearchButton({
  lang,
  labels,
}: {
  lang: string;
  labels: SearchLabels;
}) {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (open) setHasOpened(true);
  }, [open]);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKeyDown = (e: KeyboardEvent) => {
      const isModK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey);
      const isSlash = e.key === "/" && !isTypingTarget(e.target);
      if (!isModK && !isSlash) return;
      e.preventDefault();
      setOpen((wasOpen) => (isModK ? !wasOpen : true));
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="chip !w-[2.125rem] justify-center !px-0 sm:!w-52 sm:justify-start sm:!pr-2 sm:!pl-3"
      >
        <Search size={14} className="shrink-0" aria-hidden />
        <span className="sr-only text-left sm:not-sr-only sm:flex-1 sm:truncate">
          {labels.search}…
        </span>
        <kbd aria-hidden className="text-mute border-line hidden h-5 items-center rounded border px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>

      {hasOpened && (
        <SearchDialog
          open={open}
          onOpenChange={setOpen}
          lang={lang}
          labels={labels}
        />
      )}
    </>
  );
}
