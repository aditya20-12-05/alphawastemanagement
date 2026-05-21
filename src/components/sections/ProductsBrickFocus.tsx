"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "motion/react";

export default function ProductsBrickFocus() {
  return (
    <section className="relative py-28 sm:py-36 bg-cream border-t border-line overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 02" title="Focus · The Brick" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Stronger than fly-ash. Made from what would have been residue.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              The cement-less brick is the most distinctive output: residual metal dust
              replaces cement in the binder. The patent for the brick process is granted
              in India. Bricks are approved for use in homes, parking lots and hollow blocks.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="lg:col-span-7 rounded-3xl border border-line bg-ivory p-8 sm:p-12">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Comparative compressive strength
              </div>
              <div className="mt-8 flex items-end gap-10 sm:gap-16">
                <div className="flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 220 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full bg-forest rounded-t-xl relative"
                  >
                    <div className="absolute -top-10 left-0 right-0 text-center font-display text-2xl text-forest tabular-nums">
                      19–20
                    </div>
                  </motion.div>
                  <div className="mt-4 pt-3 border-t border-line text-center">
                    <div className="font-display text-lg text-ink">Alpha brick</div>
                    <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                      kg/sq mm
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 95 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full bg-rust/70 rounded-t-xl relative"
                  >
                    <div className="absolute -top-10 left-0 right-0 text-center font-display text-2xl text-rust tabular-nums">
                      8.5
                    </div>
                  </motion.div>
                  <div className="mt-4 pt-3 border-t border-line text-center">
                    <div className="font-display text-lg text-ink">Fly-ash brick</div>
                    <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                      kg/sq mm
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 grid gap-3">
              <div className="rounded-3xl bg-forest text-paper p-7">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                  Patent
                </div>
                <h4 className="mt-2 font-display text-2xl">Brick manufacturing process is patented in India.</h4>
              </div>
              <div className="rounded-3xl border border-line bg-ivory p-7">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                  Approvals
                </div>
                <h4 className="mt-2 font-display text-xl text-forest">
                  Homes, parking lots, hollow blocks, pre-cast walls, partition walls.
                </h4>
              </div>
              <div className="rounded-3xl border border-line bg-ivory p-7">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                  Pilot output
                </div>
                <h4 className="mt-2 font-display text-xl text-forest">
                  ≈ 1.5 lakh bricks produced — including community construction.
                </h4>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
