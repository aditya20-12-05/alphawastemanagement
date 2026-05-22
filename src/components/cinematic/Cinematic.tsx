"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { useSectionProgress } from "@/components/ui/useSectionProgress";

/* --------------------------------------------------------------------------
   ALPHA · PROCESS FLOW DIAGRAM (PFD-001)
   Scroll-constructed engineering drawing. Each chapter advances the diagram.
-------------------------------------------------------------------------- */

const PHASES = [
  {
    key: "input",
    numeral: "I",
    title: "Input",
    caption:
      "Industrial waste arrives. About 180 tonnes a month — the hazardous, chromium-bearing fraction from stainless-steel finishing.",
  },
  {
    key: "segregation",
    numeral: "II",
    title: "Segregation",
    caption:
      "Stream S01 enters Segregator A-100. Fine metal returns to the melt shop as feed. The residue advances.",
  },
  {
    key: "process",
    numeral: "III",
    title: "Recovery & Hydromet",
    caption:
      "Recovery A-200 separates metal from oxide-bearing dust. Hydromet A-300 extracts gypsum, sodium sulphate, and metal oxides.",
  },
  {
    key: "balance",
    numeral: "IV",
    title: "Bricks & Mass Balance",
    caption:
      "Residual fines pass to Brick Plant A-400. Cement-less bricks at 19–20 kg/sq mm. Mass balance closes at 100 %.",
  },
];

const FOREST = "#0E2F23";
const SAGE = "#4A7C4E";
const LINE = "#D5CFBC";
const PAPER = "#F5F1E8";
const RUST = "#8B4A2A";
const MUTED = "#6B6862";

// Camera viewports per chapter — pans focus to the active stage.
const CAMERAS = [
  "10 150 700 360", // I: input region
  "10 60  820 520", // II: input + segregation + return loop
  "240 60 940 460", // III: rec + hydromet + outputs
  "0 0   1200 600", // IV: full diagram including brick plant + stamp
];

