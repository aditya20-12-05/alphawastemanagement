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
          <SectionLabel number="§ 03" title="Pilot Proof" prominent />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base sm:text-[17px] text-graphite leading-relaxed mx-auto max-w-xl"
          >
            Operating today, inside Mangalam Alloys Ltd. (MAL).
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-base text-graphite leading-relaxed mx-auto max-w-xl"
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

        {/* Road ahead — two new R&D streams */}
        <Reveal className="mt-12" direction="up">
          <div className="rounded-3xl bg-forest text-paper p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-30" />
            <div className="relative">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                What&apos;s next
              </div>
              <h3 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.05]">
                Research &amp; <span className="text-fern italic">Development</span>.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-paper/70 leading-relaxed max-w-2xl">
                Two new streams under active development, both with national
                strategic value.
              </p>
              <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-9">
                {[
                  {
                    title: "Lithium-battery recovery",
                    body: "Recovering lithium, cobalt and nickel from spent batteries, over 95% material recovery, cutting India's reliance on imported critical minerals.",
                  },
                  {
                    title: "Potash fertilizer",
                    body: "Converting the recovered gypsum stream into Sulphate of Potash, a chloride-free fertilizer, against India's near-total potash import dependence.",
                  },
                ].map((s) => (
                  <div key={s.title} className="flex gap-4">
                    <span className="shrink-0 mt-1.5 w-5 h-5 rounded-full border-2 border-fern grid place-items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-fern" />
                    </span>
                    <div>
                      <h4 className="font-display text-2xl text-paper leading-tight">
                        {s.title}
                      </h4>
                      <p className="mt-3 text-base text-paper/80 leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Scaling up — PLI approval */}
        <Reveal className="mt-6" direction="up">
          <div className="rounded-3xl bg-forest text-paper p-10 sm:p-14 relative overflow-hidden text-center">
            <div className="absolute inset-0 grain opacity-30" />
            <div className="relative mx-auto max-w-2xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                Government approval
              </div>
              <h3 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.05]">
                We are now <span className="text-fern italic">PLI approved</span>.
              </h3>
              <p className="mt-5 text-base sm:text-lg text-paper/80 leading-relaxed">
                The Government of India&apos;s Production Linked Incentive scheme
                underwrites Alpha&apos;s commercial scale-up. The patented
                chemistry runs at full throughput, the first regional hub is in
                place, and the rest follow demand.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
