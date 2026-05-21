"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from "motion/react";
import { useRef, useState } from "react";

const PHASES = [
  { key: "problem", numeral: "I", title: "The waste", caption: "Stainless-steel manufacturing generates hazardous waste at every stage of production. The hardest fraction is finishing — chromium-bearing, regulated, and conventionally sent to dumping sites." },
  { key: "collection", numeral: "II", title: "The collection", caption: "Alpha collects industrial waste from steel producers under contract — removing the dumping cost, the seasonal disruption, and the regulatory exposure." },
  { key: "process", numeral: "III", title: "The process", caption: "Four patented stages: segregation, metal recovery, hydrometallurgy, and brick manufacturing. 100% mass balance — including the chromium." },
  { key: "products", numeral: "IV", title: "The recovery", caption: "Five output streams in industrial demand: recovered metals, gypsum, sodium sulphate, metal-oxide powders, and cement-less bricks. Nothing dumped back." },
];

export default function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PHASES.length - 1, Math.max(0, Math.floor(v * PHASES.length)));
    if (idx !== activePhase) setActivePhase(idx);
  });

  return (
    <section ref={ref} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

        <Stage progress={scrollYProgress} />
        <Captions activePhase={activePhase} />
        <ProgressBar activePhase={activePhase} />
      </div>
    </section>
  );
}

