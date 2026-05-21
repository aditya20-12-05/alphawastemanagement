"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const tailwinds = [
  {
    k: "Tightening norms",
    body: "Waste-management norms and environmental obligations on industry are tightening worldwide.",
  },
  {
    k: "Carbon mechanisms",
    body: "Carbon border mechanisms such as the EU's CBAM place a growing value on low-carbon processing.",
  },
  {
    k: "Aggregate depletion",
    body: "Natural aggregate deposits are depleting, increasing industrial demand for recycled steelworks materials.",
  },
  {
    k: "Solution scarcity",
    body: "Awareness of industrial waste and carbon is rising, while proven zero-residue recycling solutions remain rare.",
  },
];

export default function FutureMacro() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 04" title="Macro Context" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              The context is favourable, and the proven solutions are rare.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Alpha operates against several long-term tailwinds. The combination —
              tightening regulation, carbon pricing, aggregate depletion, and a shortage
              of proven zero-residue processing — defines the opportunity.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-3">
          {tailwinds.map((t) => (
            <div key={t.k} className="rounded-2xl border border-line bg-ivory p-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                {t.k}
              </div>
              <p className="mt-3 text-base text-ink leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
