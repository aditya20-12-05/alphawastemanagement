"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import Modal from "@/components/ui/Modal";

/* --------------------------------------------------------------------------
   PARTNER · four engagement modes + one shared contact form.
   Mobile: card chips open a modal preview; "Use this" CTA pipes the
   selection into the form's dropdown and scrolls to the form section.
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

/** Tailwind `lg` breakpoint is 1024px. Media-query based check that's
 *  SSR-safe (defaults to false until mount). */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export default function PartnerEngagement() {
  const [interested, setInterested] = useState<string>("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && models.some((m) => m.id === hash)) setInterested(hash);
  }, []);

  const previewModel = models.find((m) => m.id === previewId) ?? null;

  const handleCardClick = (id: string) => {
    if (isDesktop) {
      // Desktop: cards reveal their content inline, so click toggles the
      // form's dropdown selection.
      setInterested(interested === id ? "" : id);
    } else {
      // Mobile: cards are chips — click opens the preview modal.
      setPreviewId(id);
    }
  };

  const commitFromModal = (id: string) => {
    setInterested(id);
    setPreviewId(null);
    // Give the modal close animation a moment, then scroll the form into view.
    setTimeout(() => {
      const el = document.getElementById("partner-form");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 360);
  };

  return (
    <>
      {/* ---------- Engagement modes section ---------- */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 grain opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
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
            <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.28em] text-muted lg:hidden">
              Tap a chip to read details
            </p>
          </div>

          {/* Chip grid */}
          <div
            className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch"
            style={{ perspective: "1600px" }}
          >
            {models.map((m, i) => (
              <PartnerCard
                key={m.id}
                model={m}
                index={i}
                highlighted={interested === m.id}
                onSelect={() => handleCardClick(m.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact form section (visually separate on mobile) ---------- */}
      <section
        id="partner-form"
        className="relative bg-cream/60 border-t border-line py-16 sm:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 grain opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <ContactForm
            modelList={models}
            interested={interested}
            setInterested={setInterested}
          />
        </div>
      </section>

      {/* ---------- Mobile preview modal ---------- */}
      <Modal
        open={previewModel !== null}
        onClose={() => setPreviewId(null)}
        wrapperClassName="lg:hidden"
        ariaLabel={previewModel ? `${previewModel.label} details` : "Partnership details"}
      >
        {previewModel && (
          <PartnerModalContent
            model={previewModel}
            onCommit={() => commitFromModal(previewModel.id)}
          />
        )}
      </Modal>
    </>
  );
}

/* ---------- Card ---------- */

function PartnerCard({
  model,
  index,
  highlighted,
  onSelect,
}: {
  model: (typeof models)[number];
  index: number;
  highlighted: boolean;
  onSelect: () => void;
}) {
  const restShadow =
    "0 22px 44px -22px rgba(14,47,35,0.22), 0 10px 22px -12px rgba(14,47,35,0.14)";
  const hoverShadow =
    "0 40px 80px -28px rgba(14,47,35,0.35), 0 18px 38px -18px rgba(14,47,35,0.24), 0 6px 14px -8px rgba(14,47,35,0.14)";
  const selectedShadow =
    "0 36px 64px -22px rgba(14,47,35,0.34), 0 14px 30px -14px rgba(14,47,35,0.22), 0 4px 12px -6px rgba(14,47,35,0.12)";

  return (
    <motion.div
      id={model.id}
      role="button"
      tabIndex={0}
      aria-pressed={highlighted}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      initial={{ opacity: 0, y: 28, boxShadow: restShadow }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{
        y: highlighted ? -10 : 0,
        scale: highlighted ? 1.015 : 1,
        boxShadow: highlighted ? selectedShadow : restShadow,
      }}
      whileHover={{
        y: -16,
        scale: 1.03,
        boxShadow: hoverShadow,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6, delay: index * 0.08 },
      }}
      className={`group relative rounded-3xl border bg-ivory p-6 sm:p-9 flex flex-col h-full text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors duration-300 ${
        highlighted ? "border-forest" : "border-line hover:border-moss"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Edge ridges for 3D depth */}
      <div
        className="absolute inset-x-7 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(14,47,35,0.22), transparent)",
        }}
      />
      <div
        className="absolute inset-x-7 bottom-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
        }}
      />

      <div className="flex items-center justify-between">
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
          Partnership · {String(index + 1).padStart(2, "0")}
        </div>
        {highlighted ? (
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-forest bg-cream border border-line rounded-full px-2.5 py-0.5">
            Selected
          </span>
        ) : (
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:inline-block">
            Tap to select
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.1] text-ink">
        {model.label}
      </h3>
      <p className="mt-1.5 text-[12px] sm:text-sm font-mono uppercase tracking-[0.22em] text-sage">
        {model.note}
      </p>

      {/* Body + bullets — desktop only. Mobile gets a chip-style affordance. */}
      <p className="mt-5 text-base text-graphite leading-relaxed flex-1 hidden lg:block">
        {model.body}
      </p>
      <ul className="mt-6 space-y-2 hidden lg:block">
        {model.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-graphite leading-snug">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Mobile chip footer */}
      <div className="mt-6 flex items-center justify-between gap-3 lg:hidden">
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
          Read details
        </span>
        <span className="w-9 h-9 grid place-items-center rounded-full border border-line text-forest bg-paper/60">
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

      {/* Hover-only chevron — desktop affordance */}
      <motion.div
        className="absolute bottom-5 right-5 w-9 h-9 grid place-items-center rounded-full border border-line text-forest opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:grid"
        style={{ background: "rgba(245,241,232,0.6)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 7H13M13 7L7 1M13 7L7 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Modal preview body ---------- */

function PartnerModalContent({
  model,
  onCommit,
}: {
  model: (typeof models)[number];
  onCommit: () => void;
}) {
  return (
    <div className="px-6 pt-6 pb-8 sm:px-8 sm:pb-10">
      <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
        Partnership
      </div>
      <h3 className="mt-2 font-display text-3xl leading-[1.1] text-ink">
        {model.label}
      </h3>
      <p className="mt-1.5 text-sm font-mono uppercase tracking-[0.22em] text-sage">
        {model.note}
      </p>
      <p className="mt-5 text-base text-graphite leading-relaxed">
        {model.body}
      </p>
      <ul className="mt-6 space-y-3">
        {model.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-graphite leading-snug">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onCommit}
        className="mt-8 w-full inline-flex items-center justify-between gap-2 rounded-full bg-forest text-paper px-5 py-3.5 text-sm font-medium"
      >
        <span>Use this for my enquiry</span>
        <span>→</span>
      </button>
    </div>
  );
}

/* ---------- Contact form ---------- */

function ContactForm({
  modelList,
  interested,
  setInterested,
}: {
  modelList: typeof models;
  interested: string;
  setInterested: (v: string) => void;
}) {
  const selectedLabel = modelList.find((m) => m.id === interested)?.label;

  return (
    <Reveal direction="up">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel number="§ 02" title="Get in touch" />
        <h3 className="mt-6 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] text-ink">
          Start a conversation.
        </h3>
        <p className="mt-4 text-base text-graphite leading-relaxed mx-auto max-w-xl">
          Pick the engagement that fits and tell us a little about your
          situation. We&apos;ll come back with a structured next step.
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
        className="mt-10 mx-auto max-w-4xl rounded-3xl border border-line bg-ivory p-6 sm:p-10"
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
              {modelList.map((m) => (
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

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted max-w-sm">
            By submitting, you consent to Alpha contacting you about your
            enquiry. We don&apos;t share contact details.
          </p>
          <button
            type="submit"
            className="group relative inline-flex items-center justify-between sm:justify-center gap-2 rounded-full bg-forest text-paper px-6 py-3.5 text-sm font-medium overflow-hidden w-full sm:w-auto"
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
