"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const outputs = [
  { tag: "Fe / Cr / Ni", name: "Recovered metals" },
  { tag: "CaSO₄", name: "Gypsum" },
  { tag: "Na₂SO₄", name: "Sodium sulphate" },
  { tag: "Fe₂O₃ · Cr₂O₃", name: "Metal-oxide powders" },
  { tag: "19–20 kg/sq mm", name: "Cement-less bricks" },
];

export default function AboutWhatIs() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 01" title="What Alpha is" />

        <div className="mt-6 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.25] text-ink">
              Alpha collects industrial waste from steel plants and recycles it into things
              other industries want to buy — with{" "}
              <span className="text-forest italic">zero residue</span> at the end.
            </h2>

            <div className="mt-7 space-y-4 text-base text-graphite leading-relaxed max-w-xl">
              <p>
                Most stainless-steel waste today is dumped. That&apos;s expensive for producers,
                hard to do in monsoon, regulated by pollution-control authorities — and it
                doesn&apos;t make the waste go away.
              </p>
              <p>
                Alpha takes the waste in, runs it through four patented stages, and ships
                five different products out. Nothing leaves the site as residue.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="left" delay={0.1}>
            <div className="rounded-3xl border border-line bg-ivory p-6 sm:p-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                What goes out
              </div>
              <ul className="mt-5 divide-y divide-line">
                {outputs.map((o, i) => (
                  <motion.li
                    key={o.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-display text-base text-ink">{o.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {o.tag}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-line text-xs text-muted leading-relaxed">
                All five streams have existing industrial buyers. Every kilogram in finds a kilogram out.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
