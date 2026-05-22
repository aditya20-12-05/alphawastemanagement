"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const models = [
  {
    id: "mou",
    label: "MOU collection",
    note: "We handle your plant's waste year-round.",
    headline: "Year-round, regulation-ready.",
    body:
      "A steel plant signs an MOU with Alpha. We handle that plant's waste year-round, removing the dumping cost, the seasonal disruption, and the regulatory burden.",
    bullets: [
      "Replaces a recurring operational expense",
      "No weather/season dependency",
      "Pollution-control burden lifts off the producer",
    ],
  },
  {
    id: "onsite",
    label: "On-site co-processing",
    note: "We run the line on your premises.",
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
    note: "Fund the commercial scale-up.",
    headline: "Fund the commercial scale-up.",
    body:
      "Alpha welcomes investors to fund the move from pilot scale to commercial operation. PLI approval secured. Standardised commercial machinery replaces pilot equipment, improving recovery rates and unit economics.",
    bullets: [
      "Government PLI approval in hand",
      "Regional-hub deployment plan ready",
      "Defensibility via seven granted patents",
    ],
  },
  {
    id: "license",
    label: "Licensing",
    note: "Run your own. We retain equity.",
    headline: "License the technology. We retain equity.",
    body:
      "A partner can license Alpha's technology and run their own production, with Alpha retaining equity. Licensing in partnership, not an outright sale of the technology.",
    bullets: [
      "Faster geographic expansion via partners",
      "Alpha retains equity in licensed operations",
      "Technology transfer with ongoing support",
    ],
  },
  {
    id: "synergy",
    label: "Synergy · international",
    note: "Two-way technology exchange.",
    headline: "Two-way technology exchange.",
    body:
      "A two-way exchange of technology, replicating the model in partnership with industry abroad. Built for the realities of cross-border carbon mechanisms and aggregate-deposit depletion.",
    bullets: [
      "Cross-border technology exchange",
      "CBAM-aligned carbon performance",
      "Replicates the model in new markets",
    ],
  },
];

export default function PartnerEngagement() {
  const [active, setActive] = useState<string>("mou");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && models.some((m) => m.id === hash)) setActive(hash);
  }, []);

  const current = models.find((m) => m.id === active) ?? models[0];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel number="§ 01" title="Pick & apply" />
          <Reveal direction="up">
            <h2 className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.2] text-ink">
              Pick the engagement that fits, then start the conversation right here.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="mt-4 text-base text-graphite leading-relaxed mx-auto max-w-xl">
              Five engagement modes share the same operational core. They differ in
              financial structure and whose premises the line runs on. We respond within
              two working days.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="grid lg:grid-cols-12 gap-3 rounded-3xl border border-line bg-ivory overflow-hidden">
            {/* Left rail: model picker */}
            <div className="lg:col-span-4 border-r border-line bg-cream/40">
              <div className="px-6 sm:px-8 py-5 border-b border-line">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                  Engagement modes
                </div>
              </div>
              <ul className="p-2">
                {models.map((m, i) => {
                  const isActive = m.id === active;
                  return (
                    <li key={m.id}>
                      <button
                        id={m.id}
                        onClick={() => setActive(m.id)}
                        className={`group relative w-full text-left rounded-2xl px-4 sm:px-5 py-4 transition-colors ${
                          isActive ? "bg-forest text-paper" : "text-graphite hover:bg-cream"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <motion.span
                            animate={{ rotate: isActive ? 0 : -45, opacity: isActive ? 1 : 0.4 }}
                            transition={{ duration: 0.3 }}
                            className={isActive ? "text-fern" : "text-muted"}
                          >
                            →
                          </motion.span>
                        </div>
                        <div
                          className={`mt-1 font-display text-base sm:text-lg leading-tight ${
                            isActive ? "text-paper" : "text-ink"
                          }`}
                        >
                          {m.label}
                        </div>
                        <div
                          className={`mt-1 text-xs ${isActive ? "text-fern/90" : "text-muted"}`}
                        >
                          {m.note}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right panel: explanation + inline form */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-10"
                >
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                    <span className="border border-line bg-paper px-1.5 py-0.5">
                      Selected
                    </span>
                    <span>{current.label}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl sm:text-4xl leading-[1.05] text-ink">
                    {current.headline}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-graphite leading-relaxed max-w-2xl">
                    {current.body}
                  </p>

                  <ul className="mt-6 grid sm:grid-cols-2 gap-2">
                    {current.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                        className="flex items-start gap-3 rounded-xl bg-cream px-3.5 py-3"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                        <span className="text-sm text-graphite leading-snug">{b}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="my-8 rule" />

                  {/* Inline form — bound to the selected model */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(
                        `Thank you. Enquiry for "${current.label}" received. We'll wire this up to a real backend later.`
                      );
                    }}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                      Apply for this engagement
                    </div>
                    <div className="mt-4 grid sm:grid-cols-2 gap-4">
                      <Field label="Your name" id="p-name" placeholder="Full name" />
                      <Field label="Organisation" id="p-org" placeholder="Company / institution" />
                      <Field label="Email" id="p-email" type="email" placeholder="you@company.com" />
                      <Field label="Phone (optional)" id="p-phone" placeholder="+91 ..." />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="p-msg"
                        className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted"
                      >
                        Brief context (waste streams, volumes, fit)
                      </label>
                      <textarea
                        id="p-msg"
                        rows={4}
                        placeholder="A few lines is enough."
                        className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors resize-none"
                      />
                    </div>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-muted max-w-sm">
                        We respond within two working days. By submitting, you consent to
                        Alpha contacting you about your enquiry.
                      </p>
                      <button
                        type="submit"
                        className="group relative inline-flex items-center gap-2 rounded-full bg-forest text-paper px-5 py-3 text-sm font-medium overflow-hidden"
                      >
                        <span className="relative z-10">
                          Apply for {current.label.split(" ")[0]}
                        </span>
                        <span className="relative z-10 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                        <span className="absolute inset-0 bg-moss translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-line bg-paper/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors"
      />
    </div>
  );
}
