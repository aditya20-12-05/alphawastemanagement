"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const products = [
  {
    id: "metal",
    streamTag: "S05",
    name: "Recovered metal",
    formula: "Mix of alloys",
    symbol: "Fe",
    description:
      "Metal recovered from dust and oxides through dedicated separation routes.",
    markets: ["Steel-making feed", "Secondary metal markets"],
    properties: [
      { k: "Form", v: "Solid" },
      { k: "Route", v: "Segregation → Recovery" },
    ],
    accent: "#0E2F23",
    fg: "#F5F1E8",
    pattern: "lines",
  },
  {
    id: "gypsum",
    streamTag: "S06",
    name: "Gypsum",
    formula: "CaSO₄",
    symbol: "Ca",
    description:
      "A mineral product recovered from the chemical process.",
    markets: ["Construction materials", "Industrial mineral applications"],
    properties: [
      { k: "Route", v: "Hydrometallurgy" },
      { k: "Form", v: "Crystalline" },
    ],
    accent: "#1F3A2E",
    fg: "#F5F1E8",
    pattern: "crystals",
  },
  {
    id: "sodium",
    streamTag: "S07",
    name: "Sodium sulphate",
    formula: "Na₂SO₄",
    symbol: "Na",
    description:
      "A salt recovered from the process. Alpha is developing it into an organic fertilizer, converting a recovery stream into agricultural value.",
    markets: ["Detergent industry", "Glass industry", "Textile industry"],
    properties: [
      { k: "Route", v: "Hydrometallurgy" },
      { k: "Form", v: "Crystalline salt" },
    ],
    accent: "#2F4E3E",
    fg: "#F5F1E8",
    pattern: "diamonds",
  },
  {
    id: "oxides",
    streamTag: "S08",
    name: "Metal-oxide powders",
    formula: "Fe₂O₃ · Cr₂O₃ · NiO",
    symbol: "Ox",
    description:
      "Iron, chromium and nickel oxides recovered as fine powders. High-value raw materials for pigment, ceramic, and chemical-manufacturing applications.",
    markets: ["Pigments & ceramics", "Chemical manufacturing"],
    properties: [
      { k: "Route", v: "Hydrometallurgy" },
      { k: "Form", v: "Fine powders" },
    ],
    accent: "#4A7C4E",
    fg: "#0E2F23",
    pattern: "hex",
  },
  {
    id: "bricks",
    streamTag: "S09",
    name: "Cement-less bricks",
    formula: "Cement-less bricks",
    symbol: "B",
    description:
      "Made from residual metal dust, with metal waste replacing cement. Patented. Compressive strength markedly higher than conventional fly-ash bricks at ~8.5 kg/sq mm.",
    markets: ["Homes & partition walls", "Parking lots & pre-cast walls", "Green buildings"],
    properties: [
      { k: "Form", v: "Hollow blocks or paver blocks" },
      { k: "Route", v: "Brick manufacturing machines" },
    ],
    accent: "#6B8E5A",
    fg: "#0E2F23",
    pattern: "bricks",
  },
];

