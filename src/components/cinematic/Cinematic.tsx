"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

/* --------------------------------------------------------------------------
   ALPHA · PROCESS FLOW DIAGRAM (PFD-001)
   Scroll-constructed technical drawing.
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
    title: "Recovery & Hydrometallurgy",
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

// Camera viewports — each phase focuses on a different region of the diagram.
const CAMERAS = [
  "20 140 700 360",   // phase I: focus on input + segregator area
  "20 60 800 500",    // phase II: input + segregator + branches
  "260 60 800 500",   // phase III: segregator + recovery + hydromet
  "0 0 1200 600",     // phase IV: whole diagram including brick plant
];

export default function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress so phase transitions feel paced, not snappy.
  const smoothed = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  useMotionValueEvent(smoothed, "change", (v) => {
    // Add a stability margin so a single bumpy scroll doesn't skip phases.
    const raw = v * PHASES.length;
    const idx = Math.min(PHASES.length - 1, Math.max(0, Math.floor(raw)));
    if (idx !== activePhase) setActivePhase(idx);
  });

  return (
    // 800vh = ~200vh per phase. Each phase needs deliberate scroll to advance.
    <section ref={ref} className="relative" style={{ height: "800vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        <BlueprintGrid />
        <div className="absolute inset-0 grain opacity-25 pointer-events-none" />
        <CornerMarks />
        <TitleBlock />
        <RevisionStamp activePhase={activePhase} />

        <div className="absolute inset-0 flex items-center justify-center pt-20 pb-36 px-6 sm:px-12">
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
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid-fine" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={LINE} strokeWidth="0.4" opacity="0.45" />
        </pattern>
        <pattern id="grid-coarse" width="128" height="128" patternUnits="userSpaceOnUse">
          <path d="M 128 0 L 0 0 0 128" fill="none" stroke={LINE} strokeWidth="0.5" opacity="0.55" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-fine)" />
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
            width: 24,
            height: 24,
          }}
          className="pointer-events-none"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <line x1="0" y1="0" x2="12" y2="0" stroke={FOREST} strokeWidth="1.2" />
            <line x1="0" y1="0" x2="0" y2="12" stroke={FOREST} strokeWidth="1.2" />
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
        <span className="opacity-40">/</span>
        <span>Scale n.t.s.</span>
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
              <span className="border border-forest px-1.5 py-0.5">
                Chapter {phase.numeral}
              </span>
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

/* ---------- The PFD canvas — viewBox animates per phase ---------------- */

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

      {/* Input source */}
      <InputSource active={activePhase === 0} visible={activePhase >= 0} />
      <Stream
        d="M 168 240 L 296 240"
        tagId="S01"
        label="Industrial waste"
        sublabel="~180 MT/mo"
        active={activePhase === 0 || activePhase === 1}
        visible={activePhase >= 0}
      />

      {/* Segregator + outputs */}
      <Equipment
        id="A-100"
        title="Segregator"
        x={300}
        y={196}
        w={140}
        h={88}
        active={activePhase === 1}
        visible={activePhase >= 1}
      />
      <Stream
        d="M 444 240 L 564 240"
        tagId="S02"
        label="Residue"
        sublabel=""
        active={activePhase === 1 || activePhase === 2}
        visible={activePhase >= 1}
        delay={0.4}
      />
      <Stream
        d="M 370 196 L 370 100 L 1080 100"
        tagId="S05"
        label="Metal fines"
        sublabel="→ melt shop"
        labelX={720}
        labelY={84}
        active={activePhase === 1}
        visible={activePhase >= 1}
        delay={0.55}
        color="sage"
      />
      <Terminal x={1080} y={100} label="MELT SHOP" visible={activePhase >= 1} delay={0.85} variant="sage" active={activePhase === 1} />

      {/* Recovery + Hydromet */}
      <Equipment id="A-200" title="Recovery" x={566} y={196} w={140} h={88} active={activePhase === 2} visible={activePhase >= 2} />
      <Stream
        d="M 710 240 L 818 240"
        tagId="S03"
        label="Recovered metal"
        sublabel=""
        active={activePhase === 2}
        visible={activePhase >= 2}
        delay={0.4}
      />
      <Equipment id="A-300" title="Hydrometallurgy" x={820} y={196} w={140} h={88} active={activePhase === 2} visible={activePhase >= 2} delay={0.5} />
      <Stream d="M 964 220 L 1080 220" tagId="S06" label="Gypsum" sublabel="CaSO₄" active={activePhase === 2} visible={activePhase >= 2} delay={0.8} />
      <Stream d="M 964 240 L 1080 240" tagId="S07" label="Sodium sulphate" sublabel="Na₂SO₄" active={activePhase === 2} visible={activePhase >= 2} delay={0.9} labelY={272} />
      <Stream d="M 964 260 L 1080 260" tagId="S08" label="Metal oxides" sublabel="Fe₂O₃ · Cr₂O₃ · NiO" active={activePhase === 2} visible={activePhase >= 2} delay={1.0} labelY={296} />
      <Terminal x={1080} y={220} label="OUTPUTS · S06–S08" visible={activePhase >= 2} delay={1.2} bigHeight={84} active={activePhase === 2} />

      {/* Brick plant + bricks */}
      <Stream d="M 890 284 L 890 380" tagId="S04" label="Fines" sublabel="" active={activePhase === 3} visible={activePhase >= 3} labelX={920} labelY={336} />
      <Equipment id="A-400" title="Brick Plant" x={820} y={380} w={140} h={88} active={activePhase === 3} visible={activePhase >= 3} delay={0.3} />
      <Stream d="M 964 424 L 1080 424" tagId="S09" label="Cement-less bricks" sublabel="19–20 kg/sq mm" active={activePhase === 3} visible={activePhase >= 3} delay={0.6} color="rust" />
      <Terminal x={1080} y={424} label="BRICKS · S09" visible={activePhase >= 3} delay={0.8} variant="rust" active={activePhase === 3} />

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
      <rect x={48} y={196} width={120} height={88} fill="none" stroke={FOREST} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={108} y={236} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2" fill={FOREST}>
        INPUT
      </text>
      <text x={108} y={252} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.4" fill={FOREST} opacity="0.7">
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
      animate={{
        opacity: visible ? (active ? 1 : 0.45) : 0,
        scale: visible ? 1 : 0.94,
      }}
      transition={{ duration: 0.6, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
    >
      {/* Active highlight ring */}
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
      <rect x={x} y={y} width={w} height={h} fill={PAPER} stroke={FOREST} strokeWidth="1.5" />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="none" stroke={FOREST} strokeWidth="0.6" />
      <circle cx={x + 16} cy={y + 16} r="11" fill={PAPER} stroke={FOREST} strokeWidth="1.2" />
      <text x={x + 16} y={y + 19} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill={FOREST}>
        {id.split("-")[1]}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" letterSpacing="2" fill={FOREST}>
        {title.toUpperCase()}
      </text>
      <text x={x + w / 2} y={y + h - 12} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="1.4" fill={FOREST} opacity="0.6">
        {id}
      </text>
      {active && (
        <motion.circle
          cx={x + w - 14}
          cy={y + 14}
          r="3"
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
  label: string;
  sublabel: string;
  active: boolean;
  visible: boolean;
  delay?: number;
  labelX?: number;
  labelY?: number;
  color?: "forest" | "sage" | "rust";
}

function Stream({ d, tagId, label, sublabel, active, visible, delay = 0.2, labelX, labelY, color = "forest" }: StreamProps) {
  const stroke = color === "sage" ? SAGE : color === "rust" ? RUST : FOREST;
  const marker = color === "sage" ? "url(#arrow-sage)" : color === "rust" ? "url(#arrow-rust)" : "url(#arrow)";

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? (active ? 1 : 0.45) : 0 }}
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
      <StreamTag id={tagId} path={d} delay={delay + 0.55} visible={visible} color={color} x={labelX} y={labelY} />
      <StreamLabel path={d} label={label} sublabel={sublabel} delay={delay + 0.65} visible={visible} x={labelX} y={labelY} />
    </motion.g>
  );
}

