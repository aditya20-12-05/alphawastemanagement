"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function AboutWhatIs() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />
      <div className="relative mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <SectionLabel number="§ 01" title="What Alpha is" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.25] text-ink"
        >
          Alpha collects industrial steel waste and{" "}
          <span className="text-forest italic">valorizes</span> it into saleable
          products, with zero residue at the end.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 space-y-4 text-base text-graphite leading-relaxed mx-auto max-w-2xl"
        >
          <p>
            Most industrial steel waste today is dumped. That&apos;s expensive for
            producers, hard to do in monsoon, regulated by pollution-control
            authorities, and it doesn&apos;t make the waste go away.
          </p>
          <p>
            Alpha takes the waste in, runs it through four patented stages, and
            ships saleable output back out. Nothing leaves the site as residue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-10 inline-block rounded-2xl border border-line bg-ivory px-7 py-6 text-left"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
            In one line
          </div>
          <p className="mt-3 font-display text-lg sm:text-xl text-ink leading-snug max-w-md">
            Whatever comes in as waste leaves as a finished product or usable raw material.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
