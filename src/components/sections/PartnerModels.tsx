"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const models = [
  {
    id: "mou",
    label: "MOU collection",
    headline: "Year-round, regulation-ready.",
    body: "A steel plant signs an MOU with Alpha. We handle that plant's waste year-round — removing the dumping cost, the seasonal disruption, and the regulatory burden.",
    bullets: [
      "Replaces a recurring operational expense",
      "No weather/season dependency",
      "Pollution-control burden lifts off the producer",
    ],
  },
  {
    id: "onsite",
    label: "On-site co-processing",
    headline: "Plant retains the credit. We run the operation.",
    body: "For a large producer, the plant provides space and Alpha co-processes and recycles on-site. The plant retains the carbon-credit and reputational benefit; Alpha funds and runs the operation.",
    bullets: [
      "Producer keeps carbon-credit and ESG reporting",
      "Alpha funds and operates the recycling line",
      "Eliminates waste transport",
    ],
  },
  {
    id: "investment",
    label: "Investment",
    headline: "Fund the commercial scale-up.",
    body: "Alpha welcomes investors to fund the move from pilot scale to commercial operation. PLI approval secured. Standardised commercial machinery replaces pilot equipment — improving recovery rates and unit economics.",
    bullets: [
      "Government PLI approval in hand",
      "Regional-hub deployment plan ready",
      "Defensibility via seven granted patents",
    ],
  },
  {
    id: "license",
    label: "Licensing",
    headline: "License the technology. We retain equity.",
    body: "A partner can license Alpha's technology and run their own production, with Alpha retaining equity. Licensing in partnership — not an outright sale of the technology.",
    bullets: [
      "Faster geographic expansion via partners",
      "Alpha retains equity in licensed operations",
      "Technology transfer with ongoing support",
    ],
  },
  {
    id: "synergy",
    label: "Synergy · international",
    headline: "Two-way technology exchange.",
    body: "A two-way exchange of technology, replicating the model in partnership with industry abroad. Built for the realities of cross-border carbon mechanisms and aggregate-deposit depletion.",
    bullets: [
      "Cross-border technology exchange",
      "CBAM-aligned carbon performance",
      "Replicates the model in new markets",
    ],
  },
];

export default function PartnerModels() {
  const [active, setActive] = useState(models[0].id);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (hash && models.some((m) => m.id === hash)) setActive(hash);
  }, []);

  const current = models.find((m) => m.id === active) ?? models[0];

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 01" title="The Engagement Modes" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Pick the engagement that fits the producer&apos;s constraints.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              The five modes share the same operational core: patented recycling
              processes applied to industrial waste. They differ in financial structure
              and whose premises the line runs on.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="relative rounded-3xl border border-line bg-ivory overflow-hidden">
            <div className="flex flex-wrap gap-1 p-2 border-b border-line bg-cream/40">
              {models.map((m) => {
                const isActive = m.id === active;
                return (
                  <button
                    key={m.id}
                    id={m.id}
                    onClick={() => setActive(m.id)}
                    className="relative px-4 py-2.5 text-sm rounded-full transition-colors"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="model-pill"
                        className="absolute inset-0 rounded-full bg-forest"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-paper" : "text-graphite hover:text-forest"}`}>
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-10 p-8 sm:p-12"
              >
                <div className="lg:col-span-7">
                  <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                    Engagement model
                  </div>
                  <h3 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.05] text-ink">
                    {current.headline}
                  </h3>
                  <p className="mt-5 text-base sm:text-lg text-graphite leading-relaxed max-w-2xl">
                    {current.body}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <ul className="flex flex-col gap-3">
                    {current.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                        className="flex items-start gap-3 rounded-2xl bg-cream px-4 py-3.5"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                        <span className="text-sm text-graphite leading-snug">{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
