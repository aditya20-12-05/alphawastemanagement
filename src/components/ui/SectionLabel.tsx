"use client";

import { motion } from "motion/react";

interface Props {
  number: string;
  title: string;
  className?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
  /**
   * When true, the title is rendered on its own line as a real display
   * heading rather than as a small mono eyebrow chip. Use this on
   * information cards where the title is the conceptual anchor of the
   * box (e.g. "What Alpha is", "Why the name").
   */
  prominent?: boolean;
}

export function SectionLabel({
  number,
  title,
  className,
  variant = "light",
  align = "center",
  prominent = false,
}: Props) {
  const numberColor = variant === "dark" ? "text-fern" : "text-sage";
  const lineColor = variant === "dark" ? "bg-paper/30" : "bg-line";
  const titleColor = variant === "dark" ? "text-paper/60" : "text-muted";
  const promTitleColor = variant === "dark" ? "text-paper" : "text-ink";

  // Prominent mode: small chapter chip on top, big display title below.
  if (prominent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`${align === "center" ? "text-center" : "text-left"} ${className ?? ""}`}
      >
        <div
          className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] font-mono ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className={numberColor}>{number}</span>
          <span className={`h-px w-12 ${lineColor}`} />
        </div>
        <h2
          className={`mt-3 font-display text-[clamp(1.5rem,2.6vw,2.05rem)] leading-[1.15] tracking-tight ${promTitleColor}`}
        >
          {title}
        </h2>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-mono ${
        align === "center" ? "justify-center" : ""
      } ${className ?? ""}`}
    >
      <span className={numberColor}>{number}</span>
      <span className={`h-px w-10 ${lineColor}`} />
      <span className={titleColor}>{title}</span>
    </motion.div>
  );
}
