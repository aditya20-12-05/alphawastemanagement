"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { useSectionProgress } from "@/components/ui/useSectionProgress";

/* --------------------------------------------------------------------------
   ALPHA · HOW IT WORKS — scroll-constructed flow diagram.
   The structure and motion match the engineering PFD, but the language is
   plain English with simple per-stage icons so a non-technical visitor
   can follow along.
-------------------------------------------------------------------------- */

const PHASES = [
  {
    key: "input",
    numeral: "I",
    title: "Waste comes in",
    caption:
      "Steel plants generate hazardous industrial waste. About 180 tonnes a month. We collect it.",
  },
  {
    key: "sort",
    numeral: "II",
    title: "We sort it",
    caption:
      "Loose metal goes straight back into making new steel. Everything else moves to the next stage.",
  },
  {
    key: "process",
    numeral: "III",
    title: "We extract value",
    caption:
      "Chemistry separates out three saleable materials: gypsum, sodium sulphate, and metal-oxide powders.",
  },
  {
    key: "bricks",
    numeral: "IV",
    title: "Bricks close the loop",
    caption:
      "Whatever is left becomes patented cement-less bricks, stronger than fly-ash. Nothing is dumped.",
  },
];

const FOREST = "#0E2F23";
const SAGE = "#4A7C4E";
const LINE = "#D5CFBC";
const PAPER = "#F5F1E8";
const RUST = "#8B4A2A";

const CAMERAS = [
  "10 150 700 360",
  "10 60  820 520",
  "240 60 940 460",
  "0 0   1200 600",
];

export default function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref);
  const activePhase = Math.min(PHASES.length - 1, Math.max(0, Math.floor(progress * PHASES.length)));

  return (
    /* 360vh = ~90vh per phase. */
    <section ref={ref} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        <BlueprintGrid />
        <div className="absolute inset-0 grain opacity-25 pointer-events-none" />
        <CornerMarks />
        <TitleStrip />

        <div className="absolute inset-0 flex items-center justify-center pt-40 sm:pt-44 pb-40 px-6 sm:px-12">
          <PFDCanvas activePhase={activePhase} />
        </div>

        <ProgressBar activePhase={activePhase} />
        <Captions activePhase={activePhase} />
      </div>
    </section>
  );
}

/* ---------- Drawing chrome --------------------------------------------- */

function BlueprintGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <defs>
        <pattern id="grid-coarse" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={LINE} strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-coarse)" />
    </svg>
  );
}

function CornerMarks() {
  return (
    <>
      {[
        { top: 16, left: 16, rot: 0 },
        { top: 16, right: 16, rot: 90 },
        { bottom: 16, left: 16, rot: -90 },
        { bottom: 16, right: 16, rot: 180 },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            transform: `rotate(${c.rot}deg)`,
            width: 22,
            height: 22,
          }}
          className="pointer-events-none"
        >
          <svg viewBox="0 0 22 22" className="w-full h-full">
            <line x1="0" y1="0" x2="11" y2="0" stroke={FOREST} strokeWidth="1.2" />
            <line x1="0" y1="0" x2="0" y2="11" stroke={FOREST} strokeWidth="1.2" />
          </svg>
        </div>
      ))}
    </>
  );
}

function TitleStrip() {
  return (
    <div className="absolute top-28 sm:top-32 left-0 right-0 z-20 px-6 text-center pointer-events-none">
      <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
        § Process
      </div>
      <h2 className="mt-2 font-display text-[clamp(1.5rem,3.4vw,2.4rem)] leading-[1.1] tracking-tight text-ink">
        Alpha, how it works.
      </h2>
    </div>
  );
}

