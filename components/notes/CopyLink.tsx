"use client";

import { useState } from "react";

export function CopyLink({
  label,
  copiedLabel,
  failedLabel,
}: {
  label: string;
  copiedLabel: string;
  failedLabel: string;
}) {
  const [msg, setMsg] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMsg(copiedLabel);
    } catch {
      setMsg(failedLabel);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button type="button" className="btn btn-sm" onClick={copy}>
        {label}
      </button>
      <span className="text-mute font-mono text-xs" role="status">
        {msg}
      </span>
    </div>
  );
}