function ProgressBar({ activePhase }: { activePhase: number }) {
  return (
    <div className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-center gap-2 sm:gap-3">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.key}
            animate={{ opacity: i === activePhase ? 1 : 0.3, scale: i === activePhase ? 1.15 : 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-forest">
              {p.numeral}
            </div>
            {i < PHASES.length - 1 && <span className="h-px w-4 sm:w-8 bg-forest/30" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Captions({ activePhase }: { activePhase: number }) {
  const phase = PHASES[activePhase];
  return (
    <div className="absolute bottom-12 sm:bottom-20 left-0 right-0 z-30 px-6 sm:px-8">
      <div className="mx-auto max-w-3xl relative h-48 sm:h-44">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-forest">
              Chapter {phase.numeral}
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl text-ink tracking-tight">
              {phase.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-graphite leading-relaxed max-w-xl">
              {phase.caption}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-h-[78vh] max-w-[1400px] px-4"
      >
        <Ground />
        <Smokestacks progress={progress} />
        <FactorySilhouette progress={progress} />
        <WastePile progress={progress} />
        <CollectionFlow progress={progress} />
        <AlphaFacility progress={progress} />
        <ProcessChambers progress={progress} />
        <ProductOutputs progress={progress} />
      </svg>
    </div>
  );
}

function Ground() {
  return (
    <g>
      <line x1="0" y1="540" x2="1200" y2="540" stroke="#D5CFBC" strokeWidth="1" />
      <g opacity="0.5">
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1={i * 20}
            y1="540"
            x2={i * 20 + 8}
            y2="552"
            stroke="#D5CFBC"
            strokeWidth="0.6"
          />
        ))}
      </g>
    </g>
  );
}

function Smokestacks({ progress }: { progress: MotionValue<number> }) {
  // Phase 0-25%: smokestacks visible, smoke billowing
  // Phase 25%+: smokestacks fade out as we leave problem state
  const opacity = useTransform(progress, [0, 0.05, 0.22, 0.32], [1, 1, 1, 0]);
  const smokeOpacity = useTransform(progress, [0, 0.05, 0.22, 0.32], [0.4, 0.6, 0.6, 0]);

  return (
    <motion.g style={{ opacity }}>
      {/* Three smokestacks */}
      {[150, 230, 310].map((x, i) => (
        <g key={i}>
          <rect x={x} y={300} width={32} height={240} fill="#1F3A2E" />
          <rect x={x - 4} y={296} width={40} height={8} fill="#0E2F23" />
          <rect x={x + 4} y={300} width={4} height={240} fill="#0E2F23" opacity="0.4" />
        </g>
      ))}
      {/* Smoke - animated billowing */}
      <motion.g style={{ opacity: smokeOpacity }}>
        {[150, 230, 310].map((x, i) => (
          <g key={i} transform={`translate(${x + 16}, 290)`}>
            <motion.ellipse
              cx="0"
              cy="-30"
              rx="22"
              ry="14"
              fill="#6B6862"
              opacity="0.5"
              animate={{
                cy: [-30, -90, -30],
                rx: [22, 38, 22],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.6,
              }}
            />
            <motion.ellipse
              cx="0"
              cy="-50"
              rx="28"
              ry="16"
              fill="#6B6862"
              opacity="0.35"
              animate={{
                cy: [-50, -130, -50],
                rx: [28, 52, 28],
                opacity: [0.35, 0, 0.35],
              }}
              transition={{
                duration: 5 + i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1 + i * 0.7,
              }}
            />
          </g>
        ))}
      </motion.g>
    </motion.g>
  );
}

function FactorySilhouette({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05, 0.22, 0.32], [1, 1, 1, 0]);

  return (
    <motion.g style={{ opacity }}>
      {/* Industrial factory building */}
      <g>
        <polygon points="80,400 180,360 240,360 240,540 80,540" fill="#1F3A2E" />
        <polygon points="240,360 380,360 380,540 240,540" fill="#0E2F23" />
        <polygon points="380,400 420,360 460,360 460,540 380,540" fill="#1F3A2E" />

        {/* Saw-tooth roof */}
        <polygon points="180,360 200,340 220,360" fill="#0E2F23" />
        <polygon points="240,360 260,340 280,360" fill="#0E2F23" />
        <polygon points="300,360 320,340 340,360" fill="#0E2F23" />

        {/* Factory windows - grid */}
        {[120, 160, 290, 330].map((x) =>
          [440, 480, 520].map((y) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="14" height="18" fill="#F5F1E8" opacity="0.85" />
          ))
        )}
      </g>
    </motion.g>
  );
}

function WastePile({ progress }: { progress: MotionValue<number> }) {
  // Visible 0-25%, then transitions into collection (lifts up and moves right)
  const baseOpacity = useTransform(progress, [0, 0.05, 0.20, 0.28], [1, 1, 1, 0]);
  const liftY = useTransform(progress, [0.2, 0.4], [0, -60]);
  const fadeOut = useTransform(progress, [0.3, 0.45], [1, 0]);

  return (
    <motion.g style={{ opacity: baseOpacity }}>
      <motion.g style={{ y: liftY, opacity: fadeOut }}>
        {/* Waste pile - irregular cubes */}
        {wasteCubes.map((c, i) => (
          <motion.rect
            key={i}
            x={c.x}
            y={c.y}
            width={c.size}
            height={c.size}
            fill={c.dark ? "#3A3A3A" : "#6B6862"}
            stroke="#1A1A1A"
            strokeWidth="0.6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
          />
        ))}
        {/* warning chevron */}
        <g transform="translate(540, 470)">
          <polygon points="0,0 22,0 11,22" fill="#8B4A2A" />
          <text x="11" y="14" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F5F1E8" fontFamily="ui-sans-serif">!</text>
        </g>
        <text x="555" y="500" fontSize="10" fontFamily="ui-monospace, monospace" fill="#3A3A3A" letterSpacing="1.6">
          HAZARDOUS · Cr⁶⁺
        </text>
      </motion.g>
    </motion.g>
  );
}

const wasteCubes = [
  { x: 500, y: 510, size: 28, dark: true },
  { x: 530, y: 510, size: 28, dark: false },
  { x: 560, y: 510, size: 28, dark: true },
  { x: 590, y: 510, size: 28, dark: false },
  { x: 620, y: 510, size: 28, dark: true },
  { x: 515, y: 482, size: 28, dark: false },
  { x: 545, y: 482, size: 28, dark: true },
  { x: 575, y: 482, size: 28, dark: false },
  { x: 605, y: 482, size: 28, dark: true },
  { x: 530, y: 454, size: 28, dark: true },
  { x: 560, y: 454, size: 28, dark: false },
  { x: 590, y: 454, size: 28, dark: true },
  { x: 545, y: 426, size: 28, dark: false },
  { x: 575, y: 426, size: 28, dark: true },
];

function CollectionFlow({ progress }: { progress: MotionValue<number> }) {
  // Active 0.20 - 0.50 - cubes flowing right
  const opacity = useTransform(progress, [0.20, 0.28, 0.46, 0.52], [0, 1, 1, 0]);

  return (
    <motion.g style={{ opacity }}>
      {/* Flowing line */}
      <motion.line
        x1="600"
        y1="500"
        x2="850"
        y2="450"
        stroke="#0E2F23"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.5"
      />
      {/* Flowing cubes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={i}
          x="-12"
          y="-12"
          width="24"
          height="24"
          fill={i % 2 === 0 ? "#3A3A3A" : "#6B6862"}
          stroke="#1A1A1A"
          strokeWidth="0.6"
          animate={{
            x: [580, 620, 810, 850],
            y: [490, 480, 450, 440],
            rotate: [0, 90, 270, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.7,
            times: [0, 0.15, 0.85, 1],
          }}
        />
      ))}
      {/* Label */}
      <text x="700" y="430" fontSize="10" fontFamily="ui-monospace, monospace" fill="#3A3A3A" letterSpacing="1.6">
        ALPHA · COLLECTING
      </text>
    </motion.g>
  );
}

function AlphaFacility({ progress }: { progress: MotionValue<number> }) {
  // Appears from 0.20 onward, dominant 0.5+
  const opacity = useTransform(progress, [0.18, 0.30], [0, 1]);
  const scale = useTransform(progress, [0.18, 0.30, 0.5, 0.7], [0.8, 1, 1, 1]);

  return (
    <motion.g style={{ opacity }}>
      <motion.g style={{ scale, transformOrigin: "950px 470px" } as React.CSSProperties}>
        {/* Clean modern building - Alpha facility */}
        <rect x="830" y="380" width="240" height="160" fill="#0E2F23" />
        <rect x="830" y="380" width="240" height="160" fill="none" stroke="#4A7C4E" strokeWidth="1" />

        {/* Roof line */}
        <line x1="830" y1="380" x2="1070" y2="380" stroke="#4A7C4E" strokeWidth="2" />

        {/* Alpha logo on facility */}
        <g transform="translate(950, 460)">
          <circle cx="0" cy="0" r="36" stroke="#F5F1E8" strokeWidth="1.5" fill="none" />
          <path
            d="M -18 22 L -3 -14 L 5 -14 L 20 22 M -10 10 L 14 10"
            stroke="#F5F1E8"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="0" r="3" fill="#F5F1E8" />
        </g>

        {/* Facility label */}
        <text x="950" y="525" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#F5F1E8" letterSpacing="2.5">
          ALPHA · WASTE MANAGEMENT
        </text>

        {/* Small windows */}
        {[850, 1000, 1040].map((x) =>
          [400, 420].map((y) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={12} height={6} fill="#4A7C4E" opacity="0.4" />
          ))
        )}
      </motion.g>
    </motion.g>
  );
}

