"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface Props {
  href: string;
  meta: string;
  title: string;
  body: string;
}

export default function NextPageCTA({ href, meta, title, body }: Props) {
  return (
    <section className="relative bg-forest text-paper overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <Link href={href} className="block group">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-24 sm:py-32 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80"
            >
              Continue · {meta}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-xl text-base sm:text-lg text-paper/75 leading-relaxed"
            >
              {body}
            </motion.p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-3 rounded-full border border-fern/40 px-6 py-3.5 text-sm font-medium text-fern group-hover:bg-fern group-hover:text-forest group-hover:border-fern transition-colors"
            >
              Read chapter
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  );
}
