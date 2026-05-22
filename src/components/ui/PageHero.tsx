"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  intro?: ReactNode;
  meta?: { label: string; value: string }[];
  /**
   * When true, the hero takes a full viewport height and the content is
   * vertically centred — useful on pages where you want the heading to be
   * the only thing visible above the fold.
   */
  fillViewport?: boolean;
}

export default function PageHero({ eyebrow, title, subtitle, intro, meta, fillViewport }: Props) {
  return (
    <section
      className={`relative overflow-hidden ${
        fillViewport
          ? "min-h-[100svh] flex items-center pt-28 pb-16"
          : "pt-32 sm:pt-36 pb-12 sm:pb-16"
      }`}
    >
      <div className="absolute inset-0 paper opacity-50 pointer-events-none" />
      <div className="grain" />

      <div className="relative mx-auto max-w-7xl w-full px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-mono text-muted"
        >
          <span className="h-px w-10 bg-forest" />
          {eyebrow}
          <span className="h-px w-10 bg-forest" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] tracking-tight text-ink max-w-3xl mx-auto"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-graphite leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {intro && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 max-w-2xl mx-auto text-sm text-muted leading-relaxed"
          >
            {intro}
          </motion.div>
        )}

        {meta && meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 pt-7 border-t border-line max-w-4xl mx-auto text-center"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted">
                  {m.label}
                </dt>
                <dd className="mt-1.5 font-display text-xl text-forest tabular-nums">
                  {m.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>

      {fillViewport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-mono text-muted"
        >
          <span>Scroll to engage</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