function ProcessChambers({ progress }: { progress: MotionValue<number> }) {
  // Active 0.45 - 0.75
  const opacity = useTransform(progress, [0.42, 0.52, 0.72, 0.80], [0, 1, 1, 0]);

  const chambers = [
    { label: "01", title: "SEGREGATE", x: 200 },
    { label: "02", title: "RECOVER", x: 410 },
    { label: "03", title: "HYDROMET", x: 620 },
    { label: "04", title: "BRICKS", x: 830 },
  ];

  return (
    <motion.g style={{ opacity }}>
      {/* Connecting pipe */}
      <line x1="180" y1="430" x2="1020" y2="430" stroke="#1F3A2E" strokeWidth="2" />

      {/* Flowing dot along pipe */}
      <motion.circle
        cx="0"
        cy="430"
        r="5"
        fill="#4A7C4E"
        animate={{ cx: [180, 1020] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {chambers.map((c, i) => (
        <motion.g
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
        >
          {/* Chamber */}
          <rect x={c.x} y={350} width={160} height={160} fill="#F5F1E8" stroke="#0E2F23" strokeWidth="1.5" />
          <rect x={c.x} y={350} width={160} height={26} fill="#0E2F23" />

          {/* Stage number */}
          <text x={c.x + 12} y={369} fontSize="11" fontFamily="ui-monospace, monospace" fill="#F5F1E8" letterSpacing="1.5">
            {c.label}
          </text>

          {/* Title */}
          <text
            x={c.x + 80}
            y={490}
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            fill="#0E2F23"
            letterSpacing="2"
          >
            {c.title}
          </text>

          {/* Animated content */}
          <motion.circle
            cx={c.x + 80}
            cy={425}
            r={20}
            fill="none"
            stroke="#4A7C4E"
            strokeWidth="1.5"
            animate={{ r: [20, 28, 20], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
          <motion.circle
            cx={c.x + 80}
            cy={425}
            r={6}
            fill="#0E2F23"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        </motion.g>
      ))}
    </motion.g>
  );
}

function ProductOutputs({ progress }: { progress: MotionValue<number> }) {
  // Active 0.72+
  const opacity = useTransform(progress, [0.7, 0.82], [0, 1]);

  const products = [
    { label: "METAL", desc: "Fe / Cr / Ni", fill: "#0E2F23", text: "#F5F1E8", x: 180 },
    { label: "GYPSUM", desc: "CaSO₄", fill: "#2F4E3E", text: "#F5F1E8", x: 340 },
    { label: "Na₂SO₄", desc: "Sodium sulphate", fill: "#4A7C4E", text: "#F5F1E8", x: 500 },
    { label: "OXIDES", desc: "Fe₂O₃ · Cr₂O₃", fill: "#6B8E5A", text: "#0E2F23", x: 660 },
    { label: "BRICKS", desc: "19–20 kg/sq mm", fill: "#8B4A2A", text: "#F5F1E8", x: 820 },
  ];

  return (
    <motion.g style={{ opacity }}>
      {products.map((p, i) => (
        <motion.g
          key={p.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
        >
          <rect x={p.x} y={370} width={130} height={130} fill={p.fill} />
          <rect x={p.x} y={370} width={130} height={130} fill="none" stroke="#0E2F23" strokeWidth="1" />
          <text x={p.x + 65} y={425} textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" fill={p.text} letterSpacing="2.5" fontWeight="700">
            {p.label}
          </text>
          <text x={p.x + 65} y={448} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill={p.text} opacity="0.75" letterSpacing="1.4">
            {p.desc}
          </text>
          {/* tiny check mark */}
          <g transform={`translate(${p.x + 105}, 384)`}>
            <circle r="8" fill={p.text} opacity="0.18" />
            <path d="M -3 0 L -1 2 L 3 -2" stroke={p.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </motion.g>
      ))}

      {/* Caption: 100% mass balance */}
      <motion.text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        x="600"
        y="350"
        textAnchor="middle"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        fill="#0E2F23"
        letterSpacing="2.5"
      >
        100% MASS BALANCE — ZERO RESIDUE
      </motion.text>
    </motion.g>
  );
}
