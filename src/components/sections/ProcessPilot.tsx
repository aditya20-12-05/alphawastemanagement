"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const flows = [
  { stream: "Chemical sludge processing", capacity: "≈ 50 MT" },
  { stream: "ETP-solution metal recovery", capacity: "≈ 100 MT" },
  { stream: "Slag processing", capacity: "≈ 250 MT" },
];

export default function ProcessPilot() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 03" title="Pilot Proof" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Operating today — inside Mangalam.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              The full process is running as a lab-based pilot plant — functional and
              operational. Approximately 180 tonnes of waste are recycled every month,
              with patented processes commercialised and further filings under publication.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="lg:col-span-7 rounded-3xl border border-line bg-ivory p-8 sm:p-12">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Pilot scale — recycled per month
              </div>
              <div className="mt-4 font-display text-7xl sm:text-9xl text-forest tabular-nums leading-none">
                <AnimatedCounter to={180} suffix=" MT" />
              </div>
              <p className="mt-5 text-sm sm:text-base text-graphite leading-relaxed max-w-md">
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
          <div className="rounded-3xl bg-forest text-paper p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-30" />
            <div className="relative grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                  Scaling up
                </div>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-[1.05]">
                  PLI approval received. Standardised commercial machinery replaces improvised pilot equipment — improving recovery rates and unit economics.
                </h3>
                <p className="mt-4 text-base text-paper/75 leading-relaxed max-w-2xl">
                  Because waste has low value per tonne, it cannot travel far economically.
                  A regional-hub model is core to the business — recycling hubs deployed
                  across India&apos;s regions to serve local producers.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
