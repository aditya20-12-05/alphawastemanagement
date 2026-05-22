"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";

const tiles = [
  {
    href: "/about",
    title: "About",
    meta: "Chapter I",
    body:
      "What Alpha is, who's behind it, and why it's credible. The parent company, the R&D centre, the patents — in short.",
    accent: "#0E2F23",
  },
  {
    href: "/process",
    title: "Process",
    meta: "Chapter II",
    body:
      "Four patented stages: segregation, metal recovery, hydrometallurgy, and cement-less brick manufacturing.",
    accent: "#1F3A2E",
  },
  {
    href: "/products",
    title: "Products",
    meta: "Chapter III",
    body:
      "Recovered metals, gypsum, sodium sulphate, metal-oxide powders, and bricks. Every stream with an industrial buyer.",
    accent: "#2F4E3E",
  },
  {
    href: "/partner",
    title: "Partner",
    meta: "Chapter IV",
    body:
      "Five ways to engage — MOU collection, on-site co-processing, investment, licensing, and international synergy.",
    accent: "#4A7C4E",
  },
];

export default function HomeNav() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(tiles.length - 1, Math.max(0, Math.floor(v * tiles.length)));
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      ref={ref}
      className="relative border-t border-line"
      style={{ height: `${tiles.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-paper">
        <div className="absolute inset-0 grain opacity-50 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-8 pt-24 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-mono text-muted"
          >
            <span className="h-px w-10 bg-forest" />
            Continue reading
          </motion.div>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1.1] tracking-tight max-w-2xl">
            The full picture in five chapters.
          </h2>
        </div>

        {/* Carousel stage */}
        <div
          className="relative flex-1 flex items-center justify-center"
          style={{ perspective: "1500px" }}
        >
          <div
            className="relative w-full max-w-7xl h-[440px] sm:h-[480px] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {tiles.map((t, i) => (
              <Card
                key={t.href}
                tile={t}
                index={i}
                active={active}
                total={tiles.length}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/* Footer controls */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-8 pb-10">
          <div className="flex items-center justify-between gap-6">
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="w-11 h-11 grid place-items-center rounded-full border border-line bg-ivory text-forest hover:border-forest disabled:opacity-30 transition-colors"
              aria-label="Previous chapter"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex items-center gap-2 flex-1 justify-center">
              {tiles.map((t, i) => (
                <button
                  key={t.href}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted group-hover:text-forest transition-colors">
                    {t.meta.split(" ")[1]}
                  </span>
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-10 bg-forest" : "w-4 bg-line"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActive((a) => Math.min(tiles.length - 1, a + 1))}
              disabled={active === tiles.length - 1}
              className="w-11 h-11 grid place-items-center rounded-full border border-line bg-ivory text-forest hover:border-forest disabled:opacity-30 transition-colors"
              aria-label="Next chapter"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
            Scroll, click, or use arrows
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({
  tile,
  index,
  active,
  total,
  onClick,
}: {
  tile: (typeof tiles)[number];
  index: number;
  active: number;
  total: number;
  onClick: () => void;
}) {
  const offset = index - active;
  const abs = Math.abs(offset);
  const isActive = offset === 0;
  const visible = abs <= 2;

  return (
    <motion.div
      onClick={() => (isActive ? null : onClick())}
      animate={{
        x: `${offset * 240}px`,
        rotateY: `${offset * -24}deg`,
        z: `${-abs * 160}px`,
        scale: 1 - abs * 0.07,
        opacity: visible ? 1 - abs * 0.18 : 0,
      }}
      transition={{ type: "spring", stiffness: 95, damping: 22, mass: 0.6 }}
      style={{
        transformStyle: "preserve-3d",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="absolute w-[260px] sm:w-[320px] md:w-[360px] aspect-[3/4]"
    >
      <motion.div
        animate={{ y: isActive ? [0, -8, 0] : 0 }}
        transition={
          isActive
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
        className={`h-full rounded-3xl border bg-ivory relative overflow-hidden ${
          isActive ? "border-forest shadow-deep cursor-default" : "border-line cursor-pointer"
        }`}
      >
        {/* Accent band */}
        <div className="h-1.5" style={{ background: tile.accent }} />

        <div className="p-7 sm:p-8 h-full flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
              {tile.meta}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>

          <h3 className="mt-6 font-display text-2xl sm:text-3xl text-ink leading-tight">
            {tile.title}
          </h3>

          <p className="mt-4 text-sm text-graphite leading-relaxed flex-1">
            {tile.body}
          </p>

          {isActive ? (
            <Link
              href={tile.href}
              className="mt-6 inline-flex items-center justify-between gap-3 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium group"
            >
              <span>Read this chapter</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ) : (
            <div className="mt-6 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
              Click to focus
            </div>
          )}
        </div>

        {/* Subtle inner ring for active state */}
        {isActive && (
          <div className="absolute inset-2 rounded-[20px] border border-forest/10 pointer-events-none" />
        )}
      </motion.div>
    </motion.div>
  );
}
