"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const milestones = [
  {
    year: "~1995",
    headline: "Naroda — the origin",
    body:
      "Family roots in industrial waste management begin three decades ago via Naroda Environment Project Ltd. — collecting, homogenising, and treating industrial waste; introducing zero water and zero solid discharge at industrial scale.",
    tag: "Generational",
  },
  {
    year: "1988→",
    headline: "Mangalam Alloys Ltd.",
    body:
      "Stainless steel manufacturer in Ahmedabad. Integrated operation: scrap to bright bar. ~40,000 TPA installed capacity, 700+ employees, ~INR 400 crore turnover, on the Delhi–Mumbai DFC corridor.",
    tag: "38 years",
  },
  {
    year: "Award",
    headline: "Naroda transformed",
    body:
      "Once among India's most polluted industrial areas, Naroda is later recognised as one of the greenest industrial estates — the work earning India's Golden Peacock environmental award.",
    tag: "Recognition",
  },
  {
    year: "2016",
    headline: "DSIR-recognised R&D centre",
    body:
      "Mangalam establishes the third DSIR-recognised in-house R&D centre in India's steel sector — after Tata and Jindal. Led by qualified scientists, engineers and technologists working in partnership with customers.",
    tag: "Government-recognised",
  },
  {
    year: "Now",
    headline: "Alpha — recycle, don't contain",
    body:
      "Where the earlier era contained and managed waste, Alpha goes further — recycling it to zero. The R&D centre has completed 45 innovative projects in waste recycling and processes.",
    tag: "Commercial scale-up",
  },
];

export default function MangalamStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section ref={ref} id="story" className="relative py-32 sm:py-40 bg-mist">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="02" title="The Parent" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-8" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
              Three decades of waste thinking,
              <span className="italic text-forest"> compressed into one venture.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              First, contain the waste so it doesn&apos;t pollute. Then, eliminate it by
              recycling to zero. Alpha is the venture that takes that capability to the wider industry.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 relative">
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-line" aria-hidden />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-forest via-emerald to-lime"
            aria-hidden
          />

          <ul className="space-y-16 sm:space-y-24">
            {milestones.map((m, i) => {
              const onRight = i % 2 === 1;
              return (
                <motion.li
                  key={m.headline}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid sm:grid-cols-2 gap-6 sm:gap-12"
                >
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-forest ring-4 ring-mist" />

                  <div className={`pl-12 sm:pl-0 ${onRight ? "sm:order-2 sm:pl-12" : "sm:text-right sm:pr-12"}`}>
                    <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">{m.tag}</div>
                    <div className="mt-1 font-display text-5xl sm:text-6xl text-forest tabular-nums">{m.year}</div>
                  </div>

                  <div className={`pl-12 sm:pl-0 ${onRight ? "sm:order-1 sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">{m.headline}</h3>
                    <p className="mt-3 text-base text-graphite leading-relaxed max-w-md sm:inline-block">{m.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <Reveal className="mt-24" direction="up">
          <div className="rounded-3xl bg-surface border border-line p-8 sm:p-12 grid lg:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">A green operating base</div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl text-forest">
                Zero solid, liquid &amp; air discharge
              </h3>
              <p className="mt-3 text-sm text-graphite leading-relaxed">
                Energy is roughly 30% of operating cost — so Mangalam invests where it matters.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-px bg-line/60 rounded-2xl overflow-hidden border border-line">
              {[
                { k: "4.1 MW", l: "Self-generated electricity (solar + wind)" },
                { k: "100%", l: "Wastewater treated and recycled on-site" },
                { k: "Natural gas", l: "Used instead of furnace oil — lower emissions" },
              ].map((s) => (
                <div key={s.l} className="bg-surface p-6">
                  <div className="font-display text-2xl text-forest">{s.k}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.15em] text-muted leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
