"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const items = [
  {
    k: "7 granted patents",
    sub: "+ 3 under development",
    body: "Indian and international filings covering metal recovery, gypsum recovery, slag processing, and cement-less brick manufacturing.",
  },
  {
    k: "PLI-approved",
    sub: "Government of India",
    body: "Production Linked Incentive approval secured for commercial scale-up.",
  },
  {
    k: "DSIR-recognised",
    sub: "in-house R&D centre",
    body: "Department of Scientific & Industrial Research, Ministry of Science & Technology.",
  },
  {
    k: "CBAM-aligned",
    sub: "EU carbon reporting",
    body: "Carbon-emission reporting maintained in line with the EU Carbon Border Adjustment Mechanism.",
  },
];

export default function AboutCredibility() {
  return (
    <div className="rounded-3xl border border-line bg-ivory p-7 sm:p-10 flex flex-col">
      <div className="text-center">
        <SectionLabel number="§ 04" title="Why it's credible" />
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25] text-ink"
        >
          Operating today. Patents granted. PLI approved.
        </motion.h2>
      </div>

      <div className="mt-6 space-y-4 text-base text-graphite leading-relaxed">
        <p>
          This isn&apos;t a pitch-deck venture. The process is running inside
          Mangalam right now, valorizing approximately 180 tonnes of industrial
          waste each month under patented technology.
        </p>
        <p>
          Seven patents have been granted (Indian and international), with three
          more under development. The Government of India has approved commercial
          scale-up under its Production Linked Incentive scheme. The four
          credentials below are not aspirations — they are in hand.
        </p>
      </div>

      <div className="mt-7 pt-6 border-t border-line grid sm:grid-cols-2 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={it.k}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="rounded-2xl border border-line bg-paper/60 p-4"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base text-ink leading-tight">{it.k}</h3>
            </div>
            <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
              {it.sub}
            </div>
            <p className="mt-2 text-[13px] text-graphite leading-snug">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
