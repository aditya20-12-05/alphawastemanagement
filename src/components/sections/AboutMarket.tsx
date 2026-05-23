"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Macro-market context for the About page. Every figure on this card is
 * sourced and credited inline. Do not change a value without updating its
 * source. Sources are real, public statistics — do not invent numbers.
 */

const stats = [
  {
    region: "World",
    figure: "1.88 Bt",
    metric: "crude steel produced per year",
    source: "World Steel Association · 2023",
  },
  {
    region: "World",
    figure: "≈ 600 Mt",
    metric: "steel slag generated per year",
    source: "Euroslag · industry estimates",
  },
  {
    region: "EU",
    figure: "≈ 38 Mt",
    metric: "BF + steel slag generated per year",
    source: "Euroslag · 2022",
  },
  {
    region: "USA",
    figure: "≈ 16 Mt",
    metric: "iron & steel slag per year",
    source: "USGS · Mineral Commodity Summaries 2024",
  },
  {
    region: "India",
    figure: "149 Mt",
    metric: "crude steel produced (FY 2024)",
    source: "Ministry of Steel, Government of India",
  },
  {
    region: "EU CBAM",
    figure: "2026",
    metric: "Carbon Border Adjustment Mechanism — full phase-in",
    source: "European Commission",
  },
];

const tailwinds = [
  {
    k: "Tightening environmental rules",
    body: "Hazardous-waste disposal and landfill rules are getting stricter across the EU, US, and India. The cost and operational burden of dumping is rising every year.",
  },
  {
    k: "Carbon-border mechanisms",
    body: "The EU CBAM puts a real price on the embedded carbon of imported steel. Verified low-carbon and recycled-content processing becomes a competitive advantage.",
  },
  {
    k: "Recycled-content procurement",
    body: "US Inflation Reduction Act and EU green-deal procurement preferences favour materials with verifiable recovered content over virgin aggregates.",
  },
  {
    k: "Aggregate depletion",
    body: "Natural construction-aggregate deposits are tightening worldwide. Recovered steel-slag products and cement-less bricks become substitutes with their own market price.",
  },
];

export default function AboutMarket() {
  return (
    <div className="rounded-3xl border border-line bg-ivory p-7 sm:p-10 lg:col-span-2 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <SectionLabel number="§ 05" title="Market potential" />
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.2] text-ink"
        >
          Steel-making is one of the world&apos;s largest sources of industrial
          waste. The appetite for the recovered outputs is{" "}
          <span className="text-forest italic">global</span>.
        </motion.h2>
        <p className="mt-5 text-base text-graphite leading-relaxed mx-auto max-w-2xl">
          Carbon-border mechanisms, recycled-content mandates, and tightening
          environmental rules across major economies have turned waste recovery
          from a compliance cost into a market.
        </p>
      </div>

      {/* Stats grid */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.region + s.figure}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className="rounded-2xl border border-line bg-paper/60 p-5"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
              {s.region}
            </div>
            <div className="mt-2 font-display text-3xl text-forest tabular-nums leading-none">
              {s.figure}
            </div>
            <div className="mt-2 text-sm text-graphite leading-snug">{s.metric}</div>
            <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted/80">
              Source · {s.source}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Macro tailwinds */}
      <div className="mt-10 pt-8 border-t border-line">
        <div className="text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
            Macro tailwinds
          </div>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink leading-tight">
            Four forces driving the demand.
          </h3>
        </div>
        <div className="mt-7 grid md:grid-cols-2 gap-3">
          {tailwinds.map((t, i) => (
            <motion.div
              key={t.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="rounded-2xl border border-line bg-paper/60 p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-lg text-ink leading-tight">{t.k}</h4>
              </div>
              <p className="mt-2.5 text-sm text-graphite leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-7 text-center text-[10px] font-mono uppercase tracking-[0.22em] text-muted/70">
        Bt = billion tonnes &middot; Mt = million tonnes &middot; tonnes = single metric tonnes
      </p>
      <p className="mt-2 text-center text-[10px] font-mono uppercase tracking-[0.22em] text-muted/60">
        Figures are public-record statistics from the sources cited. Numbers rounded for readability.
      </p>
    </div>
  );
}
