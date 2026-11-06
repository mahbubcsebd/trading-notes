"use client";

import { FileText } from "lucide-react";

interface DownloadPdfButtonProps {
  title: string;
  lang?: "en" | "bn";
  className?: string;
}

const PDF_TITLE_PREFIX = "TradeNotes";

/**
 * Opens the browser print dialog ("Save as PDF").
 * Native print keeps Bangla shaping, vector text and live chart canvases;
 * layout chrome is removed by the `@media print` rules in globals.css.
 * Dark theme is switched off for the print so text stays readable on paper.
 */
export function DownloadPdfButton({
  title,
  lang = "bn",
  className = "",
}: DownloadPdfButtonProps) {
  const isEn = lang === "en";

  const handlePrint = () => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    const originalTitle = document.title;

    const restore = () => {
      if (wasDark) root.classList.add("dark");
      document.title = originalTitle;
      window.removeEventListener("afterprint", restore);
    };

    window.addEventListener("afterprint", restore);
    if (wasDark) root.classList.remove("dark");
    // Browsers use document.title as the default PDF file name
    document.title = `${PDF_TITLE_PREFIX} - ${title}`;

    try {
      window.print();
    } catch (err) {
      console.error("Print dialog failed:", err);
      restore();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      data-pdf-exclude="true"
      className={`border-border bg-panel text-foreground hover:border-gold/50 hover:text-gold focus-visible:ring-ring inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${className}`}
      title={
        isEn
          ? "Save this page as PDF (choose “Save as PDF” in the dialog)"
          : "এই পেজটি PDF হিসেবে সেভ করুন (ডায়ালগে “Save as PDF” বেছে নিন)"
      }
    >
      <FileText size={12} className="text-gold" />
      <span>{isEn ? "Save PDF" : "PDF সেভ"}</span>
    </button>
  );
}
