"use client";

import { motion } from "motion/react";

/**
 * Subtitle phrase for the About page hero. The "We valorize it into saleable
 * oxides." clause floats with a gentle continuous bob and is rendered in
 * display serif italic to pop out from the surrounding sans-serif text.
 */
export default function AboutSubheading() {
  return (
    <>
      We don&apos;t recycle our slag.{" "}
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="inline-block font-display italic text-forest text-[1.15em] leading-none"
        style={{ filter: "drop-shadow(0 6px 12px rgba(14, 47, 35, 0.18))" }}
      >
        We valorize it into saleable oxides.
      </motion.span>
    </>
  );
}
