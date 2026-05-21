"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const snapshot = [
  { k: "Full name", v: "Mangalam Alloys Ltd. (MAL)" },
  { k: "Founded", v: "1988 · public company in 1995" },
  { k: "Business", v: "Stainless steel · integrated manufacturer" },
  { k: "Location", v: "Ahmedabad, Gujarat, India" },
  { k: "Footprint", v: "≈ 40,000 sq. m" },
  { k: "Capacity", v: "40,000 TPA" },
  { k: "Turnover", v: "≈ INR 400 crore" },
  { k: "Employees", v: "700+" },
];

const chain = [
  { step: "Buy", note: "Raw metal is purchased as scrap." },
  { step: "Melt", note: "Scrap is melted down." },
  { step: "Roll", note: "Molten metal is rolled into shapes, sizes, profiles." },
  { step: "Heat-treat", note: "Followed by a controlled heat-treatment process." },
  { step: "Finish", note: "Final stage produces bright bars — bars with a shiny, finished surface." },
];

const verticals = [
  "Offshore & marine",
  "Petrochemicals",
  "Oil & gas",
  "Food processing",
  "Pump & valve industries",
];

export default function AboutMangalam() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 01" title="The Parent" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Mangalam Alloys Ltd. — a 38-year integrated stainless-steel manufacturer on the Delhi–Mumbai freight corridor.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Alpha is a venture of Mangalam Alloys Ltd. The parent brings 38 years of
              manufacturing, a government-recognised research centre, and a family
              involvement in industrial waste handling that began three decades ago.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16" direction="up">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {snapshot.map((s) => (
              <div key={s.k} className="bg-ivory p-6">
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                  {s.k}
                </div>
                <div className="mt-2 font-display text-lg text-ink leading-snug">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-24 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7" direction="up">
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
              Integrated value chain — in-house, not outsourced
            </div>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl text-ink leading-tight">
              Scrap to bright bar, under one roof.
            </h3>
            <p className="mt-4 text-base text-graphite leading-relaxed max-w-2xl">
              Stainless steel worldwide has more than 300 grades; Mangalam works with
              around 40. The full range cycles every 45–60 days, with warehousing kept
              short — typically no more than 15 days. Production is made-to-order:
              booked first, manufactured to specification.
            </p>

            <ol className="mt-10 space-y-3 max-w-2xl">
              {chain.map((c, i) => (
                <motion.li
                  key={c.step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-start gap-5 border-t border-line pt-3"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-sage tabular-nums w-8 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 grid sm:grid-cols-[140px_1fr] gap-3 sm:gap-6 items-baseline">
                    <span className="font-display text-xl text-ink">{c.step}</span>
                    <span className="text-sm text-graphite leading-snug">{c.note}</span>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="up" delay={0.15}>
            <div className="rounded-3xl border border-line bg-ivory p-7 sm:p-9">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Customer profile · strictly B2B
              </div>
              <h4 className="mt-3 font-display text-2xl text-ink">
                An intermediate product, finished by others.
              </h4>
              <p className="mt-3 text-sm text-graphite leading-relaxed">
                Mangalam supplies engineering applications across five demanding verticals.
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {verticals.map((v) => (
                  <li
                    key={v}
                    className="inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-1.5 text-xs text-forest"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                    {v}
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-line">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                  Operating principle
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    { k: "Solid", v: "Zero" },
                    { k: "Liquid", v: "Zero" },
                    { k: "Air", v: "Zero" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl bg-paper border border-line p-3 text-center">
                      <div className="font-display text-xl text-forest">{s.v}</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mt-1">
                        {s.k} discharge
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-line">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                  Green infrastructure
                </div>
                <ul className="mt-3 space-y-2 text-sm text-graphite">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-sage shrink-0" />
                    <span>≈ 4.1 MW self-generated electricity — 3 MW solar, 1.5 MW wind.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-sage shrink-0" />
                    <span>Natural gas used in place of furnace oil — lower carbon emission.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-sage shrink-0" />
                    <span>On-site STP — wastewater treated and recycled ≈ 100%.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
