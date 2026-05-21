"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export default function PartnerOffer() {
  return (
    <section className="relative py-28 sm:py-36 bg-cream border-t border-line overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 02" title="What Alpha Offers" />

        <Reveal className="mt-10" direction="up">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-forest text-paper p-10 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-30" />
              <div className="relative">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                  Operational relief
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl leading-tight">
                  A reliable, year-round, regulation-ready answer to the waste problem.
                </h3>
                <p className="mt-4 text-sm text-paper/80 leading-relaxed">
                  Replaces a recurring cost and disruption. Removes weather and seasonal
                  unavailability. Removes continuous regulatory exposure to pollution-control
                  authorities.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-line bg-ivory p-10 sm:p-12">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Reputation asset
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink leading-tight">
                A visible environmental contribution that a partner can showcase.
              </h3>
              <p className="mt-4 text-sm text-graphite leading-relaxed">
                Verifiable zero-residue recycling — defensible at home and internationally
                under carbon-border mechanisms such as the EU CBAM.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
