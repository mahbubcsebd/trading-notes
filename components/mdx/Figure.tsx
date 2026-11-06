"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @param {{
 *   src: string,
 *   caption?: string,
 *   width?: number,
 *   height?: number,
 *   markers?: Array<{ x: string, y: string, label: string }>,
 *   className?: string,
 * }} props
 */
export function Figure({
  src,
  caption,
  width = 1200,
  height = 675,
  markers,
  className,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <figure className={cn("group relative my-6", className)}>
        <button
          type="button"
          className="border-border bg-panel relative block w-full cursor-zoom-in overflow-hidden rounded-xl border"
          onClick={() => setOpen(true)}
          aria-label={caption ? `Zoom: ${caption}` : "Zoom image"}
        >
          <Image
            src={src}
            alt={caption ?? ""}
            width={width}
            height={height}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
          <div className="bg-background/20 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn size={24} className="text-white drop-shadow-lg" />
          </div>
          {/* Numbered overlay markers */}
          {markers?.map((m, i) => (
            <span
              key={i}
              className="bg-gold text-background absolute flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shadow-lg"
              style={{ left: m.x, top: m.y }}
              aria-label={m.label}
            >
              {i + 1}
            </span>
          ))}
        </button>
        {caption && (
          <figcaption className="text-muted-foreground mt-2 text-center text-xs">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          className="bg-background/90 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? "Image lightbox"}
        >
          <button
            type="button"
            className="bg-card border-border text-muted-foreground hover:text-foreground absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border"
            onClick={() => setOpen(false)}
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={caption ?? ""}
              width={width}
              height={height}
              className="h-auto w-full rounded-xl"
            />
            {caption && (
              <p className="text-muted-foreground mt-3 text-center text-sm">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