export default function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref);
  const activePhase = Math.min(PHASES.length - 1, Math.max(0, Math.floor(progress * PHASES.length)));

  return (
    <section ref={ref} className="relative" style={{ height: "800vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        <BlueprintGrid />
        <div className="absolute inset-0 grain opacity-25 pointer-events-none" />
        <CornerMarks />
        <TitleBlock />
        <RevisionStamp activePhase={activePhase} />

        <div className="absolute inset-0 flex items-center justify-center pt-20 pb-40 px-6 sm:px-12">
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

function TitleBlock() {
  return (
    <div className="absolute top-6 left-8 right-8 z-20 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-forest pointer-events-none">
      <div className="flex items-center gap-4">
        <span>Alpha · Waste Management</span>
        <span className="opacity-40">/</span>
        <span>PFD-001</span>
        <span className="opacity-40">/</span>
        <span>Rev. 0</span>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        <span>Sheet 01 of 01</span>
      </div>
    </div>
  );
}

function RevisionStamp({ activePhase }: { activePhase: number }) {
  return (
    <div className="absolute bottom-6 left-8 z-20 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-forest/75 pointer-events-none">
      <span className="inline-block w-2 h-2 border border-forest" />
      <span>
        Chapter {String(activePhase + 1).padStart(2, "0")} of 04 · scroll to advance
      </span>
    </div>
  );
}

function ProgressBar({ activePhase }: { activePhase: number }) {
  return (
    <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30">
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
            {i < PHASES.length - 1 && <span className="h-px w-4 sm:w-10 bg-forest/30" />}
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
      <div className="mx-auto max-w-3xl relative h-28 sm:h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-forest">
              <span className="border border-forest px-1.5 py-0.5">Chapter {phase.numeral}</span>
              <span className="opacity-60">{phase.title}</span>
            </div>
            <p className="mt-3 text-sm sm:text-base text-graphite leading-relaxed max-w-2xl">
              {phase.caption}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Coordinates (clean grid) ----------------------------------- */
/*
   Equipment row at y=200..280 (height=80, width=110, gap=40)
   Equipment x positions:
     INPUT  x=40..150
     SEG    x=270..380
     REC    x=500..610
     HYD    x=730..840
     BRICK  x=730..840  y=380..460
   Terminals on right side (x=1040..1180)
   Mass balance stamp at lower-left (40..300, 470..550)
*/

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

      {/* ---------- Phase I — input ---------- */}
      <InputSource active={activePhase === 0} visible={activePhase >= 0} />
      <Stream
        d="M 150 240 L 264 240"
        tagId="S01"
        topLabel="Industrial waste"
        topSubLabel="~180 MT/mo"
        tagPos={{ x: 207, y: 240 }}
        labelPos={{ x: 207, y: 218 }}
        active={activePhase === 0 || activePhase === 1}
        visible={activePhase >= 0}
      />

      {/* ---------- Phase II — segregation + return loop ---------- */}
      <Equipment id="A-100" title="Segregator" x={270} y={200} w={110} h={80} active={activePhase === 1} visible={activePhase >= 1} />
      <Stream
        d="M 380 240 L 494 240"
        tagId="S02"
        topLabel="Residue"
        tagPos={{ x: 437, y: 240 }}
        labelPos={{ x: 437, y: 218 }}
        active={activePhase === 1 || activePhase === 2}
        visible={activePhase >= 1}
        delay={0.4}
      />
      {/* S05 return loop — long path: up from seg, across to melt shop */}
      <Stream
        d="M 325 200 L 325 110 L 1080 110"
        tagId="S05"
        topLabel="Metal fines → melt shop"
        tagPos={{ x: 325, y: 145 }}
        labelPos={{ x: 700, y: 96 }}
        active={activePhase === 1}
        visible={activePhase >= 1}
        delay={0.55}
        color="sage"
      />
      <Terminal x={1080} y={110} w={100} label="MELT SHOP" visible={activePhase >= 1} delay={0.85} variant="sage" active={activePhase === 1} />

      {/* ---------- Phase III — recovery + hydromet + outputs ---------- */}
      <Equipment id="A-200" title="Recovery" x={500} y={200} w={110} h={80} active={activePhase === 2} visible={activePhase >= 2} />
      <Stream
        d="M 610 240 L 724 240"
        tagId="S03"
        topLabel="Recovered metal"
        tagPos={{ x: 667, y: 240 }}
        labelPos={{ x: 667, y: 218 }}
        active={activePhase === 2}
        visible={activePhase >= 2}
        delay={0.4}
      />
      <Equipment id="A-300" title="Hydromet" x={730} y={200} w={110} h={80} active={activePhase === 2} visible={activePhase >= 2} delay={0.5} />

      {/* Three output streams from Hydromet to the OUTPUTS panel.
          Labels live INSIDE the panel — only the diamond tags sit on the lines. */}
      <Stream
        d="M 840 215 L 1034 215"
        tagId="S06"
        tagPos={{ x: 937, y: 215 }}
        active={activePhase === 2 || activePhase === 3}
        visible={activePhase >= 2}
        delay={0.75}
        noLabel
      />
      <Stream
        d="M 840 240 L 1034 240"
        tagId="S07"
        tagPos={{ x: 937, y: 240 }}
        active={activePhase === 2 || activePhase === 3}
        visible={activePhase >= 2}
        delay={0.85}
        noLabel
      />
      <Stream
        d="M 840 265 L 1034 265"
        tagId="S08"
        tagPos={{ x: 937, y: 265 }}
        active={activePhase === 2 || activePhase === 3}
        visible={activePhase >= 2}
        delay={0.95}
        noLabel
      />
      <OutputsPanel visible={activePhase >= 2} active={activePhase === 2} />

      {/* ---------- Phase IV — slag → brick plant → bricks ---------- */}
      <Stream
        d="M 790 280 L 790 380"
        tagId="S04"
        topLabel="Fines"
        tagPos={{ x: 790, y: 330 }}
        labelPos={{ x: 820, y: 335 }}
        labelAnchor="start"
        active={activePhase === 3}
        visible={activePhase >= 3}
        delay={0.1}
      />
      <Equipment id="A-400" title="Brick Plant" x={730} y={380} w={110} h={80} active={activePhase === 3} visible={activePhase >= 3} delay={0.3} />
      <Stream
        d="M 840 420 L 1034 420"
        tagId="S09"
        topLabel="Cement-less bricks"
        topSubLabel="19–20 kg/sq mm"
        tagPos={{ x: 937, y: 420 }}
        labelPos={{ x: 937, y: 398 }}
        active={activePhase === 3}
        visible={activePhase >= 3}
        delay={0.55}
        color="rust"
      />
      <Terminal x={1040} y={420} w={140} label="BRICKS · S09" visible={activePhase >= 3} delay={0.8} variant="rust" active={activePhase === 3} />

      <MassBalanceStamp visible={activePhase >= 3} />
    </motion.svg>
  );
}

/* ---------- Primitives ------------------------------------------------- */

function InputSource({ active, visible }: { active: boolean; visible: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? (active ? 1 : 0.4) : 0 }}
      transition={{ duration: 0.5 }}
    >
      <rect x={40} y={200} width={110} height={80} fill="none" stroke={FOREST} strokeWidth="1.4" strokeDasharray="3 3" />
      <text x={95} y={236} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2" fill={FOREST}>
        INPUT
      </text>
      <text x={95} y={252} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="1.4" fill={FOREST} opacity="0.6">
        SOURCE
      </text>
    </motion.g>
  );
}

interface EquipmentProps {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  active: boolean;
  visible: boolean;
  delay?: number;
}

function Equipment({ id, title, x, y, w, h, active, visible, delay = 0.15 }: EquipmentProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: visible ? (active ? 1 : 0.4) : 0, scale: visible ? 1 : 0.94 }}
      transition={{ duration: 0.6, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
    >
      {active && (
        <motion.rect
          x={x - 6}
          y={y - 6}
          width={w + 12}
          height={h + 12}
          fill="none"
          stroke={SAGE}
          strokeWidth="0.8"
          strokeDasharray="2 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <rect x={x} y={y} width={w} height={h} fill={PAPER} stroke={FOREST} strokeWidth="1.4" />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="none" stroke={FOREST} strokeWidth="0.5" />
      <circle cx={x + 14} cy={y + 14} r="9" fill={PAPER} stroke={FOREST} strokeWidth="1" />
      <text x={x + 14} y={y + 17} textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill={FOREST}>
        {id.split("-")[1]}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="1.6" fill={FOREST}>
        {title.toUpperCase()}
      </text>
      <text x={x + w / 2} y={y + h - 10} textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={FOREST} opacity="0.55">
        {id}
      </text>
      {active && (
        <motion.circle
          cx={x + w - 12}
          cy={y + 12}
          r="2.5"
          fill={SAGE}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.g>
  );
}

interface StreamProps {
  d: string;
  tagId: string;
  topLabel?: string;
  topSubLabel?: string;
  tagPos: { x: number; y: number };
  labelPos?: { x: number; y: number };
  labelAnchor?: "start" | "middle" | "end";
  active: boolean;
  visible: boolean;
  delay?: number;
  color?: "forest" | "sage" | "rust";
  noLabel?: boolean;
}

function Stream({
  d,
  tagId,
  topLabel,
  topSubLabel,
  tagPos,
  labelPos,
  labelAnchor = "middle",
  active,
  visible,
  delay = 0.2,
  color = "forest",
  noLabel,
}: StreamProps) {
  const stroke = color === "sage" ? SAGE : color === "rust" ? RUST : FOREST;
  const marker = color === "sage" ? "url(#arrow-sage)" : color === "rust" ? "url(#arrow-rust)" : "url(#arrow)";

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

      {/* Stream tag diamond */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, delay: visible ? delay + 0.55 : 0 }}
      >
        <polygon
          points={`${tagPos.x},${tagPos.y - 7} ${tagPos.x + 14},${tagPos.y} ${tagPos.x},${tagPos.y + 7} ${tagPos.x - 14},${tagPos.y}`}
          fill={PAPER}
          stroke={stroke}
          strokeWidth="1"
        />
        <text x={tagPos.x} y={tagPos.y + 3} textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill={stroke}>
          {tagId}
        </text>
      </motion.g>

      {/* Optional floating label */}
      {!noLabel && topLabel && labelPos && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.4, delay: visible ? delay + 0.65 : 0 }}
        >
          <text x={labelPos.x} y={labelPos.y} textAnchor={labelAnchor} fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={FOREST}>
            {topLabel.toUpperCase()}
          </text>
          {topSubLabel && (
            <text x={labelPos.x} y={labelPos.y + 10} textAnchor={labelAnchor} fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1" fill={FOREST} opacity="0.55">
              {topSubLabel}
            </text>
          )}
        </motion.g>
      )}
    </motion.g>
  );
}

