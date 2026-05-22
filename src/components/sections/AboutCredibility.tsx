"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    k: "7 granted patents",
    body: "Indian and international, covering metal recovery, gypsum recovery, slag processing, and cement-less brick manufacturing.",
  },
  {
    k: "PLI-approved",
    body: "Production Linked Incentive approval secured from the Government of India for commercial scale-up.",
  },
  {
    k: "DSIR-recognised R&D",
    body: "Government-recognised in-house research centre (Department of Scientific & Industrial Research, Government of India).",
  },
  {
    k: "CBAM-aligned carbon",
    body: "Carbon-emission reporting maintained in line with the EU Carbon Border Adjustment Mechanism.",
  },
];

export default function AboutCredibility() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 03" title="Why it's credible" />

        <div className="mt-6 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.25] text-ink">
              Engineered, government-recognised, and already operating.
            </h2>
            <p className="mt-5 text-base text-graphite leading-relaxed max-w-xl">
              Alpha isn&apos;t a concept. The process runs today inside Mangalam, recycling about
              180 tonnes of waste a month under patented technology. Four credentials, in short:
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-3">
          {items.map((it, i) => (
            <motion.div
              key={it.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="rounded-2xl border border-line bg-ivory p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-ink leading-tight">{it.k}</h3>
              </div>
              <p className="mt-3 text-sm text-graphite leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