function StreamTag({
  id,
  path,
  delay,
  visible,
  color,
  x,
  y,
}: {
  id: string;
  path: string;
  delay: number;
  visible: boolean;
  color: "forest" | "sage" | "rust";
  x?: number;
  y?: number;
}) {
  const stroke = color === "sage" ? SAGE : color === "rust" ? RUST : FOREST;
  const m = path.match(/M\s*([\d.]+)\s+([\d.]+)/);
  const tx = x ?? (m ? parseFloat(m[1]) + 22 : 0);
  const ty = y ?? (m ? parseFloat(m[2]) - 12 : 0);
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, delay: visible ? delay : 0 }}
    >
      <polygon points={`${tx},${ty - 7} ${tx + 14},${ty} ${tx},${ty + 7} ${tx - 14},${ty}`} fill={PAPER} stroke={stroke} strokeWidth="1" />
      <text x={tx} y={ty + 3} textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill={stroke}>
        {id}
      </text>
    </motion.g>
  );
}

function StreamLabel({
  path,
  label,
  sublabel,
  delay,
  visible,
  x,
  y,
}: {
  path: string;
  label: string;
  sublabel: string;
  delay: number;
  visible: boolean;
  x?: number;
  y?: number;
}) {
  const matches = Array.from(path.matchAll(/([\d.]+)\s+([\d.]+)/g)).map((m) => [
    parseFloat(m[1]),
    parseFloat(m[2]),
  ]);
  const start = matches[0] ?? [0, 0];
  const end = matches[matches.length - 1] ?? [0, 0];
  const mx = x ?? (start[0] + end[0]) / 2;
  const my = y ?? Math.min(start[1], end[1]) - 8;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, delay: visible ? delay : 0 }}
    >
      <text x={mx} y={my} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={FOREST}>
        {label.toUpperCase()}
      </text>
      {sublabel && (
        <text x={mx} y={my + 11} textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1" fill={FOREST} opacity="0.6">
          {sublabel}
        </text>
      )}
    </motion.g>
  );
}

