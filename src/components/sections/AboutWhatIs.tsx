"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function AboutWhatIs() {
  return (
    <div className="rounded-3xl border border-line bg-ivory p-7 sm:p-10 flex flex-col">
      <div className="text-center">
        <SectionLabel number="§ 01" title="What Alpha is" prominent />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base sm:text-[17px] text-graphite leading-relaxed mx-auto max-w-xl"
        >
          Alpha collects industrial steel waste and valorizes it into saleable
          products, with{" "}
          <span className="text-forest italic">zero residue</span> at the end.
        </motion.p>
      </div>

      <div className="mt-6 space-y-4 text-base text-graphite leading-relaxed">
        <p>
          Most industrial steel waste today is dumped. That&apos;s expensive for
          producers, hard to do in monsoon, regulated by pollution-control
          authorities, and it doesn&apos;t make the waste go away.
        </p>
        <p>
          Alpha takes the waste in, runs it through patented stages, and
          ships saleable output back out. Nothing leaves the site as residue.
        </p>
      </div>

      <div className="mt-7 pt-6 border-t border-line">
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted text-center">
          In one line
        </div>
        <p className="mt-3 font-display text-lg sm:text-xl text-ink leading-snug text-center">
          Whatever comes in as waste leaves as a finished product or usable raw
          material.
        </p>
      </div>
    </div>
  );
}
