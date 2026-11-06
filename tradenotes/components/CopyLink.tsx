"use client";

import { useState } from "react";

export function CopyLink() {
  const [msg, setMsg] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMsg("Link copied");
    } catch {
      setMsg("Copy failed. Copy the address from your browser bar.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button type="button" className="btn btn-sm" onClick={copy}>
        Copy link
      </button>
      <span className="font-mono text-xs text-mute" role="status">
        {msg}
      </span>
    </div>
  );
}
