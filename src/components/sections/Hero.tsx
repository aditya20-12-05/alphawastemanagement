"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, Suspense } from "react";
import dynamic from "next/dynamic";

const ParticleSphere = dynamic(() => import("@/components/three/ParticleSphere"), {
  ssr: false,
  loading: () => null,
});

const headlineWords = ["Turning", "industrial", "waste", "into"];
const headlineHighlight = ["a", "revenue", "stream."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yShift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center pt-24 pb-12"
    >
      <div className="absolute inset-0 -z-10 dot-grid opacity-60" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-sage/60 via-mist/40 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-emerald/10 to-transparent blur-3xl rounded-full" />
      </div>
      <div className="grain" />

      <div className="absolute inset-0 -z-5 opacity-90 pointer-events-none">
        <Suspense fallback={null}>
          <ParticleSphere />
        </Suspense>
      </div>

      <motion.div
        style={{ y: yShift, opacity, scale }}
        className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass mb-7"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-graphite">
            A Mangalam Alloys Ltd. Venture
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight max-w-6xl">
          <span className="block">
            {headlineWords.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 80, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.25em] text-ink"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {headlineHighlight.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 80, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.5 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.25em] gradient-text italic"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-graphite leading-relaxed"
        >
          Alpha is a new waste-recycling venture built on 38 years of stainless-steel
          manufacturing and a government-recognised research programme. We turn
          hazardous industrial waste into sellable products — with{" "}
          <span className="text-forest font-semibold">zero residue dumped back</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#process"
            className="group relative inline-flex items-center gap-2 rounded-full bg-forest text-bg px-6 py-3.5 font-medium overflow-hidden"
          >
            <span className="relative z-10">See the process</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 bg-industrial translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 backdrop-blur-sm text-ink px-6 py-3.5 font-medium hover:border-forest hover:text-forest transition-colors"
          >
            Talk to us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line/60 max-w-3xl rounded-2xl overflow-hidden border border-line/80"
        >
          {[
            { k: "100%", l: "Mass balance" },
            { k: "180 MT", l: "Recycled / month" },
            { k: "7", l: "Granted patents" },
            { k: "38 yrs", l: "Parent operation" },
          ].map((s) => (
            <div key={s.l} className="bg-surface/80 backdrop-blur-sm p-4 sm:p-5">
              <div className="font-display text-2xl sm:text-3xl text-forest">{s.k}</div>
              <div className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
