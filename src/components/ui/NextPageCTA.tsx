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
        <div className="relative mx-auto max-w-3xl px-6 sm:px-8 py-24 sm:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/80"
          >
            Up next · {meta}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1] tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 mx-auto max-w-xl text-base sm:text-lg text-paper/75 leading-relaxed"
          >
            {body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-fern/40 px-6 py-3.5 text-sm font-medium text-fern group-hover:bg-fern group-hover:text-forest group-hover:border-fern transition-colors"
          >
            Read more
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.div>
        </div>
      </Link>
    </section>
  );
}
