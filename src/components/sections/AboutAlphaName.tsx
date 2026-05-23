"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function AboutAlphaName() {
  return (
    <div className="relative rounded-3xl border border-line bg-forest text-paper p-7 sm:p-10 overflow-hidden flex flex-col">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      <div className="absolute -right-12 -top-12 text-[12rem] font-display text-paper/[0.05] select-none pointer-events-none leading-none">
        α
      </div>

      <div className="relative text-center">
        <SectionLabel number="§ 02" title="Why the name" variant="dark" />
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25]"
        >
          <span className="text-fern italic">Alpha</span> means first.
        </motion.h2>
      </div>

      <div className="relative mt-6 space-y-4 text-base text-paper/80 leading-relaxed">
        <p>
          It&apos;s the letter every system begins with. It&apos;s where every value
          chain starts. And it&apos;s where we sit in this industry — among the first
          operating this kind of waste valorization at commercial scale in India.
        </p>
        <p>
          The name carries both meanings at once. The position we&apos;re working
          toward in the market, and the part of the system we work at: the
          beginning, where waste becomes input.
        </p>
      </div>

      <div className="relative mt-7 pt-6 border-t border-paper/15 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
            Position
          </div>
          <div className="mt-2 font-display text-xl text-paper">Leading</div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
            Stage
          </div>
          <div className="mt-2 font-display text-xl text-paper">First in line</div>
        </div>
      </div>
    </div>
  );
}
