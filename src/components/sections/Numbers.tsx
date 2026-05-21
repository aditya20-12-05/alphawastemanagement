"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

export default function Numbers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      id="numbers"
      className="relative py-32 sm:py-40 bg-forest text-bg overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

      <motion.div
        style={{ x: x1 }}
        className="absolute top-10 -left-6 whitespace-nowrap font-display text-[14vw] leading-none text-bg/[0.04] select-none pointer-events-none"
      >
        ZERO RESIDUE · ZERO RESIDUE ·
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="absolute bottom-10 -right-6 whitespace-nowrap font-display text-[14vw] leading-none text-bg/[0.04] select-none pointer-events-none"
      >
        MASS BALANCE · MASS BALANCE ·
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="07" title="The Market" className="text-lime [&_span]:text-lime/60" />
        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1.05] tracking-tight">
              A large and growing
              <span className="block italic text-lime">problem-space.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base sm:text-lg text-bg/75 leading-relaxed">
              Waste norms tightening worldwide. Carbon mechanisms putting growing value on
              low-carbon processing. Natural aggregate deposits depleting. Proven
              zero-residue solutions remain rare.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-12 gap-4">
          <Reveal className="md:col-span-7" direction="up">
            <div className="rounded-3xl glass-dark p-8 sm:p-12 h-full">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/70">
                Global steel slag (annual)
              </div>
              <div className="mt-4 font-display text-7xl sm:text-9xl text-bg tabular-nums leading-none">
                <AnimatedCounter to={1884} suffix=" Mta" />
              </div>
              <p className="mt-6 text-sm sm:text-base text-bg/70 leading-relaxed max-w-md">
                Globally, around <span className="text-lime">25 Mta</span> of slag is
                traded across borders. Steelworks waste is increasingly used as a substitute
                for gravel and grit in concrete as natural deposits deplete.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-5 grid gap-4">
            <Reveal direction="up" delay={0.1}>
              <div className="rounded-3xl glass-dark p-7">
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/70">
                  India · 2024
                </div>
                <div className="mt-3 font-display text-5xl text-bg tabular-nums">
                  <AnimatedCounter to={149} suffix=" Mta" />
                </div>
                <div className="mt-2 text-sm text-bg/70">slag generation</div>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <div className="rounded-3xl glass-dark p-7">
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/70">
                  Gujarat · 2024
                </div>
                <div className="mt-3 font-display text-5xl text-bg tabular-nums">
                  <AnimatedCounter to={1.3} decimals={1} suffix=" Mta" />
                </div>
                <div className="mt-2 text-sm text-bg/70">slag &middot; 0.7 Mta sludge</div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-4" direction="up">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-3xl glass-dark p-7">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/70">
                Phase 1 capacity
              </div>
              <div className="mt-3 font-display text-4xl text-bg tabular-nums">
                <AnimatedCounter to={2000} suffix=" MT" />
              </div>
              <p className="mt-2 text-sm text-bg/70">
                The scaled project&apos;s first-phase recycling capacity — expected to grow in multiples.
              </p>
            </div>
            <div className="rounded-3xl glass-dark p-7">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/70">
                Pilot today
              </div>
              <div className="mt-3 font-display text-4xl text-bg tabular-nums">
                <AnimatedCounter to={180} suffix=" MT/mo" />
              </div>
              <p className="mt-2 text-sm text-bg/70">
                Already operating inside Mangalam — patented processes, lab-scale plant.
              </p>
            </div>
            <div className="rounded-3xl glass-dark p-7">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/70">
                Bricks produced
              </div>
              <div className="mt-3 font-display text-4xl text-bg tabular-nums">
                <AnimatedCounter to={1.5} decimals={1} suffix=" lakh" />
              </div>
              <p className="mt-2 text-sm text-bg/70">
                Cement-less bricks — including contributions to community construction projects.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
