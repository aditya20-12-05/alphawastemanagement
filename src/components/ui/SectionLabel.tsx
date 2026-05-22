"use client";

import { motion } from "motion/react";

interface Props {
  number: string;
  title: string;
  className?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
}

export function SectionLabel({ number, title, className, variant = "light", align = "center" }: Props) {
  const numberColor = variant === "dark" ? "text-fern" : "text-sage";
  const lineColor = variant === "dark" ? "bg-paper/30" : "bg-line";
  const titleColor = variant === "dark" ? "text-paper/60" : "text-muted";

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
