"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import Modal from "@/components/ui/Modal";
import type { EngagementModel } from "./engagement-data";

/* --------------------------------------------------------------------------
   Shared grid component for both /services and /partnerships.
   Renders a list of EngagementModel cards on desktop, and chip-to-modal
   on mobile. Each card's CTA links to /contact?topic={id}, which pre-
   populates the dropdown in the contact form.
-------------------------------------------------------------------------- */

interface Props {
  sectionNumber: string;
  /** Small chapter-style label above the heading (e.g. "What we offer"). */
  sectionLabel: string;
  /** Lead heading (e.g. "Three services for waste producers."). */
  leadHeading: string;
  /** Body paragraph under the heading. */
  intro: string;
  /** The cards to render. */
  data: EngagementModel[];
}

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

export default function EngagementSection({
  sectionNumber,
  sectionLabel,
  leadHeading,
  intro,
  data,
}: Props) {
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  // If the visitor lands with a #hash matching one of our cards, highlight it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && data.some((m) => m.id === hash)) setHighlightId(hash);
  }, [data]);

  const previewModel = data.find((m) => m.id === previewId) ?? null;

  const handleCardClick = (id: string) => {
    if (isDesktop) {
      // Desktop: cards reveal their content inline. Click toggles a soft
      // highlight so the visitor can mark the one they're focused on.
      setHighlightId(highlightId === id ? null : id);
    } else {
      // Mobile: cards are chips — click opens the preview modal.
      setPreviewId(id);
    }
  };

  return (
    <>
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grain opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel number={sectionNumber} title={sectionLabel} prominent />
            <Reveal direction="up">
              <p className="mt-5 text-base sm:text-[17px] text-graphite leading-relaxed mx-auto max-w-xl">
                {leadHeading}
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p className="mt-3 text-base text-graphite leading-relaxed mx-auto max-w-xl">
                {intro}
              </p>
            </Reveal>
            <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.28em] text-muted lg:hidden">
              Tap a chip to read details
            </p>
          </div>

          {/* Card grid */}
          <div
            className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch"
            style={{ perspective: "1600px" }}
          >
            {data.map((m, i) => (
              <EngagementCard
                key={m.id}
                model={m}
                index={i}
                highlighted={highlightId === m.id}
                onSelect={() => handleCardClick(m.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile preview modal */}
      <Modal
        open={previewModel !== null}
        onClose={() => setPreviewId(null)}
        wrapperClassName="lg:hidden"
        ariaLabel={previewModel ? `${previewModel.label} details` : "Engagement details"}
      >
        {previewModel && (
          <EngagementModalContent model={previewModel} onClose={() => setPreviewId(null)} />
        )}
      </Modal>
    </>
  );
}

/* ---------- Card ---------- */

function EngagementCard({
  model,
  index,
  highlighted,
  onSelect,
}: {
  model: EngagementModel;
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
          {String(index + 1).padStart(2, "0")}
        </div>
        {highlighted ? (
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-forest bg-cream border border-line rounded-full px-2.5 py-0.5">
            Focused
          </span>
        ) : (
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:inline-block">
            Tap to focus
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.1] text-ink">
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

      {/* Discuss-this CTA — desktop only, on hover-reveal. */}
      <div className="mt-6 hidden lg:flex items-center justify-end">
        <Link
          href={`/contact?topic=${model.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/60 text-forest px-4 py-2 text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-forest"
        >
          Discuss this
          <span>→</span>
        </Link>
      </div>

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
    </motion.div>
  );
}

/* ---------- Modal preview body ---------- */

function EngagementModalContent({
  model,
  onClose,
}: {
  model: EngagementModel;
  onClose: () => void;
}) {
  return (
    <div className="px-6 pt-6 pb-8 sm:px-8 sm:pb-10">
      <h3 className="font-display text-3xl leading-[1.1] text-ink">
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

      <Link
        href={`/contact?topic=${model.id}`}
        onClick={onClose}
        className="mt-8 w-full inline-flex items-center justify-between gap-2 rounded-full bg-forest text-paper px-5 py-3.5 text-sm font-medium"
      >
        <span>Discuss this with Alpha</span>
        <span>→</span>
      </Link>
    </div>
  );
}
