"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const grades = [
  { name: "Mild steel", note: "Essentially no added alloying elements", use: "Infrastructure, construction, structural bars", danger: 0 },
  { name: "Carbon steel", note: "Under ~1% chromium", use: "Light engineering applications", danger: 1 },
  { name: "Alloy steel", note: "Alloying in small proportion (< ~10% Cr)", use: "Engineering parts", danger: 2 },
  { name: "Stainless steel", note: "More than ~10% chromium", use: "Marine, oil & gas, valves, food processing", danger: 4 },
  { name: "Special / high-alloy", note: "Alloying element exceeds ~50%", use: "Aerospace, high-end applications", danger: 3 },
];

const stagewise = [
  { stage: "Melting", waste: "~ 6%", nature: "Non-hazardous", note: "Metal reacts with oxygen and becomes oxide. A measurable yield loss." },
  { stage: "Rolling", waste: "~ 2%", nature: "Non-hazardous", note: "Generated as metal is heated and rolled into shape." },
  { stage: "Finishing", waste: "~ 3%", nature: "Hazardous", note: "The bulk of the hazardous fraction is generated here." },
];

export default function ProcessProblem() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel number="§ 01" title="The Difficulty" />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] tracking-tight"
          >
            Steel-making generates waste at every stage.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-base text-graphite leading-relaxed mx-auto max-w-xl"
          >
            Steel is iron with different alloying elements added in different
            proportions. The amount of chromium and other alloys is what makes
            certain steel waste hazardous to handle.
          </motion.p>
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
                className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-line last:border-0"
              >
                <div className="col-span-3">
                  <div className="font-display text-base sm:text-lg text-ink leading-tight">
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
          <p className="mt-4 text-center text-xs font-mono uppercase tracking-[0.22em] text-muted">
            Danger bars indicate relative chromium content and corresponding waste handling difficulty.
          </p>
        </Reveal>

        <div className="mt-20 mx-auto max-w-3xl text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
            Waste generated per stage
          </div>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink leading-tight">
            Three stages, one hazardous fraction.
          </h3>
          <p className="mt-3 text-base text-graphite leading-relaxed mx-auto max-w-xl">
            Every metal that is melted passes through melting, rolling and finishing.
            Each stage generates waste; finishing produces the bulk of the hazardous
            fraction. This is the waste Alpha is built to process.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-3">
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
    </section>
  );
}
