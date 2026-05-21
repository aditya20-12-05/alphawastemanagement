"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const models = [
  {
    id: "mou",
    label: "MOU collection",
    headline: "Year-round, regulation-ready.",
    body:
      "A steel plant signs an MOU with Alpha. We handle the plant's waste year-round — removing the dumping cost, the seasonal disruption and the regulatory burden.",
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
    body:
      "For a large producer, the plant provides space and Alpha co-processes and recycles on-site. The plant retains the carbon-credit and reputational benefit; Alpha funds and runs the operation.",
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
    body:
      "Alpha welcomes investors to fund the move from pilot scale to commercial operation. PLI approval secured. Standardised commercial machinery replaces improvised pilot equipment — improving recovery rates and unit economics.",
    bullets: [
      "Government PLI approval in hand",
      "Regional-hub deployment plan ready",
      "Defensibility via 7 granted patents",
    ],
  },
  {
    id: "license",
    label: "Licensing",
    headline: "License the tech. We keep equity.",
    body:
      "A partner can license Alpha's technology and run their own production, with Alpha retaining equity. Licensing in partnership — not an outright sale.",
    bullets: [
      "Faster geographic expansion via partners",
      "Alpha retains equity in licensed operations",
      "Technology transfer with ongoing support",
    ],
  },
  {
    id: "synergy",
    label: "Synergy / international",
    headline: "Two-way technology exchange.",
    body:
      "A two-way exchange of technology, replicating the model in partnership with industry abroad. Built for the realities of cross-border carbon mechanisms and aggregate-deposit depletion.",
    bullets: [
      "Cross-border tech exchange",
      "CBAM-aligned carbon performance",
      "Replicates model in new markets",
    ],
  },
];

export default function BusinessModel() {
  const [active, setActive] = useState(models[0].id);
  const current = models.find((m) => m.id === active)!;

  return (
    <section id="partners" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="06" title="The Business Model" />
        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
              Five ways to engage.
              <span className="block italic text-forest">Pick what fits.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Alpha collects industrial waste, applies patented processes, and sells the
              resulting products. Around that core, partners can engage in the way that
              best matches their constraints.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="relative rounded-3xl border border-line bg-surface overflow-hidden">
            <div className="flex flex-wrap gap-1 p-2 border-b border-line bg-mist/60">
              {models.map((m) => {
                const isActive = m.id === active;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActive(m.id)}
                    className="relative px-4 py-2.5 text-sm rounded-full transition-colors"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="model-pill"
                        className="absolute inset-0 rounded-full bg-forest"
                        transition={{ type: "spring", stiffness: 280, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-bg" : "text-graphite hover:text-forest"}`}>
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
                  <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">
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
                        className="flex items-start gap-3 rounded-2xl bg-sage/50 px-4 py-3.5"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                        <span className="text-sm text-graphite leading-snug">{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal className="mt-16" direction="up">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-forest text-bg p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 dot-grid opacity-[0.07]" />
              <div className="relative">
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/80">
                  Operational relief
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl">
                  A reliable, year-round answer to the waste problem — replacing a recurring cost and disruption.
                </h3>
              </div>
            </div>
            <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">
                Reputation asset
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink">
                A visible environmental contribution a partner can showcase — at home and internationally.
              </h3>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
