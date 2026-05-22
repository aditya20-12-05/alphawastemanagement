"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export default function AboutParent() {
  return (
    <section className="relative py-20 sm:py-28 bg-cream border-t border-line overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 02" title="Who's behind it" />

        <div className="mt-6 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.25] text-ink">
              Alpha is the recycling venture of{" "}
              <span className="text-forest">Mangalam Alloys Ltd.</span> — a 38-year stainless-steel
              manufacturer in Ahmedabad.
            </h2>

            <div className="mt-7 space-y-4 text-base text-graphite leading-relaxed max-w-xl">
              <p>
                Mangalam has spent decades figuring out how to handle steel waste responsibly.
                Its in-house research centre is government-recognised (DSIR — third in the
                Indian steel sector, after Tata and Jindal).
              </p>
              <p>
                Alpha is what comes next: taking the lab work to commercial scale, and offering
                it as a service to the wider steel industry.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="left" delay={0.1}>
            <div className="grid grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
              {[
                { k: "Founded", v: "1988" },
                { k: "Location", v: "Ahmedabad, India" },
                { k: "Capacity", v: "40,000 TPA" },
                { k: "Turnover", v: "≈ INR 400 cr" },
                { k: "Employees", v: "700+" },
                { k: "R&D", v: "DSIR · 2016" },
              ].map((s) => (
                <div key={s.k} className="bg-ivory p-5">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                    {s.k}
                  </div>
                  <div className="mt-1 font-display text-base text-ink">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