function ProgressBar({ activePhase }: { activePhase: number }) {
  return (
    <div className="absolute top-52 sm:top-60 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-center gap-2 sm:gap-3">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.key}
            animate={{ opacity: i === activePhase ? 1 : 0.3 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-forest">
              {p.numeral}
            </span>
            {i < PHASES.length - 1 && (
              <span className="h-px w-4 sm:w-10 bg-forest/30" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Captions({ activePhase }: { activePhase: number }) {
  const phase = PHASES[activePhase];
  return (
    <div className="absolute bottom-14 sm:bottom-16 left-0 right-0 z-30 px-8">
      <div className="mx-auto max-w-3xl relative h-28 sm:h-24 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div className="inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-forest">
              <span className="border border-forest px-1.5 py-0.5">{phase.numeral}</span>
              <span className="opacity-60">{phase.title}</span>
            </div>
            <p className="mt-3 mx-auto text-sm sm:text-base text-graphite leading-relaxed max-w-xl">
              {phase.caption}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- The PFD canvas — same flow, simpler labels ----------------- */

function PFDCanvas({ activePhase }: { activePhase: number }) {
  return (
    <motion.svg
      animate={{ viewBox: CAMERAS[activePhase] }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      preserveAspectRatio="xMidYMid meet"
      className="w-full max-w-[1280px] h-full max-h-[64vh]"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill={FOREST} />
        </marker>
        <marker id="arrow-sage" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill={SAGE} />
        </marker>
        <marker id="arrow-rust" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill={RUST} />
        </marker>
      </defs>

      {/* Phase I — input */}
      <InputBox active={activePhase === 0} visible={activePhase >= 0} />
      <Stream
        d="M 150 240 L 264 240"
        label="Waste"
        active={activePhase === 0 || activePhase === 1}
        visible={activePhase >= 0}
      />

      {/* Phase II — sort + return */}
      <Stage id="sort" title="Sort" x={270} y={200} active={activePhase === 1} visible={activePhase >= 1} icon="sort" />
      <Stream
        d="M 380 240 L 494 240"
        label="Residue"
        active={activePhase === 1 || activePhase === 2}
        visible={activePhase >= 1}
        delay={0.4}
      />
      <Stream
        d="M 325 200 L 325 110 L 1080 110"
        label="Metal · back to steelmaking"
        labelPos={{ x: 700, y: 96 }}
        active={activePhase === 1}
        visible={activePhase >= 1}
        delay={0.55}
        color="sage"
      />
      <Terminal
        x={1080} y={110} w={100}
        label="MELT SHOP"
        icon="loop"
        visible={activePhase >= 1}
        delay={0.85}
        variant="sage"
        active={activePhase === 1}
      />

      {/* Phase III — extract + separate + outputs panel */}
      <Stage id="extract" title="Extract" x={500} y={200} active={activePhase === 2} visible={activePhase >= 2} icon="magnet" />
      <Stream
        d="M 610 240 L 724 240"
        label="Metal + dust"
        active={activePhase === 2}
        visible={activePhase >= 2}
        delay={0.4}
      />
      <Stage id="separate" title="Separate" x={730} y={200} active={activePhase === 2} visible={activePhase >= 2} delay={0.5} icon="beaker" />

      <Stream
        d="M 840 215 L 1034 215"
        active={activePhase === 2 || activePhase === 3}
        visible={activePhase >= 2}
        delay={0.75}
        noLabel
      />
      <Stream
        d="M 840 240 L 1034 240"
        active={activePhase === 2 || activePhase === 3}
        visible={activePhase >= 2}
        delay={0.85}
        noLabel
      />
      <Stream
        d="M 840 265 L 1034 265"
        active={activePhase === 2 || activePhase === 3}
        visible={activePhase >= 2}
        delay={0.95}
        noLabel
      />
      <OutputsPanel visible={activePhase >= 2} active={activePhase === 2} />

      {/* Phase IV — bricks */}
      <Stream
        d="M 790 280 L 790 380"
        label="Leftover dust"
        labelPos={{ x: 815, y: 335 }}
        labelAnchor="start"
        active={activePhase === 3}
        visible={activePhase >= 3}
        delay={0.1}
      />
      <Stage id="bricks" title="Bricks" x={730} y={380} active={activePhase === 3} visible={activePhase >= 3} delay={0.3} icon="bricks" />
      <Stream
        d="M 840 420 L 1034 420"
        label="Cement-less bricks"
        active={activePhase === 3}
        visible={activePhase >= 3}
        delay={0.55}
        color="rust"
      />
      <Terminal
        x={1040} y={420} w={140}
        label="BRICKS"
        icon="brick"
        visible={activePhase >= 3}
        delay={0.8}
        variant="rust"
        active={activePhase === 3}
      />

      <ZeroResidueStamp visible={activePhase >= 3} />
    </motion.svg>
  );
}

/* ---------- Icons — small SVG glyphs that ride inside each box --------- */

function StageIcon({
  kind, cx, cy, color,
}: { kind: string; cx: number; cy: number; color: string }) {
  // 18px wide icon centred at (cx, cy)
  switch (kind) {
    case "waste":
      // Stacked cubes
      return (
        <g stroke={color} strokeWidth="1.2" fill="none">
          <rect x={cx - 9} y={cy + 0} width="8" height="6" />
          <rect x={cx} y={cy + 0} width="8" height="6" />
          <rect x={cx - 5} y={cy - 6} width="8" height="6" />
        </g>
      );
    case "sort":
      // Branch / fork icon
      return (
        <g stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d={`M ${cx - 9} ${cy} L ${cx} ${cy}`} />
          <path d={`M ${cx} ${cy} L ${cx + 9} ${cy - 6}`} />
          <path d={`M ${cx} ${cy} L ${cx + 9} ${cy + 6}`} />
          <circle cx={cx + 9} cy={cy - 6} r="1.6" fill={color} />
          <circle cx={cx + 9} cy={cy + 6} r="1.6" fill={color} />
        </g>
      );
    case "magnet":
      // U-shape magnet
      return (
        <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d={`M ${cx - 7} ${cy - 7} L ${cx - 7} ${cy + 5} A 7 7 0 0 0 ${cx + 7} ${cy + 5} L ${cx + 7} ${cy - 7}`} />
          <line x1={cx - 7} y1={cy - 5} x2={cx - 3} y2={cy - 5} />
          <line x1={cx + 3} y1={cy - 5} x2={cx + 7} y2={cy - 5} />
        </g>
      );
    case "beaker":
      // Beaker / flask
      return (
        <g stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M ${cx - 4} ${cy - 8} L ${cx - 4} ${cy - 2} L ${cx - 8} ${cy + 7} L ${cx + 8} ${cy + 7} L ${cx + 4} ${cy - 2} L ${cx + 4} ${cy - 8} Z`} />
          <line x1={cx - 5} y1={cy - 8} x2={cx + 5} y2={cy - 8} />
          <line x1={cx - 6} y1={cy + 3} x2={cx + 6} y2={cy + 3} opacity="0.5" />
        </g>
      );
    case "bricks":
      // Brick stack icon
      return (
        <g stroke={color} strokeWidth="1.2" fill="none">
          <rect x={cx - 9} y={cy - 6} width="8" height="5" />
          <rect x={cx + 1} y={cy - 6} width="8" height="5" />
          <rect x={cx - 5} y={cy + 0} width="8" height="5" />
          <rect x={cx - 9} y={cy + 6} width="8" height="5" />
          <rect x={cx + 1} y={cy + 6} width="8" height="5" />
        </g>
      );
    case "loop":
      // Circular arrow (return)
      return (
        <g stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d={`M ${cx + 6} ${cy - 4} A 5 5 0 1 0 ${cx + 6} ${cy + 4}`} />
          <path d={`M ${cx + 4} ${cy - 6} L ${cx + 6} ${cy - 4} L ${cx + 9} ${cy - 5}`} />
        </g>
      );
    case "brick":
      // Single brick
      return (
        <g stroke={color} strokeWidth="1.2" fill="none">
          <rect x={cx - 8} y={cy - 4} width="16" height="8" />
          <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} />
        </g>
      );
    default:
      return null;
  }
}

/* ---------- Primitives ------------------------------------------------- */

function InputBox({ active, visible }: { active: boolean; visible: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? (active ? 1 : 0.4) : 0 }}
      transition={{ duration: 0.5 }}
    >
      <rect x={40} y={200} width={110} height={80} fill="none" stroke={FOREST} strokeWidth="1.4" strokeDasharray="3 3" />
      <StageIcon kind="waste" cx={95} cy={228} color={FOREST} />
      <text x={95} y={258} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2" fill={FOREST}>
        WASTE
      </text>
    </motion.g>
  );
}

interface StageProps {
  id: string;
  title: string;
  x: number;
  y: number;
  active: boolean;
  visible: boolean;
  delay?: number;
  icon: string;
}

function Stage({ id, title, x, y, active, visible, delay = 0.15, icon }: StageProps) {
  const w = 110, h = 80;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: visible ? (active ? 1 : 0.4) : 0, scale: visible ? 1 : 0.94 }}
      transition={{ duration: 0.6, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
    >
      {active && (
        <motion.rect
          x={x - 6} y={y - 6} width={w + 12} height={h + 12}
          fill="none" stroke={SAGE} strokeWidth="0.8" strokeDasharray="2 3"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.5 }}
        />
      )}
      <rect x={x} y={y} width={w} height={h} fill={PAPER} stroke={FOREST} strokeWidth="1.4" />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="none" stroke={FOREST} strokeWidth="0.5" />
      <StageIcon kind={icon} cx={x + w / 2} cy={y + h / 2 - 12} color={FOREST} />
      <text x={x + w / 2} y={y + h / 2 + 18} textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" letterSpacing="2" fill={FOREST}>
        {title.toUpperCase()}
      </text>
      {active && (
        <motion.circle
          cx={x + w - 12} cy={y + 12} r="2.5" fill={SAGE}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.g>
  );
}

interface StreamProps {
  d: string;
  label?: string;
  labelPos?: { x: number; y: number };
  labelAnchor?: "start" | "middle" | "end";
  active: boolean;
  visible: boolean;
  delay?: number;
  color?: "forest" | "sage" | "rust";
  noLabel?: boolean;
}

function Stream({ d, label, labelPos, labelAnchor = "middle", active, visible, delay = 0.2, color = "forest", noLabel }: StreamProps) {
  const stroke = color === "sage" ? SAGE : color === "rust" ? RUST : FOREST;
  const marker = color === "sage" ? "url(#arrow-sage)" : color === "rust" ? "url(#arrow-rust)" : "url(#arrow)";

  // Derive midpoint of path for default label position
  const matches = Array.from(d.matchAll(/([\d.]+)\s+([\d.]+)/g)).map((m) => [parseFloat(m[1]), parseFloat(m[2])]);
  const start = matches[0] ?? [0, 0];
  const end = matches[matches.length - 1] ?? [0, 0];
  const mx = labelPos?.x ?? (start[0] + end[0]) / 2;
  const my = labelPos?.y ?? Math.min(start[1], end[1]) - 8;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? (active ? 1 : 0.4) : 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth="1.4"
        fill="none"
        markerEnd={marker}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: visible ? 1 : 0 }}
        transition={{ duration: 0.9, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      />
      {!noLabel && label && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.4, delay: visible ? delay + 0.55 : 0 }}
        >
          <text
            x={mx}
            y={my}
            textAnchor={labelAnchor}
            fontSize="9"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fill={FOREST}
            opacity="0.75"
          >
            {label}
          </text>
        </motion.g>
      )}
    </motion.g>
  );
}

function Terminal({
  x, y, w = 100, label, icon, visible, delay = 0.2, variant = "forest", active,
}: {
  x: number; y: number; w?: number; label: string; icon?: string;
  visible: boolean; delay?: number; variant?: "forest" | "sage" | "rust"; active?: boolean;
}) {
  const stroke = variant === "rust" ? RUST : variant === "sage" ? SAGE : FOREST;
  const h = 32;
  return (
    <motion.g
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: visible ? (active ? 1 : 0.45) : 0, x: 0 }}
      transition={{ duration: 0.5, delay: visible ? delay : 0 }}
    >
      <rect x={x} y={y - h / 2} width={w} height={h} fill={PAPER} stroke={stroke} strokeWidth="1.2" />
      {icon && <StageIcon kind={icon} cx={x + 14} cy={y} color={stroke} />}
      <text x={icon ? x + w / 2 + 6 : x + w / 2} y={y + 3} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.6" fill={stroke}>
        {label}
      </text>
    </motion.g>
  );
}

function OutputsPanel({ visible, active }: { visible: boolean; active: boolean }) {
  const x = 1034, y = 192, w = 156, h = 96;
  const rows = [
    { name: "Gypsum",            note: "for cement & construction" },
    { name: "Sodium sulphate",   note: "industrial chemistry" },
    { name: "Metal oxides",      note: "pigments & ceramics" },
  ];
  return (
    <motion.g
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: visible ? (active ? 1 : 0.45) : 0, x: 0 }}
      transition={{ duration: 0.55, delay: visible ? 1.05 : 0 }}
    >
      <rect x={x} y={y} width={w} height={h} fill={PAPER} stroke={FOREST} strokeWidth="1.2" />
      <rect x={x} y={y} width={w} height={14} fill={FOREST} />
      <text x={x + w / 2} y={y + 10} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="2" fill={PAPER}>
        SOLD AS
      </text>
      {rows.map((r, i) => {
        const ry = y + 28 + i * 22;
        return (
          <g key={r.name}>
            <text x={x + 10} y={ry} fontSize="10" fontFamily="ui-sans-serif" fill={FOREST}>
              {r.name}
            </text>
            <text x={x + 10} y={ry + 9} fontSize="7" fontFamily="ui-monospace, monospace" fill={FOREST} opacity="0.55">
              {r.note}
            </text>
          </g>
        );
      })}
    </motion.g>
  );
}

function ZeroResidueStamp({ visible }: { visible: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ duration: 0.65, delay: visible ? 1.1 : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "170px 510px" }}
    >
      <rect x={40} y={470} width={260} height={80} fill="none" stroke={FOREST} strokeWidth="1.4" />
      <rect x={44} y={474} width={252} height={72} fill="none" stroke={FOREST} strokeWidth="0.5" />
      <text x={170} y={494} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2.4" fill={FOREST}>
        NOTHING DUMPED
      </text>
      <text x={170} y={520} textAnchor="middle" fontSize="22" fontFamily="ui-serif, Georgia" fill={FOREST}>
        Zero residue
      </text>
      <text x={170} y={538} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="1.5" fill={FOREST} opacity="0.7">
        Everything in becomes something out
      </text>
    </motion.g>
  );
}
