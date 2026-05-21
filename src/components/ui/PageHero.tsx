"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: { label: string; value: string }[];
}

export default function PageHero({ eyebrow, title, intro, meta }: Props) {
  return (
    <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 paper opacity-50 pointer-events-none" />
      <div className="grain" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-mono text-muted"
        >
          <span className="h-px w-10 bg-forest" />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-5xl"
        >
          {title}
        </motion.h1>

        {intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-10 max-w-2xl text-lg text-graphite leading-relaxed"
          >
            {intro}
          </motion.div>
        )}

        {meta && meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 pt-8 border-t border-line max-w-4xl"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted">
                  {m.label}
                </dt>
                <dd className="mt-2 font-display text-2xl text-forest tabular-nums">
                  {m.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
