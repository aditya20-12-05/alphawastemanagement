"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * United Nations Sustainable Development Goals that Alpha's work directly contributes
 * to. Five goals chosen on the basis of demonstrable operational overlap:
 * patented industrial innovation (9), construction outputs that support
 * sustainable urbanisation (11), circular product design (12), lower-
 * embodied-carbon processing (13), and keeping hazardous slag out of soil
 * and watershed (15).
 *
 * Official UN colours used for each badge:
 *   09 — #FD6925   11 — #FD9D24   12 — #BF8B2E
 *   13 — #3F7E44   15 — #56C02B
 */

const goals = [
  {
    number: "09",
    name: "Industry, innovation & infrastructure",
    body:
      "Seven granted patents and a DSIR-recognised R&D centre, commercializing zero-residue waste recovery at industrial scale.",
    color: "#FD6925",
  },
  {
    number: "11",
    name: "Sustainable cities & communities",
    body:
      "Cement-less bricks replace landfilled slag in the construction stream, with strength meaningfully higher than fly-ash equivalents.",
    color: "#FD9D24",
  },
  {
    number: "12",
    name: "Responsible consumption & production",
    body:
      "Every input becomes a marketable output. Recovered metals, gypsum, sulphates, and oxides feed back into other industries.",
    color: "#BF8B2E",
  },
  {
    number: "13",
    name: "Climate action",
    body:
      "Lower-carbon recovery aligned with CBAM and the steel-decarbonisation agenda, cutting embedded emissions for producers downstream.",
    color: "#3F7E44",
  },
  {
    number: "15",
    name: "Life on land",
    body:
      "Hazardous slag is kept out of soil and watershed: less landfill, less leaching, less pressure on natural aggregate quarries.",
    color: "#56C02B",
  },
];

export default function AboutSDGs() {
  return (
    <div className="rounded-3xl border border-line bg-ivory p-7 sm:p-10 lg:col-span-2 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <SectionLabel number="§ 06" title="United Nations Sustainable Goals" prominent />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base sm:text-[17px] text-graphite leading-relaxed mx-auto max-w-2xl"
        >
          Alpha&apos;s work overlaps with five United Nations Sustainable Development Goals.
        </motion.p>
        <p className="mt-4 text-base text-graphite leading-relaxed mx-auto max-w-2xl">
          The overlaps are operational, not aspirational — each goal below
          maps to something the process already delivers today.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {goals.map((g, i) => (
          <motion.div
            key={g.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}
            className="relative rounded-2xl border border-line bg-paper/60 p-5 flex flex-col"
          >
            <div
              className="inline-flex items-center justify-center self-start rounded-lg px-2.5 py-1.5 font-display text-base tabular-nums leading-none"
              style={{ background: g.color, color: "#fff" }}
            >
              {g.number}
            </div>
            <h4 className="mt-4 font-display text-base sm:text-lg text-ink leading-tight">
              {g.name}
            </h4>
            <p className="mt-2 text-[13px] sm:text-sm text-graphite leading-relaxed">
              {g.body}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="mt-7 text-center text-[10px] font-mono uppercase tracking-[0.22em] text-muted/70">
        Goal numbering and naming follows the United Nations 2030 Agenda.
      </p>
    </div>
  );
}
