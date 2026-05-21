"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const pipeline = [
  { area: "Lithium battery recycling", desc: "Recovery of value-added elements from lithium-battery streams." },
  { area: "E-waste recycling", desc: "Recovery of value-added elements from e-waste and their applications." },
  { area: "Organic fertilizer", desc: "Conversion of the sodium-sulphate waste stream into an organic fertilizer." },
  { area: "Metal refinery equipment", desc: "Installation of AOD, Cone Cast, LRF, SAF for special grades." },
  { area: "Powder metallurgy", desc: "Nano/micro powder hybridisation for medical, space and defence applications." },
  { area: "Green steel (H₂)", desc: "Green steel manufacturing using hydrogen gas." },
  { area: "Electroplating sludge", desc: "Extraction of copper and nickel from electroplating sludge." },
  { area: "Secondary slag → ferro-alloys", desc: "Development of ferro-alloys from secondary slag, and paints from waste." },
  { area: "Skill-development institute", desc: "A national skill-development institute for waste recycling." },
];

const hubs = [
  { name: "Ahmedabad", note: "HQ · pilot plant", cx: 38, cy: 52, primary: true },
  { name: "Mumbai", note: "DFC corridor", cx: 32, cy: 60 },
  { name: "Delhi NCR", note: "DFC corridor", cx: 48, cy: 28 },
  { name: "Chennai", note: "Southern hub", cx: 58, cy: 82 },
  { name: "Kolkata", note: "Eastern hub", cx: 80, cy: 50 },
  { name: "Bengaluru", note: "Southern hub", cx: 52, cy: 78 },
  { name: "Visakhapatnam", note: "Eastern hub", cx: 68, cy: 68 },
];

export default function Future() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="future" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="08" title="Where We're Going" />
        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
              Built as a platform.
              <span className="block italic text-forest">Not a single product.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              The R&amp;D pipeline extends well beyond steel waste — lithium batteries, e-waste,
              green steel, and a national skill institute for waste recycling.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-6" direction="up">
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">
                Regional hub plan
              </div>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl text-forest">
                Recycling hubs across India
              </h3>
              <p className="mt-2 text-sm text-graphite max-w-md">
                Waste has low value per tonne — so it cannot travel far economically.
                A regional-hub model is core to the business.
              </p>

              <div className="relative mt-6 aspect-[10/12] w-full">
                <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="indiaFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E8EDE6" />
                      <stop offset="100%" stopColor="#D8DED4" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 42 6 L 60 8 L 70 18 L 82 28 L 88 42 L 86 56 L 80 64 L 72 72 L 64 84 L 58 96 L 52 102 L 46 96 L 42 88 L 36 80 L 30 72 L 26 62 L 22 52 L 22 40 L 26 30 L 32 22 L 38 14 Z"
                    fill="url(#indiaFill)"
                    stroke="#0B3D2E"
                    strokeWidth="0.4"
                    strokeDasharray="0.5 1"
                  />

                  {hubs.map((h) => {
                    const isHover = hovered === h.name;
                    return (
                      <g key={h.name} onMouseEnter={() => setHovered(h.name)} onMouseLeave={() => setHovered(null)}>
                        <circle
                          cx={h.cx}
                          cy={h.cy}
                          r={h.primary ? 4 : 3}
                          fill={h.primary ? "#0B3D2E" : "#10B981"}
                          opacity={isHover ? 0.25 : 0.18}
                        >
                          <animate
                            attributeName="r"
                            values={`${h.primary ? 4 : 3};${h.primary ? 7 : 5.5};${h.primary ? 4 : 3}`}
                            dur="2.4s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          cx={h.cx}
                          cy={h.cy}
                          r={h.primary ? 1.6 : 1.2}
                          fill={h.primary ? "#0B3D2E" : "#10B981"}
                          stroke="#FAFAF7"
                          strokeWidth="0.4"
                          className="cursor-pointer"
                        />
                        {isHover && (
                          <g>
                            <rect
                              x={h.cx + 2.5}
                              y={h.cy - 5}
                              width={h.name.length * 1.8 + 4}
                              height={4}
                              rx={1}
                              fill="#0B3D2E"
                            />
                            <text
                              x={h.cx + 4.5}
                              y={h.cy - 2}
                              fontSize="2.2"
                              fill="#FAFAF7"
                              fontFamily="ui-sans-serif"
                            >
                              {h.name}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-2 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.15em] text-muted">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-forest" />
                  HQ
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald" />
                  Planned hub
                </span>
                <span className="ml-auto text-[10px]">Illustrative — not to scale</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" direction="up" delay={0.1}>
            <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">
              R&amp;D pipeline
            </div>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl text-ink">
              Nine in-flight projects, beyond steel waste.
            </h3>

            <ul className="mt-7 grid sm:grid-cols-2 gap-2.5">
              {pipeline.map((p, i) => (
                <motion.li
                  key={p.area}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="group relative rounded-2xl border border-line bg-surface p-4 hover:border-forest transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-display text-base text-ink">{p.area}</div>
                      <div className="text-xs text-muted leading-snug mt-1">{p.desc}</div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-16" direction="up">
          <div className="rounded-3xl bg-gradient-to-br from-forest to-industrial text-bg p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-[0.07]" />
            <div className="relative grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/80">
                  Macro tailwinds
                </div>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-[1.05]">
                  Waste norms tightening. CBAM rewarding low-carbon production. Aggregates depleting.
                  <span className="text-lime"> Proven zero-residue recycling remains rare.</span>
                </h3>
              </div>
              <div className="lg:col-span-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-lime text-forest px-6 py-3.5 font-medium group"
                >
                  Position with us
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
