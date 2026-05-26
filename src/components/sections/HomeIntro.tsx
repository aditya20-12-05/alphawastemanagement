"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function HomeIntro() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-12 overflow-hidden">
      <div className="absolute inset-0 paper opacity-60 pointer-events-none" />
      <div className="grain" />

      <div className="relative mx-auto max-w-7xl w-full px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-mono text-muted"
        >
          <span className="h-px w-10 bg-forest" />
          A Mangalam Alloys Ltd. (MAL) venture · Ahmedabad, Gujarat
          <span className="h-px w-10 bg-forest" />
        </motion.div>

        <h1 className="mt-10 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[1.05] tracking-tight mx-auto max-w-6xl">
          {["Industry", "waste"].map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em] text-ink"
            >
              {w}
            </motion.span>
          ))}
          <span className="block">
            {["turned", "into"].map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em] text-forest"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              <span className="inline-block bg-sage text-paper rounded-xl sm:rounded-2xl px-[0.28em] py-[0.04em] leading-[0.95]">
                revenue
              </span>
              <span className="text-forest">.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-10 mx-auto max-w-2xl text-base sm:text-lg text-graphite leading-relaxed"
        >
          Alpha Waste Management is the waste-valorization venture of Mangalam Alloys
          Ltd. (MAL), a 38-year-old steel manufacturer with a government-recognised
          R&amp;D centre. We valorize industrial waste into recovered metals,
          gypsum, sodium sulphate, metal-oxide powders, and cement-less bricks.
          Pilot scale today; commercial scale-up underway under Government of India
          PLI approval.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 rounded-full bg-forest text-paper px-6 py-3.5 text-sm font-medium overflow-hidden relative"
          >
            <span className="relative z-10">See the process</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 bg-moss translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-ivory/60 text-ink px-6 py-3.5 text-sm font-medium hover:border-forest hover:text-forest transition-colors"
          >
            Contact us
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] font-mono text-muted"
        >
          <span>Scroll for the venture in motion</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
