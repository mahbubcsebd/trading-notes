"use client";

import { useEffect } from "react";

/** Registers /sw.js (production only) so Chrome offers "Install app". */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) => console.error("[pwa] service worker failed", err));
  }, []);
  return null;
}
