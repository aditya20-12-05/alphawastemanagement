"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const snapshot = [
  { k: "Founded", v: "1988" },
  { k: "Location", v: "Ahmedabad" },
  { k: "Capacity", v: "40,000 TPA" },
  { k: "Gross sales · FY26", v: "₹514.24 cr" },
  { k: "Employees", v: "700+" },
  { k: "R&D", v: "DSIR · 2016" },
];

export default function AboutParent() {
  return (
    <div className="rounded-3xl border border-line bg-ivory p-7 sm:p-10 flex flex-col">
      <div className="text-center">
        <SectionLabel number="§ 03" title="Who's behind it" prominent />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base sm:text-[17px] text-graphite leading-relaxed mx-auto max-w-xl"
        >
          Alpha is the venture of{" "}
          <span className="text-forest">Mangalam Alloys Ltd.</span>, a
          38-year stainless-steel manufacturer in Ahmedabad.
        </motion.p>
      </div>

      <div className="mt-6 space-y-4 text-base text-graphite leading-relaxed">
        <p>
          Being a leading manufacturer of stainless steel, Mangalam has spent
          decades researching how to handle steel waste responsibly, operating a
          government-recognised in-house R&amp;D centre dedicated to it.
        </p>
        <p>
          Alpha is what comes next: taking the lab work to commercial scale, and
          offering it as a service to the wider steel industry.
        </p>
      </div>

      <div className="mt-7 pt-6 border-t border-line grid grid-cols-2 sm:grid-cols-3 gap-4">
        {snapshot.map((s) => (
          <div key={s.k} className="text-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
              {s.k}
            </div>
            <div className="mt-1.5 font-display text-base sm:text-lg text-ink">
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