function Terminal({
  x,
  y,
  w = 100,
  label,
  visible,
  delay = 0.2,
  variant = "forest",
  active,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  visible: boolean;
  delay?: number;
  variant?: "forest" | "sage" | "rust";
  active?: boolean;
}) {
  const stroke = variant === "rust" ? RUST : variant === "sage" ? SAGE : FOREST;
  const h = 28;
  return (
    <motion.g
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: visible ? (active ? 1 : 0.45) : 0, x: 0 }}
      transition={{ duration: 0.5, delay: visible ? delay : 0 }}
    >
      <rect x={x} y={y - h / 2} width={w} height={h} fill={PAPER} stroke={stroke} strokeWidth="1.2" />
      <text x={x + w / 2} y={y + 3} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.6" fill={stroke}>
        {label}
      </text>
    </motion.g>
  );
}

/* OutputsPanel — labelled terminal containing the three Hydromet outputs.
   Labels live INSIDE this panel rather than floating on the stream lines —
   that's what removes the previous overlap clutter. */
function OutputsPanel({ visible, active }: { visible: boolean; active: boolean }) {
  const x = 1034;
  const y = 192;
  const w = 156;
  const h = 96;
  const rows = [
    { tag: "S06", name: "GYPSUM", note: "CaSO₄" },
    { tag: "S07", name: "Na₂SO₄", note: "Sodium sulphate" },
    { tag: "S08", name: "OXIDES", note: "Fe₂O₃ · Cr₂O₃" },
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
        OUTPUTS
      </text>
      {rows.map((r, i) => {
        const ry = y + 24 + i * 23;
        return (
          <g key={r.tag}>
            <text x={x + 8} y={ry} fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={FOREST} opacity="0.65">
              {r.tag}
            </text>
            <text x={x + 36} y={ry} fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={FOREST}>
              {r.name}
            </text>
            <text x={x + 36} y={ry + 9} fontSize="7" fontFamily="ui-monospace, monospace" fill={FOREST} opacity="0.55">
              {r.note}
            </text>
          </g>
        );
      })}
    </motion.g>
  );
}

function MassBalanceStamp({ visible }: { visible: boolean }) {
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
        MASS BALANCE
      </text>
      <text x={170} y={520} textAnchor="middle" fontSize="20" fontFamily="ui-serif, Georgia" fill={FOREST}>
        100 % closed
      </text>
      <text x={170} y={538} textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1.4" fill={FOREST} opacity="0.65">
        Σ outputs = Σ inputs · zero residue
      </text>
    </motion.g>
  );
}
