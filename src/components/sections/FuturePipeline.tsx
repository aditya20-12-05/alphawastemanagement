"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const pipeline = [
  { area: "Lithium battery recycling", desc: "Recovery of value-added elements from lithium-battery streams." },
  { area: "E-waste recycling", desc: "Recovery of value-added elements from e-waste and their applications." },
  { area: "Organic fertilizer", desc: "Conversion of the sodium-sulphate waste stream into an organic fertilizer." },
  { area: "Metal refinery equipment", desc: "Installation of AOD, Cone Cast, LRF, SAF for special grades." },
  { area: "Powder metallurgy", desc: "Nano/micro powder hybridisation for medical, space and defence applications." },
  { area: "Green steel (H₂)", desc: "Green steel manufacturing using hydrogen gas." },
  { area: "Electroplating sludge", desc: "Extraction of copper and nickel from electroplating sludge." },
  { area: "Secondary slag → ferro-alloys", desc: "Development of ferro-alloys from secondary slag, and paints from waste." },
  { area: "Skill-development institute", desc: "A national skill-development institute for waste recycling." },
];

export default function FuturePipeline() {
  return (
    <section className="relative py-28 sm:py-36 bg-cream border-t border-line overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 03" title="The Pipeline" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Nine in-flight projects, beyond steel waste.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              The R&amp;D pipeline extends well beyond steel waste — lithium batteries,
              e-waste, hydrogen-based green steel, electroplating sludge, and a national
              skill-development institute for waste recycling.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pipeline.map((p, i) => (
            <motion.div
              key={p.area}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group rounded-2xl border border-line bg-ivory p-6 hover:border-forest transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-sage tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-display text-lg text-ink leading-tight">{p.area}</div>
                  <div className="text-xs text-graphite leading-snug mt-2">{p.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
