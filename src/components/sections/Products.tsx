"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const products = [
  {
    id: "metal",
    name: "Recovered metal",
    formula: "Fe / Cr / Ni",
    description:
      "Metal extracted from waste — directly re-used fine particles, plus metal recovered from dust and oxides.",
    markets: ["Back into steel-making as raw material", "Sold to secondary metal markets"],
    accent: "#0B3D2E",
    icon: "M",
  },
  {
    id: "gypsum",
    name: "Gypsum",
    formula: "CaSO₄",
    description:
      "A mineral product (calcium sulphate) recovered from the chemical process — patented route from stainless-steel ETP sludge.",
    markets: ["Construction materials", "Industrial mineral applications"],
    accent: "#2D5F3F",
    icon: "Ca",
  },
  {
    id: "sodium",
    name: "Sodium sulphate",
    formula: "Na₂SO₄",
    description:
      "A salt recovered from the process. Alpha is developing it into an organic fertilizer — turning a recovery stream into agricultural value.",
    markets: ["Industrial chemistry", "Organic fertilizer (in development)"],
    accent: "#10B981",
    icon: "Na",
  },
  {
    id: "oxides",
    name: "Metal-oxide powders",
    formula: "Fe₂O₃ · Cr₂O₃ · NiO",
    description:
      "Iron, chromium, and nickel oxides recovered as fine powders. High-value raw materials for downstream industry.",
    markets: ["Pigments & ceramics", "Magnetic & catalytic applications"],
    accent: "#A7D88B",
    icon: "Ox",
  },
  {
    id: "bricks",
    name: "Cement-less bricks",
    formula: "19–20 kg/sq mm",
    description:
      "Made from residual metal dust — with metal waste replacing cement. Patented. Compressive strength markedly higher than conventional fly-ash bricks at ~8.5 kg/sq mm.",
    markets: ["Homes & partition walls", "Parking lots, pre-cast walls, hollow blocks"],
    accent: "#E2A93A",
    icon: "B",
  },
];

export default function Products() {
  const [open, setOpen] = useState<string | null>("metal");

  return (
    <section id="products" className="relative py-32 sm:py-40">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="04" title="The Products" />
        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
              Five output streams.
              <span className="block italic text-forest">All in industrial demand.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Every product has a market. The plant approach is that no stream of incoming
              waste leaves Alpha as a residue — each becomes a saleable output.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16" direction="up">
          <div className="flex flex-col gap-3">
            {products.map((p, i) => {
              const isOpen = open === p.id;
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`group relative w-full text-left rounded-3xl border overflow-hidden transition-colors ${
                    isOpen ? "border-forest bg-surface" : "border-line bg-surface hover:border-industrial"
                  }`}
                  style={{
                    boxShadow: isOpen ? "0 20px 60px -20px rgba(11,61,46,0.25)" : undefined,
                  }}
                >
                  <div className="px-6 sm:px-10 py-7 grid grid-cols-12 items-center gap-4">
                    <div className="col-span-2 sm:col-span-1 font-mono text-xs sm:text-sm text-muted tabular-nums">
                      0{i + 1}
                    </div>
                    <div className="col-span-10 sm:col-span-3">
                      <div
                        className="inline-grid place-items-center w-12 h-12 rounded-2xl font-display text-lg text-bg"
                        style={{ background: p.accent }}
                      >
                        {p.icon}
                      </div>
                    </div>
                    <div className="col-span-7 sm:col-span-5">
                      <div className="font-display text-2xl sm:text-3xl text-ink">{p.name}</div>
                      <div className="font-mono text-xs sm:text-sm text-muted mt-1">{p.formula}</div>
                    </div>
                    <div className="col-span-5 sm:col-span-3 flex items-center justify-end gap-3">
                      <span className="hidden sm:inline text-xs font-mono uppercase tracking-[0.2em] text-muted">
                        {isOpen ? "Close" : "Open"}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-10 h-10 grid place-items-center rounded-full border border-line text-forest"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-10 pb-9 pt-2 grid lg:grid-cols-12 gap-8 items-start">
                          <div className="lg:col-span-7 lg:col-start-5">
                            <p className="text-base sm:text-lg text-graphite leading-relaxed">
                              {p.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                              {p.markets.map((m) => (
                                <span
                                  key={m}
                                  className="inline-flex items-center gap-2 rounded-full bg-sage px-3.5 py-1.5 text-xs sm:text-sm text-industrial"
                                >
                                  <span
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{ background: p.accent }}
                                  />
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-16" direction="up">
          <div className="rounded-3xl bg-sage/50 border border-line px-6 sm:px-10 py-8 grid sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-2">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">
                Tested strength
              </div>
              <h3 className="mt-2 font-display text-xl sm:text-2xl text-forest">
                Cement-less bricks measure ~2.3× stronger than fly-ash bricks
              </h3>
              <p className="mt-2 text-sm text-graphite">
                Approved for use in homes, parking lots and hollow blocks.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-surface border border-line px-3 py-4">
                <div className="font-display text-2xl text-forest tabular-nums">19–20</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted mt-1">Alpha · kg/sq mm</div>
              </div>
              <div className="rounded-xl bg-surface border border-line px-3 py-4">
                <div className="font-display text-2xl text-muted tabular-nums">8.5</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted mt-1">Fly-ash · kg/sq mm</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
