'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

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
export function Figure({ src, caption, width = 1200, height = 675, markers, className }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure className={cn('my-6 group relative', className)}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-panel cursor-zoom-in" onClick={() => setOpen(true)}>
          <Image
            src={src}
            alt={caption ?? ''}
            width={width}
            height={height}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20">
            <ZoomIn size={24} className="text-white drop-shadow-lg" />
          </div>
          {/* Numbered overlay markers */}
          {markers?.map((m, i) => (
            <span
              key={i}
              className="absolute w-6 h-6 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center shadow-lg"
              style={{ left: m.x, top: m.y }}
              aria-label={m.label}
            >
              {i + 1}
            </span>
          ))}
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? 'Image lightbox'}
        >
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              alt={caption ?? ''}
              width={width}
              height={height}
              className="w-full h-auto rounded-xl"
            />
            {caption && (
              <p className="mt-3 text-center text-sm text-muted-foreground">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
