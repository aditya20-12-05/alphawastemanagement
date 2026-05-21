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
      "Metal extracted from waste — directly re-used fine particles, plus metal recovered from dust and oxides through dedicated separation routes.",
    markets: [
      "Back into steel-making as raw material feed",
      "Secondary metal markets",
    ],
    swatch: "#0E2F23",
    icon: "M",
    iconText: "#F5F1E8",
  },
  {
    id: "gypsum",
    name: "Gypsum",
    formula: "CaSO₄",
    description:
      "A mineral product (calcium sulphate) recovered from the chemical process — patented route from stainless-steel ETP neutralised sludge.",
    markets: ["Construction materials", "Industrial mineral applications"],
    swatch: "#2F4E3E",
    icon: "Ca",
    iconText: "#F5F1E8",
  },
  {
    id: "sodium",
    name: "Sodium sulphate",
    formula: "Na₂SO₄",
    description:
      "A salt recovered from the process. Alpha is developing it into an organic fertilizer — converting a recovery stream into agricultural value.",
    markets: ["Industrial chemistry", "Organic fertilizer · in development"],
    swatch: "#4A7C4E",
    icon: "Na",
    iconText: "#F5F1E8",
  },
  {
    id: "oxides",
    name: "Metal-oxide powders",
    formula: "Fe₂O₃ · Cr₂O₃ · NiO",
    description:
      "Iron, chromium and nickel oxides recovered as fine powders. High-value raw materials for pigment, ceramic, magnetic and catalytic applications.",
    markets: ["Pigments & ceramics", "Magnetic & catalytic applications"],
    swatch: "#6B8E5A",
    icon: "Ox",
    iconText: "#0E2F23",
  },
  {
    id: "bricks",
    name: "Cement-less bricks",
    formula: "Compressive strength 19–20 kg/sq mm",
    description:
      "Made from residual metal dust — with metal waste replacing cement. Patented. Compressive strength markedly higher than conventional fly-ash bricks at ~8.5 kg/sq mm.",
    markets: ["Homes & partition walls", "Parking lots, pre-cast walls, hollow blocks"],
    swatch: "#8B4A2A",
    icon: "B",
    iconText: "#F5F1E8",
  },
];

export default function ProductsList() {
  const [open, setOpen] = useState<string | null>("metal");

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 01" title="The Five Streams" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7" direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              Operational flow — three saleable streams from a single waste input.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Sludge is collected, de-moisturised, stored and processed. It then splits
              into three streams: metal-oxide powders, gypsum and sodium sulphate are
              sold to market; recovered metal waste is mixed, transformed into feed for
              melting, and refined or sold; slag is transferred to brick manufacturing.
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
                    isOpen ? "border-forest bg-ivory" : "border-line bg-ivory hover:border-moss"
                  }`}
                  style={isOpen ? { boxShadow: "0 20px 60px -20px rgba(14,47,35,0.18)" } : undefined}
                >
                  <div className="px-6 sm:px-10 py-7 grid grid-cols-12 items-center gap-4">
                    <div className="col-span-2 sm:col-span-1 font-mono text-xs sm:text-sm text-muted tabular-nums">
                      0{i + 1}
                    </div>
                    <div className="col-span-10 sm:col-span-2">
                      <div
                        className="inline-grid place-items-center w-12 h-12 rounded-2xl font-display text-lg"
                        style={{ background: p.swatch, color: p.iconText }}
                      >
                        {p.icon}
                      </div>
                    </div>
                    <div className="col-span-7 sm:col-span-6">
                      <div className="font-display text-2xl sm:text-3xl text-ink">{p.name}</div>
                      <div className="font-mono text-xs sm:text-sm text-muted mt-1">{p.formula}</div>
                    </div>
                    <div className="col-span-5 sm:col-span-3 flex items-center justify-end gap-3">
                      <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                        {isOpen ? "Close" : "Read"}
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
                          <div className="lg:col-span-8 lg:col-start-4">
                            <p className="text-base sm:text-lg text-graphite leading-relaxed">
                              {p.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                              {p.markets.map((m) => (
                                <span
                                  key={m}
                                  className="inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-1.5 text-xs sm:text-sm text-forest"
                                >
                                  <span
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{ background: p.swatch }}
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
      </div>
    </section>
  );
}