function Terminal({
  x,
  y,
  label,
  visible,
  delay = 0.2,
  variant = "forest",
  bigHeight,
  active,
}: {
  x: number;
  y: number;
  label: string;
  visible: boolean;
  delay?: number;
  variant?: "forest" | "sage" | "rust";
  bigHeight?: number;
  active?: boolean;
}) {
  const stroke = variant === "rust" ? RUST : variant === "sage" ? SAGE : FOREST;
  const h = bigHeight ?? 32;
  return (
    <motion.g
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: visible ? (active ? 1 : 0.5) : 0, x: 0 }}
      transition={{ duration: 0.5, delay: visible ? delay : 0 }}
    >
      <rect x={x} y={y - h / 2} width={108} height={h} fill={PAPER} stroke={stroke} strokeWidth="1.2" />
      <text x={x + 54} y={y + 3} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.8" fill={stroke}>
        {label}
      </text>
    </motion.g>
  );
}

function MassBalanceStamp({ visible }: { visible: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ duration: 0.65, delay: visible ? 1.1 : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "180px 480px" }}
    >
      <rect x={48} y={448} width={264} height={80} fill="none" stroke={FOREST} strokeWidth="1.5" />
      <rect x={52} y={452} width={256} height={72} fill="none" stroke={FOREST} strokeWidth="0.6" />
      <text x={180} y={474} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2.4" fill={FOREST}>
        MASS BALANCE
      </text>
      <text x={180} y={498} textAnchor="middle" fontSize="20" fontFamily="ui-serif, Georgia" fill={FOREST}>
        100 % closed
      </text>
      <text x={180} y={516} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="1.5" fill={FOREST} opacity="0.7">
        Σ outputs = Σ inputs · zero residue
      </text>
    </motion.g>
  );
}
