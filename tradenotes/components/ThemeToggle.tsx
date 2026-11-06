"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("tn-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }

  return (
    <button type="button" className="chip" onClick={toggle} aria-label="Switch light or dark theme">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 1.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" />
      </svg>
      <span className="w-9 text-left">{theme === null ? "" : theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
