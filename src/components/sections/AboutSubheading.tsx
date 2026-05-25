"use client";

import { motion } from "motion/react";

/**
 * About-page hero subtitle. The "We valorize it into saleable oxides." clause
 * flows like a wave — each glyph rises and falls on a staggered delay so a
 * crest travels left-to-right across the line continuously.
 *
 * Implementation note: per-char `inline-block` spans will normally allow the
 * browser to break in the middle of a word. To prevent that on narrow
 * phones, we wrap each word in a `whitespace-nowrap` inline-block. The
 * browser can still break between words.
 */

const WAVE_TEXT = "We valorize it into saleable oxides.";

export default function AboutSubheading() {
  const words = WAVE_TEXT.split(" ");
  let charCursor = 0; // running index across all chars, for wave timing

  return (
    <>
      We don&apos;t recycle our slag.{" "}
      <span
        className="inline-block font-display italic text-forest text-[1.18em] leading-none align-baseline"
        style={{ filter: "drop-shadow(0 6px 12px rgba(14, 47, 35, 0.18))" }}
        aria-label={WAVE_TEXT}
      >
        {words.map((word, wIdx) => {
          const wordChars = Array.from(word);
          const wordNode = (
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char, cIdx) => {
                const delay = charCursor * 0.05;
                charCursor += 1;
                return (
                  <motion.span
                    key={cIdx}
                    aria-hidden
                    initial={{ y: 0 }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          );
          // Notionally consume a space between words so the wave crest reads
          // continuously across the line, even though the actual space is a
          // plain whitespace text node.
          charCursor += 1;
          return (
            <span key={`w-${wIdx}`}>
              {wordNode}
              {wIdx < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </>
  );
}
