"use client";

import { motion } from "motion/react";

interface Props {
  number: string;
  title: string;
  className?: string;
}

export function SectionLabel({ number, title, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-mono ${className ?? ""}`}
    >
      <span className="text-emerald">{number}</span>
      <span className="h-px w-10 bg-line" />
      <span className="text-muted">{title}</span>
    </motion.div>
  );
}
