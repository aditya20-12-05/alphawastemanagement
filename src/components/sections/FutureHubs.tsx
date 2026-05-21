"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const hubs = [
  { name: "Ahmedabad", note: "HQ · pilot plant", cx: 38, cy: 52, primary: true },
  { name: "Mumbai", note: "DFC corridor", cx: 32, cy: 60 },
  { name: "Delhi NCR", note: "DFC corridor", cx: 48, cy: 28 },
  { name: "Chennai", note: "Southern hub", cx: 58, cy: 82 },
  { name: "Kolkata", note: "Eastern hub", cx: 80, cy: 50 },
  { name: "Bengaluru", note: "Southern hub", cx: 52, cy: 78 },
  { name: "Visakhapatnam", note: "Eastern hub", cx: 68, cy: 68 },
];

export default function FutureHubs() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredHub = hubs.find((h) => h.name === hovered);

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 02" title="The Hubs" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Recycling hubs deployed regionally — close to where the waste is generated.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Because industrial waste has a low value per tonne, it cannot travel far
              economically. A regional-hub model is core to the business — each hub
              serves the steel producers within its surrounding catchment.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="lg:col-span-7 rounded-3xl border border-line bg-ivory p-6 sm:p-8 relative overflow-hidden">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Planned hub geography
              </div>
              <h3 className="mt-2 font-display text-2xl text-forest">
                Built around producing regions
              </h3>

              <div className="relative mt-6 aspect-[10/12] w-full">
                <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="indiaFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#EFEAD8" />
                      <stop offset="100%" stopColor="#D5CFBC" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 42 6 L 60 8 L 70 18 L 82 28 L 88 42 L 86 56 L 80 64 L 72 72 L 64 84 L 58 96 L 52 102 L 46 96 L 42 88 L 36 80 L 30 72 L 26 62 L 22 52 L 22 40 L 26 30 L 32 22 L 38 14 Z"
                    fill="url(#indiaFill)"
                    stroke="#0E2F23"
                    strokeWidth="0.4"
                  />

                  {hubs.map((h) => {
                    const isHover = hovered === h.name;
                    return (
                      <g
                        key={h.name}
                        onMouseEnter={() => setHovered(h.name)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <circle
                          cx={h.cx}
                          cy={h.cy}
                          r={h.primary ? 4.4 : 3.2}
                          fill={h.primary ? "#0E2F23" : "#4A7C4E"}
                          opacity={isHover ? 0.28 : 0.18}
                        >
                          <animate
                            attributeName="r"
                            values={`${h.primary ? 4.4 : 3.2};${h.primary ? 7.2 : 5.6};${h.primary ? 4.4 : 3.2}`}
                            dur="2.6s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          cx={h.cx}
                          cy={h.cy}
                          r={h.primary ? 1.7 : 1.3}
                          fill={h.primary ? "#0E2F23" : "#4A7C4E"}
                          stroke="#F5F1E8"
                          strokeWidth="0.4"
                          className="cursor-pointer"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-2 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-forest" /> HQ
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-sage" /> Planned hub
                </span>
                <span className="ml-auto text-[9px]">Illustrative — not to geographic scale</span>
              </div>
            </div>

            <div className="lg:col-span-5 grid gap-2">
              {hubs.map((h) => (
                <button
                  key={h.name}
                  onMouseEnter={() => setHovered(h.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`text-left rounded-2xl border px-5 py-4 transition-colors ${
                    hovered === h.name
                      ? "border-forest bg-cream"
                      : "border-line bg-ivory"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-display text-lg text-ink">{h.name}</div>
                      <div className="text-xs text-muted">{h.note}</div>
                    </div>
                    {h.primary && (
                      <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-forest bg-paper border border-line rounded-full px-2 py-0.5">
                        HQ
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
