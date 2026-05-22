"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export default function AboutWhatIs() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 01" title="What Alpha is" />

        <div className="mt-6 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.25] text-ink">
              Alpha collects industrial steel waste and recycles it into things other
              industries want to buy — with{" "}
              <span className="text-forest italic">zero residue</span> at the end.
            </h2>

            <div className="mt-7 space-y-4 text-base text-graphite leading-relaxed max-w-xl">
              <p>
                Most industrial steel waste today is dumped. That&apos;s expensive for
                producers, hard to do in monsoon, regulated by pollution-control
                authorities — and it doesn&apos;t make the waste go away.
              </p>
              <p>
                Alpha takes the waste in, runs it through four patented stages, and
                ships saleable output back out. Nothing leaves the site as residue.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="left" delay={0.1}>
            <div className="rounded-3xl border border-line bg-ivory p-6 sm:p-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                In one line
              </div>
              <p className="mt-4 font-display text-xl text-ink leading-snug">
                Whatever comes in as waste leaves as a finished product or usable raw
                material.
              </p>
              <div className="mt-5 pt-5 border-t border-line text-xs text-muted leading-relaxed">
                100% mass balance — including the chromium. The outputs and their
                downstream markets are detailed on the Products page.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
