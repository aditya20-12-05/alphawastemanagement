"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const credentials = [
  {
    k: "PLI approval",
    v: "Production Linked Incentive — Government of India",
    body: "Approved for commercial scale-up. Triggers the move from pilot scale to standardised commercial machinery and regional-hub deployment.",
  },
  {
    k: "Co-processing permission",
    v: "Hazardous waste co-processing",
    body: "Mangalam holds permission to co-process hazardous waste — a significant and hard-to-replicate operating credential.",
  },
  {
    k: "Brick approval",
    v: "Homes, parking lots, hollow blocks",
    body: "Cement-less bricks approved for use in residential construction, parking lots, hollow blocks and pre-cast walls.",
  },
  {
    k: "Carbon reporting",
    v: "EU CBAM-aligned",
    body: "Carbon-emission reporting maintained in line with the EU Carbon Border Adjustment Mechanism, with emissions performance comparing favourably within the sector.",
  },
];

export default function AboutCredentials() {
  return (
    <section className="relative py-28 sm:py-36 bg-cream border-t border-line overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 04" title="Standing" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Approvals, permissions, and the carbon position.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              The credibility around Alpha extends beyond the patents — a portfolio of
              regulatory approvals, carbon reporting in line with international
              mechanisms, and a clear path from pilot to commercial scale.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-3">
          {credentials.map((c) => (
            <div key={c.k} className="rounded-2xl border border-line bg-ivory p-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                {c.k}
              </div>
              <h3 className="mt-3 font-display text-2xl text-forest leading-tight">{c.v}</h3>
              <p className="mt-3 text-sm text-graphite leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
