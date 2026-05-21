"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const patents = [
  { title: "Recovery of gypsum from stainless-steel ETP neutralised sludge", jurisdiction: "Indian", status: "Granted" },
  { title: "Recovery of metals from stainless-steel ETP neutralised sludge", jurisdiction: "Indian", status: "Granted" },
  { title: "Recovery of metal from mill-scale waste", jurisdiction: "Indian", status: "Granted" },
  { title: "Method for recovery of metal from black slag", jurisdiction: "Indian", status: "Granted" },
  { title: "Recovery of metal from mill-scale waste", jurisdiction: "International", status: "Granted" },
  { title: "Method for recovery of metal from black slag", jurisdiction: "International", status: "Granted" },
  { title: "Development of De-oxidant-R from waste", jurisdiction: "Indian", status: "Granted" },
  { title: "Recovery of Mn / Cr / precious elements from non-magnetic stainless-steel slag and dross", jurisdiction: "Indian (3 filings)", status: "Under publication" },
];

export default function AboutPatents() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 03" title="The Patents" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Engineered technology, not an environmental claim.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Seven granted Indian and international patents, with further filings under
              publication. Process-based intellectual property developed and proven in-house
              at a DSIR-recognised research centre.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-3">
          {patents.map((p, i) => (
            <motion.div
              key={p.title + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-ivory p-6 hover:border-forest transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em]">
                    <span className="text-muted">PT</span>
                    <span className="tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-line" />
                    <span className={p.status === "Granted" ? "text-sage" : "text-rust"}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg text-ink leading-snug">{p.title}</h3>
                  <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                    {p.jurisdiction}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
