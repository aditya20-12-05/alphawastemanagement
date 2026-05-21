"use client";

import { motion } from "motion/react";
import Link from "next/link";

const tiles = [
  {
    href: "/about",
    title: "The venture & the parent",
    meta: "About",
    body:
      "Mangalam Alloys Ltd., a DSIR-recognised research centre, three decades of waste-management work, and seven patents.",
  },
  {
    href: "/process",
    title: "How the process works",
    meta: "Process",
    body:
      "Four patented stages — segregation, metal recovery, hydrometallurgy, and cement-less brick manufacturing.",
  },
  {
    href: "/products",
    title: "Five output streams",
    meta: "Products",
    body:
      "Recovered metals, gypsum, sodium sulphate, metal-oxide powders, and bricks at 19–20 kg/sq mm compressive strength.",
  },
  {
    href: "/future",
    title: "Direction & market",
    meta: "Future",
    body:
      "Regional recycling hubs across India, nine in-flight R&D projects, and the macro context for zero-residue recycling.",
  },
  {
    href: "/partner",
    title: "Five ways to engage",
    meta: "Partner",
    body:
      "MOU collection, on-site co-processing, investment, licensing, and international technology synergy.",
  },
];

export default function HomeNav() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-line">
      <div className="absolute inset-0 grain opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-mono text-muted"
        >
          <span className="h-px w-10 bg-forest" />
          Continue reading
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight max-w-3xl"
        >
          The full picture in five chapters.
        </motion.h2>

        <div className="mt-14 grid lg:grid-cols-3 gap-px bg-line border border-line rounded-3xl overflow-hidden">
          {tiles.map((t, i) => (
            <motion.div
              key={t.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="bg-ivory"
            >
              <Link
                href={t.href}
                className="group relative block p-8 sm:p-10 h-full hover:bg-paper transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                    {String(i + 1).padStart(2, "0")} · {t.meta}
                  </div>
                  <span className="w-9 h-9 grid place-items-center rounded-full border border-line text-forest group-hover:bg-forest group-hover:text-paper group-hover:border-forest transition-colors">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7H13M13 7L7 1M13 7L7 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl sm:text-3xl text-ink leading-tight">
                  {t.title}
                </h3>
                <p className="mt-4 text-sm text-graphite leading-relaxed">{t.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
