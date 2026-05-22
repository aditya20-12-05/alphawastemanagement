"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Tracks scroll progress through a section (0..1).
 *
 * We don't rely on scroll events because Lenis's smooth-scroll model fires
 * them inconsistently — `lenis.scrollTo({immediate:true})` doesn't dispatch
 * window scroll events at all. A continuous rAF loop plus a low-frequency
 * setInterval fallback (for environments where rAF is throttled) guarantees
 * the progress stays in sync however scrolling happens.
 *
 * `progress = 0` when the section's top edge touches the viewport top.
 * `progress = 1` when the section's bottom edge touches the viewport bottom.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = -1;

    const tick = () => {
      const el = ref.current;
      if (!el) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      raf = requestAnimationFrame(tick);
      if (rect.bottom < 0 || rect.top > winH) return;
      const total = rect.height - winH;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      if (Math.abs(p - last) > 0.003) {
        last = p;
        setProgress(p);
      }
    };

    raf = requestAnimationFrame(tick);
    const interval = setInterval(tick, 100);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, [ref]);

  return progress;
}