export default function ProductsShowcase() {
  // Nothing selected initially — datasheet shows a placeholder until the
  // visitor picks a specimen.
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : products[active];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel number="§ 01" title="The Five Streams" />
          <Reveal direction="up">
            <h2 className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.2] text-ink">
              Five output streams.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="mt-4 text-base text-graphite leading-relaxed mx-auto max-w-xl">
              Each card below represents one output of the process. Tap or click to see
              its full datasheet: what it is, the route that produces it, and where it goes.
            </p>
          </Reveal>
        </div>

        {/* Specimen rail */}
        <Reveal className="mt-12 sm:mt-14" direction="up">
          <div
            className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-5"
            style={{ perspective: "1400px" }}
          >
            {products.map((p, i) => (
              <SpecimenCard
                key={p.id}
                product={p}
                index={i}
                isActive={i === active}
                anySelected={active !== null}
                onClick={() => setActive(active === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>

        {/* Datasheet panel */}
        <Reveal className="mt-8" direction="up">
          {current === null || active === null ? (
            <EmptyDatasheet />
          ) : (
            <DatasheetPanel product={current} index={active} />
          )}
        </Reveal>
      </div>
    </section>
  );
}

function SpecimenCard({
  product,
  index,
  isActive,
  anySelected,
  onClick,
}: {
  product: (typeof products)[number];
  index: number;
  isActive: boolean;
  anySelected: boolean;
  onClick: () => void;
}) {
  // Lift / scale based on selection state. The continuous Y bob is on an
  // inner wrapper so it doesn't fight with these state transitions.
  const targetY = isActive ? -14 : 0;
  const targetScale = isActive ? 1.04 : anySelected ? 0.96 : 1;
  const targetOpacity = anySelected && !isActive ? 0.62 : 1;

  // A drop shadow that strengthens with elevation gives the floating feel.
  const shadow = isActive
    ? "0 36px 60px -22px rgba(14,47,35,0.45), 0 14px 28px -14px rgba(14,47,35,0.28)"
    : "0 18px 36px -14px rgba(14,47,35,0.28), 0 6px 16px -10px rgba(14,47,35,0.16)";

  return (
    <motion.button
      onClick={onClick}
      animate={{ y: targetY, scale: targetScale, opacity: targetOpacity }}
      whileHover={{ y: targetY - 4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative aspect-[3/4] rounded-2xl text-left ${
        isActive ? "ring-2 ring-forest" : "ring-1 ring-line/50"
      }`}
      style={{
        boxShadow: shadow,
        transformStyle: "preserve-3d",
      }}
      aria-pressed={isActive}
    >
      {/* Inner wrapper carries the continuous float-bob */}
      <motion.div
        className="relative h-full w-full rounded-2xl overflow-hidden"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4.4 + index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.55,
        }}
        style={{ background: product.accent, color: product.fg }}
      >
        {/* Material pattern */}
        <SwatchPattern variant={product.pattern} color={product.fg} />

        {/* Highlight ridge — gives the card a slight 3D edge */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${product.fg}33, transparent)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.04] pointer-events-none" />

        {/* Top bar — stream tag + index */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.22em] px-1.5 py-0.5 rounded-sm border"
            style={{ borderColor: `${product.fg}55`, color: product.fg }}
          >
            {product.streamTag}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.22em] tabular-nums"
            style={{ color: `${product.fg}aa` }}
          >
            {String(index + 1).padStart(2, "0")} / 05
          </span>
        </div>

        {/* Big formula in centre */}
        <div className="absolute inset-0 grid place-items-center pt-4 pb-12 px-3">
          <div className="text-center">
            <div
              className="font-display text-xl sm:text-2xl tracking-tight leading-[1.1] break-words"
              style={{ color: product.fg }}
            >
              {product.formula}
            </div>
          </div>
        </div>

        {/* Name strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-3 sm:py-3.5" style={{ background: `${product.fg}10` }}>
          <div
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-center"
            style={{ color: product.fg }}
          >
            {product.name}
          </div>
        </div>
      </motion.div>

      {/* Specimen tag pin — only when active */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 origin-top pointer-events-none"
        >
          <div className="w-px h-4 bg-forest" />
        </motion.div>
      )}
    </motion.button>
  );
}

function EmptyDatasheet() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl border border-dashed border-line bg-ivory/60 px-8 py-14 sm:py-20"
    >
      <div className="absolute inset-0 grain opacity-30 pointer-events-none rounded-3xl" />
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
          Datasheet · awaiting selection
        </div>
        <h3 className="mt-4 font-display text-xl sm:text-2xl text-ink leading-snug">
          Pick a specimen above to view its properties and downstream markets.
        </h3>
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-muted/80">
          {products.map((p, i) => (
            <span key={p.id} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: p.accent }}
              />
              <span>{p.streamTag}</span>
              {i < products.length - 1 && <span className="opacity-50">·</span>}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DatasheetPanel({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  return (
    <div className="relative rounded-3xl border border-line bg-ivory overflow-hidden">
      {/* Header band with the product's accent */}
      <div
        className="h-1.5 w-full"
        style={{ background: product.accent }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-8 p-7 sm:p-10"
        >
          {/* Left — sample block + tag */}
          <div className="lg:col-span-4">
            <div
              className="relative aspect-[5/4] rounded-2xl overflow-hidden"
              style={{ background: product.accent }}
            >
              <SwatchPattern variant={product.pattern} color={product.fg} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.28em] mb-2"
                  style={{ color: `${product.fg}99` }}
                >
                  Specimen · {product.streamTag}
                </div>
                <div
                  className="font-display text-2xl sm:text-3xl tracking-tight text-center leading-[1.1] break-words"
                  style={{ color: product.fg }}
                >
                  {product.formula}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
              <span>Sample · {String(index + 1).padStart(2, "0")} / 05</span>
              <span>Approved</span>
            </div>
          </div>

          {/* Right — details */}
          <div className="lg:col-span-8">
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
              Output stream
            </div>
            <h3 className="mt-2 font-display text-3xl sm:text-5xl text-ink leading-[1.05]">
              {product.name}
            </h3>

            <p className="mt-5 text-base sm:text-lg text-graphite leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Properties table — columns scale to property count so we never
                 leave an empty cell trailing. */}
            <div
              className={`mt-7 grid gap-px bg-line border border-line rounded-2xl overflow-hidden ${
                product.properties.length >= 3
                  ? "sm:grid-cols-3"
                  : "sm:grid-cols-2"
              }`}
            >
              {product.properties.map((p) => (
                <div key={p.k} className="bg-paper p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                    {p.k}
                  </div>
                  <div className="mt-1 font-display text-sm sm:text-base text-ink">
                    {p.v}
                  </div>
                </div>
              ))}
            </div>

            {/* Markets */}
            <div className="mt-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Where it goes
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.markets.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-1.5 text-sm text-forest"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: product.accent }}
                    />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* SVG pattern overlays — give each specimen card its own material texture. */
function SwatchPattern({ variant, color }: { variant: string; color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        {variant === "lines" && (
          <pattern id={`p-${variant}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={color} strokeWidth="0.5" />
          </pattern>
        )}
        {variant === "crystals" && (
          <pattern id={`p-${variant}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="1.2" fill={color} opacity="0.6" />
            <circle cx="16" cy="14" r="0.9" fill={color} opacity="0.4" />
            <circle cx="10" cy="18" r="0.6" fill={color} opacity="0.5" />
          </pattern>
        )}
        {variant === "diamonds" && (
          <pattern id={`p-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon points="10,3 14,10 10,17 6,10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.7" />
          </pattern>
        )}
        {variant === "hex" && (
          <pattern id={`p-${variant}`} width="24" height="22" patternUnits="userSpaceOnUse">
            <polygon
              points="12,2 22,7 22,15 12,20 2,15 2,7"
              fill="none"
              stroke={color}
              strokeWidth="0.4"
              opacity="0.55"
            />
          </pattern>
        )}
        {variant === "bricks" && (
          <pattern id={`p-${variant}`} width="32" height="14" patternUnits="userSpaceOnUse">
            <rect x="0.5" y="0.5" width="16" height="6" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
            <rect x="17" y="0.5" width="14" height="6" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
            <rect x="-7" y="7.5" width="16" height="6" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
            <rect x="9" y="7.5" width="16" height="6" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
            <rect x="25" y="7.5" width="16" height="6" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#p-${variant})`} opacity="0.45" />
    </svg>
  );
}
