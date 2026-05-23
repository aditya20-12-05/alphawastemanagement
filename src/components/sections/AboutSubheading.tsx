"use client";

import { motion } from "motion/react";

/**
 * About-page hero subtitle. The "We valorize it into saleable oxides." clause
 * flows like a wave — each glyph rises and falls on a staggered delay so a
 * crest travels left-to-right across the line continuously.
 */

const WAVE_TEXT = "We valorize it into saleable oxides.";

export default function AboutSubheading() {
  return (
    <>
      We don&apos;t recycle our slag.{" "}
      <span
        className="inline-block font-display italic text-forest text-[1.18em] leading-none align-baseline"
        style={{ filter: "drop-shadow(0 6px 12px rgba(14, 47, 35, 0.18))" }}
        aria-label={WAVE_TEXT}
      >
        {Array.from(WAVE_TEXT).map((char, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
            className="inline-block"
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </span>
    </>
  );
}
