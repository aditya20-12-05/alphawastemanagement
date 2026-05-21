"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  amount?: number;
  once?: boolean;
  distance?: number;
  as?: "div" | "section" | "li" | "span" | "h2" | "p";
}

const dirMap: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "up",
  amount = 0.25,
  once = true,
  distance,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const base = dirMap[direction];
  const offset = distance ?? 40;
  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: base.x === 0 ? 0 : (base.x / 40) * offset,
        y: base.y === 0 ? 0 : (base.y / 40) * offset,
      };

  const variants: Variants = {
    hidden: initial,
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
