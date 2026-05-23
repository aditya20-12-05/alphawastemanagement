"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/* --------------------------------------------------------------------------
   PARTNER · four engagement modes + one shared contact form.
-------------------------------------------------------------------------- */

const models = [
  {
    id: "operations",
    label: "Operations partnership",
    note: "MOU collection or on-site co-processing.",
    body:
      "Alpha handles a steel plant's waste end-to-end. Either we collect it under a multi-year MOU and process it at our hub, or we co-process on the producer's own site. In both forms, Alpha funds the equipment and runs the operation; the producer retains the carbon-credit, the ESG reporting, and the reputational benefit.",
    bullets: [
      "MOU collection: year-round waste handling at our hub",
      "On-site co-processing: a dedicated line at your plant",
      "Producer keeps carbon credits and ESG reporting",
    ],
  },
  {
    id: "investment",
    label: "Investment",
    note: "Indian capital. Alpha retains stewardship.",
    body:
      "Equity participation from Indian institutional partners and accredited investors backing Alpha's expansion. Capital funds the move from our current operating footprint to industrial throughput — standardised commercial machinery and the first regional hubs. Alpha retains the patented process, operational supervision, and a meaningful equity stake in every project, so process control and economic incentives stay aligned.",
    bullets: [
      "Equity participation for Indian investors",
      "Government of India PLI approval in hand",
      "Alpha retains operational stewardship and equity",
    ],
  },
  {
    id: "licensing",
    label: "Licensing",
    note: "International partners. Alpha supervises.",
    body:
      "For international partners deploying Alpha's process in their own region. The partner funds the build, runs the line, and operates under local regulation. Alpha provides the technology transfer, the technical supervision, and retains a meaningful equity interest — skin in the game on every licensed plant. We don't sell the technology; we partner around it.",
    bullets: [
      "Patented process licensed for an agreed territory",
      "Partner funds the build and operates the line",
      "Alpha supervises technically and retains equity",
    ],
  },
  {
    id: "collaboration",
    label: "Collaboration",
    note: "Two-way technology exchange.",
    body:
      "A research-led partnership with international institutes, steel producers, and recycling operators. Alpha contributes its patented process and operational know-how; partners contribute complementary capabilities — new waste streams, new geographies, new chemistries. Shared R&D, shared IP where it makes sense, shared upside.",
    bullets: [
      "Two-way technology exchange with strategic partners",
      "Joint R&D into new waste streams and chemistries",
      "Cross-border applications under CBAM and similar",
    ],
  },
];

export default function PartnerEngagement() {
  const [interested, setInterested] = useState<string>("");

  // Honour ?id=X hash on first load (e.g. /partner#investment).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && models.some((m) => m.id === hash)) setInterested(hash);
  }, []);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        {/* Engagement modes header */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel number="§ 01" title="Engagement modes" />
          <Reveal direction="up">
            <h2 className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.2] text-ink">
              Four ways to work with us.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="mt-4 text-base text-graphite leading-relaxed mx-auto max-w-xl">
              Each engagement shares the same operational core. They differ in
              who funds the build, who runs the line, and where Alpha sits in
              the value chain.
            </p>
          </Reveal>
        </div>

        {/* 2×2 partnership chip-blocks */}
        <div className="mt-12 sm:mt-14 grid lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {models.map((m, i) => (
            <PartnerCard key={m.id} model={m} index={i} highlighted={interested === m.id} />
          ))}
        </div>

        {/* Common contact form */}
        <ContactForm models={models} interested={interested} setInterested={setInterested} />
      </div>
    </section>
  );
}

function PartnerCard({
  model,
  index,
  highlighted,
}: {
  model: (typeof models)[number];
  index: number;
  highlighted: boolean;
}) {
  return (
    <motion.div
      id={model.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl border bg-ivory p-7 sm:p-9 flex flex-col h-full transition-colors ${
        highlighted ? "border-forest" : "border-line"
      }`}
      style={highlighted ? { boxShadow: "0 24px 48px -22px rgba(14,47,35,0.25)" } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
          Partnership · {String(index + 1).padStart(2, "0")}
        </div>
        {highlighted && (
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-forest bg-cream border border-line rounded-full px-2.5 py-0.5">
            Selected
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] text-ink">
        {model.label}
      </h3>
      <p className="mt-1.5 text-sm font-mono uppercase tracking-[0.22em] text-sage">
        {model.note}
      </p>

      <p className="mt-5 text-base text-graphite leading-relaxed flex-1">
        {model.body}
      </p>

      <ul className="mt-6 space-y-2">
        {model.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-graphite leading-snug">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ContactForm({
  models,
  interested,
  setInterested,
}: {
  models: typeof models;
  interested: string;
  setInterested: (v: string) => void;
}) {
  const selectedLabel = models.find((m) => m.id === interested)?.label;

  return (
    <Reveal className="mt-16 sm:mt-20" direction="up">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel number="§ 02" title="Get in touch" />
        <h3 className="mt-6 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] text-ink">
          Start a conversation.
        </h3>
        <p className="mt-4 text-base text-graphite leading-relaxed mx-auto max-w-xl">
          Pick the engagement that fits and tell us a little about your
          situation. We respond with a structured next step within two working
          days.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            `Thank you. Enquiry${
              selectedLabel ? ` for "${selectedLabel}"` : ""
            } received. We'll wire this up to a real backend later.`
          );
        }}
        className="mt-10 mx-auto max-w-4xl rounded-3xl border border-line bg-ivory p-7 sm:p-10"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your name" id="p-name" placeholder="Full name" />
          <Field label="Organisation" id="p-org" placeholder="Company / institution" />
          <Field label="Email" id="p-email" type="email" placeholder="you@company.com" />
          <Field label="Phone (optional)" id="p-phone" placeholder="+91 ..." />
        </div>

        <div className="mt-5">
          <label
            htmlFor="p-interested"
            className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted"
          >
            Interested in
          </label>
          <div className="relative mt-2">
            <select
              id="p-interested"
              value={interested}
              onChange={(e) => setInterested(e.target.value)}
              className="w-full appearance-none rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest focus:bg-ivory transition-colors cursor-pointer"
            >
              <option value="">Choose a partnership…</option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              ▾
            </span>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="p-msg"
            className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted"
          >
            Brief context (waste streams, volumes, fit)
          </label>
          <textarea
            id="p-msg"
            rows={5}
            placeholder="A few lines is enough."
            className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors resize-none"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted max-w-sm">
            By submitting, you consent to Alpha contacting you about your
            enquiry. We don&apos;t share contact details.
          </p>
          <button
            type="submit"
            className="group relative inline-flex items-center gap-2 rounded-full bg-forest text-paper px-6 py-3.5 text-sm font-medium overflow-hidden"
          >
            <span className="relative z-10">
              {selectedLabel ? `Send enquiry · ${selectedLabel.split(" ")[0]}` : "Send enquiry"}
            </span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 bg-moss translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </form>
    </Reveal>
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
