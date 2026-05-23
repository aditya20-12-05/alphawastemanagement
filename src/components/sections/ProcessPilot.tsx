"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const flows = [
  { stream: "Chemical sludge processing", capacity: "≈ 50 tonnes" },
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
                From pilot to production
              </div>
              <h3 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.05]">
                The pilot has run. The first hub is{" "}
                <span className="text-fern italic">approved</span>.
              </h3>
              <div className="mt-6 mx-auto max-w-2xl space-y-4 text-base sm:text-lg text-paper/80 leading-relaxed">
                <p>
                  PLI approval is in hand from the Government of India. Hand-built
                  pilot rigs give way to standardised commercial machinery: recovery
                  rates climb, unit economics tighten, and the same patented chemistry
                  runs at commercial throughput.
                </p>
                <p>
                  Because steel waste has a low value per tonne, it cannot travel far
                  without losing its economics. So we don&apos;t build one giant plant.
                  We deploy regional hubs, close to where producers actually generate
                  the waste. The first is approved. The rest follow demand.
                </p>
              </div>

              <div className="mt-9 inline-grid grid-cols-3 gap-px bg-fern/20 rounded-full overflow-hidden">
                {[
                  { k: "PLI", v: "Approved" },
                  { k: "Patents", v: "7 + 3 in dev" },
                  { k: "Model", v: "Regional hubs" },
                ].map((m) => (
                  <div key={m.k} className="bg-forest px-5 py-3 text-center">
                    <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-fern/80">
                      {m.k}
                    </div>
                    <div className="mt-1 font-display text-base text-paper">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
