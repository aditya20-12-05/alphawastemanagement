"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const stages = [
  {
    id: 1,
    chip: "Segregate",
    title: "Metal segregation",
    short: "Sort the incoming waste.",
    body:
      "Incoming waste is sorted. Fine metal particles are separated out and re-used directly as raw material, sent straight back to the melting shop.",
    output: "Reusable metal fines",
    color: "#0E2F23",
  },
  {
    id: 2,
    chip: "Recover",
    title: "Metal recovery",
    short: "Extract metal from dust.",
    body:
      "What remains is largely a metallic dust, a mix of oxides and metal. A dedicated process separates the oxides and recovers the metal.",
    output: "Recovered metal + oxides",
    color: "#1F3A2E",
  },
  {
    id: 3,
    chip: "Hydromet",
    title: "Hydrometallurgy",
    short: "Chemistry extracts value.",
    body:
      "A chemical route extracts valuable elements and separates them into distinct outputs: gypsum, sodium sulphate, and metal oxides such as iron, chromium and nickel oxide.",
    output: "Gypsum · Na₂SO₄ · metal oxides",
    color: "#2F4E3E",
  },
  {
    id: 4,
    chip: "Bricks",
    title: "Brick manufacturing",
    short: "Residue becomes structure.",
    body:
      "The remaining fine metal dust is turned into cement-less bricks, with metal waste replacing cement. Patented. Compressive strength 19–20 kg/sq mm, vs ~8.5 for conventional fly-ash bricks.",
    output: "Cement-less bricks",
    color: "#4A7C4E",
  },
];

export default function ProcessStages() {
  /* The <section> must NOT have overflow-hidden — that breaks `position: sticky`
     on descendants. overflow-hidden is scoped to the inner sticky pane only. */
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    /* We don't use scroll-event listeners or framer-motion's useScroll —
       both fail under Lenis's smooth-scroll model (lenis.scrollTo({immediate})
       doesn't dispatch window scroll events, and ScrollTimeline-based hooks
       don't trigger either). A continuous rAF loop reading getBoundingClientRect
       is cheap and correct regardless of how scrolling happens. A 250ms
       setInterval is a backstop for environments where rAF is throttled. */
    let raf = 0;
    let lastIdx = -1;
    let lastPct = -1;

    const tick = () => {
      const el = sectionRef.current;
      if (!el) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      raf = requestAnimationFrame(tick);
      if (rect.bottom < 0 || rect.top > winH) return;
      const total = rect.height - winH;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      if (Math.abs(p - lastPct) > 0.003) {
        lastPct = p;
        setProgressPct(p);
      }
      const idx = Math.min(stages.length - 1, Math.max(0, Math.floor(p * stages.length)));
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
      }
    };

    raf = requestAnimationFrame(tick);
    const interval = setInterval(tick, 250);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  return (
    // 380vh = ~95vh per stage.
    <section ref={sectionRef} className="relative" style={{ height: "380vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-forest text-paper">
        <BackgroundDetail />

        <div className="relative h-full flex flex-col px-6 sm:px-8">
          {/* Header pinned through the whole experience */}
          <div className="pt-24 sm:pt-28 pb-2 max-w-3xl mx-auto w-full text-center">
            <SectionLabel number="§ 02" title="The Four Stages" variant="dark" />
            <h2 className="mt-5 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] tracking-tight">
              Four stages, one closed loop.
            </h2>
            <p className="mt-4 text-sm text-paper/75 leading-relaxed mx-auto max-w-xl">
              Four sequential stages convert incoming waste into saleable output.
              The brick step is patented; recovery and hydromet are protected by
              additional filings.
            </p>
          </div>

          <div className="flex-1 max-w-7xl mx-auto w-full flex items-center">
            <div className="grid lg:grid-cols-12 gap-10 items-center w-full">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/70">
                  Stage {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="mt-3 font-display text-3xl sm:text-5xl tracking-tight leading-[1.05]">
                      {stages[active].title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-fern italic">{stages[active].short}</p>
                    <p className="mt-4 text-sm sm:text-base text-paper/80 leading-relaxed max-w-lg">
                      {stages[active].body}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-full glass-forest">
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-fern/85">
                        Output →
                      </span>
                      <span className="text-sm text-paper">{stages[active].output}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <StageVisual active={active} />
              </div>
            </div>
          </div>

          {/* Progress strip */}
          <div className="max-w-7xl mx-auto w-full pb-12 sm:pb-14">
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-paper/15" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-fern transition-[width] duration-200 ease-out"
                style={{ width: `${progressPct * 100}%` }}
              />
              <div className="relative grid grid-cols-4 gap-2">
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const el = sectionRef.current;
                      if (!el) return;
                      const sectionTop = el.offsetTop;
                      const sectionHeight = el.offsetHeight;
                      const winH = window.innerHeight;
                      const stageProgress = (i + 0.5) / stages.length;
                      const target = sectionTop + stageProgress * (sectionHeight - winH);
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`relative h-3 w-3 rounded-full border-2 transition-all duration-500 ${
                        i <= active ? "bg-fern border-fern scale-110" : "bg-forest border-paper/30"
                      }`}
                    >
                      <span
                        className={`absolute inset-0 rounded-full bg-fern/40 transition-transform duration-500 ${
                          i === active ? "scale-[2.5]" : "scale-0"
                        }`}
                      />
                    </div>
                    <span
                      className={`mt-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] transition-colors ${
                        i === active ? "text-fern" : "text-paper/50"
                      }`}
                    >
                      0{s.id} · {s.chip}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-5 text-center text-[10px] font-mono uppercase tracking-[0.22em] text-paper/50">
              Scroll to advance · click a stage to jump
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundDetail() {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" preserveAspectRatio="none">
        <defs>
          <pattern id="proc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={"#F5F1E8"} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proc-grid)" />
      </svg>
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
    </>
  );
}

function StageVisual({ active }: { active: number }) {
  return (
    <div className="relative aspect-square max-w-[440px] mx-auto">
      <div className="absolute inset-0 rounded-full border border-paper/15" />
      <div className="absolute inset-8 rounded-full border border-paper/10" />
      <div className="absolute inset-16 rounded-full border border-paper/10" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {stages.map((s, i) => {
          const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 44;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <motion.div
              key={s.id}
              animate={{ scale: i === active ? 1.15 : 0.9, opacity: i === active ? 1 : 0.4 }}
              transition={{ duration: 0.5 }}
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              className="absolute"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl glass-forest grid place-items-center"
              >
                <div className="text-center">
                  <div className="font-display text-2xl sm:text-3xl text-fern">0{s.id}</div>
                  <div className="text-[9px] uppercase tracking-[0.18em] text-paper/70 mt-1 px-1">
                    {s.chip}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute inset-0 grid place-items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full grid place-items-center"
              style={{
                background: `radial-gradient(circle, ${stages[active].color}cc 0%, ${stages[active].color}22 60%, transparent 80%)`,
              }}
            >
              <div>
                <div className="font-display text-5xl sm:text-6xl text-fern tabular-nums">
                  0{active + 1}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-paper/70 mt-1">
                  Active stage
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
