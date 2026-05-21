"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const milestones = [
  {
    year: "≈ 1995",
    headline: "Naroda — the origin",
    body:
      "Family work on industrial waste handling begins three decades ago through Naroda Environment Project Ltd. (NEPL). Industrial waste is collected, homogenised, and managed at a dedicated site; liquid waste is treated and returned to industry as fresh water. The model introduces the idea of zero water discharge and zero solid discharge at industrial scale.",
  },
  {
    year: "Award",
    headline: "Naroda transformed",
    body:
      "Once among India’s most polluted industrial areas, Naroda is later recognised as one of the greenest industrial estates. The work earns international recognition, including India’s Golden Peacock environmental award.",
  },
  {
    year: "2016",
    headline: "DSIR recognition",
    body:
      "Mangalam establishes the third DSIR-recognised in-house R&D centre in India’s steel sector — after Tata and Jindal. Recognition is awarded by the Department of Scientific & Industrial Research, Ministry of Science & Technology, Government of India.",
  },
  {
    year: "Today",
    headline: "Alpha — recycling, not containment",
    body:
      "The earlier era focused on containing and managing waste. Alpha goes further — recycling the waste rather than dumping it. The R&D centre has completed 45 innovative projects in waste recycling and process development.",
  },
];

export default function AboutResearch() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section ref={ref} className="relative py-28 sm:py-36 bg-cream border-t border-line overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 02" title="The R&D Foundation" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              First, contain the waste. Then, eliminate it.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              The commitment to industrial waste is generational. Alpha is the commercial
              expression of a real, recognised research programme — and the next step in
              a thirty-year body of work.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="rounded-3xl border border-line bg-ivory p-7 sm:p-10 grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                The DSIR-recognised R&amp;D centre
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl text-forest leading-tight">
                Mangalam Research &amp; Development Center
              </h3>
              <p className="mt-3 text-base text-graphite leading-relaxed">
                Recognised in 2016 by the Department of Scientific &amp; Industrial
                Research (DSIR), Ministry of Science &amp; Technology, Government of India.
                Led by qualified scientists, engineers and technologists, working in close
                partnership with customers.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
              <div className="bg-paper p-5">
                <div className="font-display text-3xl text-forest tabular-nums">3rd</div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                  DSIR-recognised R&amp;D · steel sector
                </div>
              </div>
              <div className="bg-paper p-5">
                <div className="font-display text-3xl text-forest tabular-nums">45</div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                  Innovation projects completed
                </div>
              </div>
              <div className="bg-paper p-5">
                <div className="font-display text-3xl text-forest tabular-nums">2016</div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                  Year of recognition
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-24 relative">
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
            The continuity, in four moves
          </div>

          <div className="mt-10 relative">
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-line" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px origin-top bg-forest"
            />

            <ul className="space-y-14 sm:space-y-20">
              {milestones.map((m, i) => {
                const onRight = i % 2 === 1;
                return (
                  <motion.li
                    key={m.headline}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative grid sm:grid-cols-2 gap-6 sm:gap-12"
                  >
                    <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-forest ring-4 ring-cream" />
                    <div className={`pl-12 sm:pl-0 ${onRight ? "sm:order-2 sm:pl-12" : "sm:text-right sm:pr-12"}`}>
                      <div className="font-display text-4xl sm:text-5xl text-forest tabular-nums">
                        {m.year}
                      </div>
                    </div>
                    <div className={`pl-12 sm:pl-0 ${onRight ? "sm:order-1 sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                      <h4 className="font-display text-xl sm:text-2xl text-ink leading-tight">
                        {m.headline}
                      </h4>
                      <p className={`mt-3 text-sm sm:text-base text-graphite leading-relaxed max-w-md ${onRight ? "sm:ml-auto" : ""}`}>
                        {m.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
