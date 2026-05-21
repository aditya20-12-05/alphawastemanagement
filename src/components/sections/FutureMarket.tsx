"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export default function FutureMarket() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative py-28 sm:py-36 bg-forest text-paper overflow-hidden"
    >
      <div className="absolute inset-0 grain opacity-40" />

      <motion.div
        style={{ x: x1 }}
        className="absolute top-10 -left-6 whitespace-nowrap font-display text-[14vw] leading-none text-paper/[0.035] select-none pointer-events-none"
      >
        ZERO RESIDUE · ZERO RESIDUE ·
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 01" title="The Market" variant="dark" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              A large, growing, and largely unmet problem-space.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-paper/75 leading-relaxed">
              Globally, around 25 Mta of slag is traded across borders. Steelworks waste
              is increasingly substituted for gravel and grit in concrete as natural
              deposits deplete.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-12 gap-3">
          <Reveal className="md:col-span-7" direction="up">
            <div className="rounded-3xl glass-forest p-8 sm:p-12 h-full">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                Global steel slag · annual
              </div>
              <div className="mt-4 font-display text-7xl sm:text-9xl text-paper tabular-nums leading-none">
                <AnimatedCounter to={1884} suffix=" Mta" />
              </div>
              <p className="mt-6 text-sm sm:text-base text-paper/75 leading-relaxed max-w-md">
                Generated worldwide each year. Of this, around <span className="text-fern">25 Mta</span> is traded
                across borders — the rest is largely managed by producers themselves.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-5 grid gap-3">
            <Reveal direction="up" delay={0.1}>
              <div className="rounded-3xl glass-forest p-7">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                  India · 2024
                </div>
                <div className="mt-3 font-display text-5xl text-paper tabular-nums">
                  <AnimatedCounter to={149} suffix=" Mta" />
                </div>
                <div className="mt-2 text-sm text-paper/70">slag · ≈ 4 Mta sludge</div>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.18}>
              <div className="rounded-3xl glass-forest p-7">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                  Gujarat · 2024
                </div>
                <div className="mt-3 font-display text-5xl text-paper tabular-nums">
                  <AnimatedCounter to={1.3} decimals={1} suffix=" Mta" />
                </div>
                <div className="mt-2 text-sm text-paper/70">slag · 0.7 Mta sludge</div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-3" direction="up">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="rounded-3xl glass-forest p-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                Phase 1 capacity
              </div>
              <div className="mt-3 font-display text-4xl text-paper tabular-nums">
                <AnimatedCounter to={2000} suffix=" MT" />
              </div>
              <p className="mt-2 text-sm text-paper/70">
                Scaled project&apos;s first-phase recycling capacity — expected to grow in multiples.
              </p>
            </div>
            <div className="rounded-3xl glass-forest p-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                Pilot today
              </div>
              <div className="mt-3 font-display text-4xl text-paper tabular-nums">
                <AnimatedCounter to={180} suffix=" MT/mo" />
              </div>
              <p className="mt-2 text-sm text-paper/70">
                Operating inside Mangalam with patented processes.
              </p>
            </div>
            <div className="rounded-3xl glass-forest p-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80">
                Bricks produced
              </div>
              <div className="mt-3 font-display text-4xl text-paper tabular-nums">
                <AnimatedCounter to={1.5} decimals={1} suffix=" lakh" />
              </div>
              <p className="mt-2 text-sm text-paper/70">
                Cement-less bricks to date, including community construction.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
