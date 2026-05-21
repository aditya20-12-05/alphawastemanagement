"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const patents = [
  {
    title: "Recovery of gypsum from stainless-steel ETP neutralised sludge",
    jurisdiction: "Indian",
    status: "Granted",
  },
  {
    title: "Recovery of metals from stainless-steel ETP neutralised sludge",
    jurisdiction: "Indian",
    status: "Granted",
  },
  {
    title: "Recovery of metal from mill-scale waste",
    jurisdiction: "Indian",
    status: "Granted",
  },
  {
    title: "Method for recovery of metal from black slag",
    jurisdiction: "Indian",
    status: "Granted",
  },
  {
    title: "Recovery of metal from mill-scale waste",
    jurisdiction: "International",
    status: "Granted",
  },
  {
    title: "Method for recovery of metal from black slag",
    jurisdiction: "International",
    status: "Granted",
  },
  {
    title: "Development of De-oxidant-R from waste",
    jurisdiction: "Indian",
    status: "Granted",
  },
  {
    title: "Recovery of Mn / Cr / precious elements from non-magnetic stainless-steel slag and dross",
    jurisdiction: "Indian (3 filings)",
    status: "Under publication",
  },
];

export default function Patents() {
  return (
    <section id="patents" className="relative py-32 sm:py-40 bg-mist overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(11,61,46,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="05" title="Credibility" />
        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
              Engineered technology.
              <span className="block italic text-forest">Not an environmental claim.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Seven granted Indian and international patents — with further filings under publication.
              Process-based intellectual property developed and proven in-house at a DSIR-recognised R&amp;D centre.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line/60 rounded-3xl overflow-hidden border border-line">
            {[
              { k: "7", l: "Granted patents" },
              { k: "3rd", l: "DSIR R&D in Indian steel sector" },
              { k: "45", l: "Innovation projects completed" },
              { k: "CBAM", l: "Carbon reporting in line with EU" },
            ].map((s) => (
              <div key={s.l} className="bg-surface p-7">
                <div className="font-display text-4xl text-forest">{s.k}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted leading-snug">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-4">
          {patents.map((p, i) => (
            <motion.div
              key={p.title + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 hover:border-forest transition-colors"
            >
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-emerald/0 group-hover:bg-emerald/10 transition-all duration-500" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em]">
                    <span className="text-muted">PT</span>
                    <span className="tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-line" />
                    <span
                      className={
                        p.status === "Granted"
                          ? "text-emerald"
                          : "text-amber"
                      }
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg text-ink leading-snug">
                    {p.title}
                  </h3>
                  <div className="mt-3 text-xs font-mono uppercase tracking-[0.15em] text-muted">
                    {p.jurisdiction}
                  </div>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-full border border-line grid place-items-center text-forest group-hover:bg-forest group-hover:text-bg transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
