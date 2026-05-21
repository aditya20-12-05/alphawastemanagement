"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

const stages = [
  {
    stage: "Melting",
    waste: "~6%",
    nature: "Non-hazardous",
    note: "Metal reacts with oxygen and becomes oxide — a measurable yield loss.",
  },
  {
    stage: "Rolling",
    waste: "~2%",
    nature: "Non-hazardous",
    note: "Generated as metal is heated and rolled into shape.",
  },
  {
    stage: "Finishing",
    waste: "~3%",
    nature: "Hazardous",
    note: "The bulk of the hazardous fraction is generated here.",
  },
];

const burdens = [
  {
    title: "Direct cost",
    detail: "Per-kilogram dumping charge, plus transport and government fees.",
  },
  {
    title: "Weather dependency",
    detail: "Dumping sites can be effectively unavailable in the rainy season.",
  },
  {
    title: "Regulatory exposure",
    detail: "Producers face continuous scrutiny from pollution control authorities.",
  },
  {
    title: "Resolves nothing",
    detail: "The waste still exists — liability and environmental cost simply move location.",
  },
];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      id="problem"
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(226,169,58,0.18)_0%,transparent_70%)] -z-10"
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="01" title="The Problem" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
              Steel-making generates the most{" "}
              <span className="italic text-forest">difficult</span> waste in the
              industry.
            </h2>
            <p className="mt-6 text-lg text-graphite max-w-xl leading-relaxed">
              Stainless steel contains <span className="text-forest font-semibold">chromium</span> —
              which can occur as hexavalent chromium, harmful to people and damaging to soil and agriculture.
              Dumping it is costly, weather-dependent, regulated, and resolves nothing.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <div className="relative rounded-3xl border border-line bg-surface p-7 shadow-deep">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
                Global slag generation
              </div>
              <div className="mt-3 font-display text-6xl text-forest tabular-nums">
                <AnimatedCounter to={1884} suffix=" Mta" />
              </div>
              <div className="mt-1 text-sm text-muted">million tonnes per annum, globally</div>

              <div className="mt-7 divider-line" />

              <div className="mt-6 grid grid-cols-2 gap-5">
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted">India</div>
                  <div className="mt-1.5 font-display text-3xl text-industrial tabular-nums">
                    <AnimatedCounter to={149} suffix=" Mta" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted">Gujarat</div>
                  <div className="mt-1.5 font-display text-3xl text-industrial tabular-nums">
                    <AnimatedCounter to={1.3} decimals={1} suffix=" Mta" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24" direction="up">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
            Waste generated at every production stage
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {stages.map((s, i) => (
              <motion.div
                key={s.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl border p-7 ${
                  s.nature === "Hazardous"
                    ? "border-amber/50 bg-gradient-to-br from-amber/10 to-transparent"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="font-display text-2xl text-ink">{s.stage}</div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full ${
                      s.nature === "Hazardous"
                        ? "bg-amber/20 text-amber"
                        : "bg-sage text-industrial"
                    }`}
                  >
                    {s.nature}
                  </span>
                </div>
                <div className="mt-6 font-display text-5xl tabular-nums">
                  <span className={s.nature === "Hazardous" ? "text-amber" : "text-forest"}>
                    {s.waste}
                  </span>
                </div>
                <div className="text-xs text-muted uppercase tracking-[0.15em] mt-1 mb-5">
                  of total throughput
                </div>
                <p className="text-sm text-graphite leading-relaxed">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-24" direction="up">
          <div className="rounded-3xl bg-forest text-bg p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-[0.07]" />
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(167,216,139,0.2)_0%,transparent_70%)]" />

            <div className="relative grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-6">
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-lime/80">
                  Why dumping fails
                </div>
                <h3 className="mt-4 font-display text-3xl sm:text-5xl leading-[1.05]">
                  For a producer, dumping is not a solution.
                  <span className="block italic text-lime">It&apos;s a recurring burden.</span>
                </h3>
              </div>
              <div className="lg:col-span-6 grid sm:grid-cols-2 gap-x-8 gap-y-7">
                {burdens.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                  >
                    <div className="flex items-center gap-2 text-lime">
                      <span className="h-px w-6 bg-lime/60" />
                      <span className="text-xs font-mono uppercase tracking-[0.2em]">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl">{b.title}</div>
                    <p className="mt-1 text-sm text-bg/70 leading-relaxed">{b.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
