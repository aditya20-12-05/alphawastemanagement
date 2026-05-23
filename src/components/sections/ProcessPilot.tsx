"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const flows = [
  { stream: "Chemical sludge processing", capacity: "≈ 50 tonnes" },
  { stream: "ETP-solution metal recovery", capacity: "≈ 100 tonnes" },
  { stream: "Slag processing", capacity: "≈ 250 tonnes" },
];

export default function ProcessPilot() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel number="§ 03" title="Pilot Proof" />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] tracking-tight"
          >
            Operating today, inside Mangalam.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-base text-graphite leading-relaxed mx-auto max-w-xl"
          >
            The full process is running as a lab-based pilot plant. Approximately 180
            tonnes of waste are recycled every month, with patented processes
            commercialised and further filings under publication.
          </motion.p>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="lg:col-span-7 rounded-3xl border border-line bg-ivory p-8 sm:p-12 text-center">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Pilot scale, recycled per month
              </div>
              <div className="mt-4 font-display text-7xl sm:text-9xl text-forest tabular-nums leading-none">
                <AnimatedCounter to={180} suffix=" tonnes" />
              </div>
              <p className="mt-5 text-sm sm:text-base text-graphite leading-relaxed mx-auto max-w-md">
                Already operating with patented processes. Cement-less brick production
                capacity at ~1.5 lakh, with bricks also contributed to community
                construction projects.
              </p>
            </div>
            <div className="lg:col-span-5 grid gap-3">
              {flows.map((f) => (
                <div key={f.stream} className="rounded-3xl border border-line bg-ivory p-7">
                  <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                    Stream capacity
                  </div>
                  <div className="mt-2 font-display text-2xl text-forest">{f.capacity}</div>
                  <div className="mt-1 text-sm text-graphite">{f.stream}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12" direction="up">
          <div className="rounded-3xl bg-forest text-paper p-10 sm:p-14 relative overflow-hidden text-center">
            <div className="absolute inset-0 grain opacity-30" />
            <div className="relative mx-auto max-w-3xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                Scaling up
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl leading-[1.15]">
                PLI approval received. Standardised commercial machinery replaces
                improvised pilot equipment, improving recovery rates and unit economics.
              </h3>
              <p className="mt-4 text-base text-paper/75 leading-relaxed mx-auto max-w-xl">
                Because waste has low value per tonne, it cannot travel far economically.
                A regional-hub model is core to the business: recycling hubs deployed
                across India&apos;s regions to serve local producers.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
