"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const snapshot = [
  { k: "Founded", v: "1988" },
  { k: "Location", v: "Ahmedabad, India" },
  { k: "Capacity", v: "40,000 TPA" },
  { k: "Turnover", v: "≈ INR 400 cr" },
  { k: "Employees", v: "700+" },
  { k: "R&D", v: "DSIR · 2016" },
];

export default function AboutParent() {
  return (
    <section className="relative py-20 sm:py-28 bg-cream border-t border-line overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <SectionLabel number="§ 02" title="Who's behind it" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.25] text-ink"
        >
          Alpha is the recycling venture of{" "}
          <span className="text-forest">Mangalam Alloys Ltd.</span>, a 38-year steel
          manufacturer in Ahmedabad.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 space-y-4 text-base text-graphite leading-relaxed mx-auto max-w-2xl"
        >
          <p>
            Mangalam has spent decades figuring out how to handle steel waste responsibly,
            operating a government-recognised in-house research centre dedicated to it.
          </p>
          <p>
            Alpha is what comes next: taking the lab work to commercial scale, and offering
            it as a service to the wider steel industry.
          </p>
        </motion.div>
      </div>

      <Reveal className="mt-10 mx-auto max-w-3xl px-6 sm:px-8" direction="up" delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {snapshot.map((s) => (
            <div key={s.k} className="bg-ivory p-5 text-center">
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                {s.k}
              </div>
              <div className="mt-1 font-display text-base text-ink">{s.v}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
