"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const grades = [
  { name: "Mild steel", note: "Essentially no added alloying elements", use: "Infrastructure, construction, structural bars", danger: 0 },
  { name: "Carbon steel", note: "Under ~1% chromium", use: "Light engineering applications", danger: 1 },
  { name: "Alloy steel", note: "Alloying in small proportion (< ~10% Cr)", use: "Engineering parts", danger: 2 },
  { name: "Stainless steel", note: "More than ~10% chromium — Mangalam's core product", use: "Marine, oil & gas, valves, food processing", danger: 4, primary: true },
  { name: "Special / high-alloy", note: "Alloying element exceeds ~50%", use: "Aerospace, high-end applications", danger: 3 },
];

const stagewise = [
  { stage: "Melting", waste: "~ 6%", nature: "Non-hazardous", note: "Metal reacts with oxygen and becomes oxide — a measurable yield loss." },
  { stage: "Rolling", waste: "~ 2%", nature: "Non-hazardous", note: "Generated as metal is heated and rolled into shape." },
  { stage: "Finishing", waste: "~ 3%", nature: "Hazardous", note: "The bulk of the hazardous fraction is generated here." },
];

export default function ProcessProblem() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 01" title="The Difficulty" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Stainless steel generates the most difficult waste in the industry.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Steel is fundamentally iron, with different elements added in different
              proportions. The amount of chromium is what separates the categories —
              and chromium is also what makes the waste hazardous.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="rounded-2xl border border-line bg-ivory overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-line bg-cream/50 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
              <div className="col-span-3">Category</div>
              <div className="col-span-5">Defining feature</div>
              <div className="col-span-4">Typical use</div>
            </div>
            {grades.map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`grid grid-cols-12 gap-4 px-6 py-5 border-b border-line last:border-0 ${
                  g.primary ? "bg-cream/40" : ""
                }`}
              >
                <div className="col-span-3">
                  <div className="font-display text-base sm:text-lg text-ink leading-tight flex items-center gap-2.5">
                    {g.primary && (
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-forest bg-paper border border-line rounded-full px-2 py-0.5">
                        Core
                      </span>
                    )}
                    {g.name}
                  </div>
                  <div className="mt-1 flex items-center gap-0.5">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <span
                        key={j}
                        className={`h-1 w-3 rounded-full ${j < g.danger ? "bg-rust" : "bg-line"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-5 text-sm text-graphite leading-snug">{g.note}</div>
                <div className="col-span-4 text-sm text-graphite leading-snug">{g.use}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-xs font-mono uppercase tracking-[0.22em] text-muted">
            Danger bars indicate relative chromium content and corresponding waste handling difficulty.
          </p>
        </Reveal>

        <Reveal className="mt-20" direction="up">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Waste generated per stage
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink leading-tight">
                Three stages, one hazardous fraction.
              </h3>
              <p className="mt-3 text-base text-graphite leading-relaxed">
                Every metal that is melted passes through melting, rolling and finishing.
                Each stage generates waste; finishing produces the bulk of the hazardous
                fraction. This is the waste Alpha is built to process.
              </p>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-3">
              {stagewise.map((s, i) => (
                <motion.div
                  key={s.stage}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className={`rounded-2xl border p-6 ${
                    s.nature === "Hazardous"
                      ? "border-rust/40 bg-rust/[0.04]"
                      : "border-line bg-ivory"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-display text-xl text-ink">{s.stage}</div>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-[0.22em] px-2 py-0.5 rounded-full border ${
                        s.nature === "Hazardous"
                          ? "border-rust/40 text-rust bg-paper"
                          : "border-line text-forest bg-paper"
                      }`}
                    >
                      {s.nature}
                    </span>
                  </div>
                  <div className="mt-5 font-display text-3xl tabular-nums text-forest">
                    {s.waste}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted mt-1">
                    of total throughput
                  </div>
                  <p className="mt-5 text-sm text-graphite leading-relaxed">{s.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
