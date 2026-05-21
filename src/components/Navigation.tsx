"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Problem", href: "#problem" },
  { label: "Process", href: "#process" },
  { label: "Products", href: "#products" },
  { label: "Patents", href: "#patents" },
  { label: "Partners", href: "#partners" },
  { label: "Future", href: "#future" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    // hook used to register listener
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(250, 250, 247, 0.78)" : "rgba(250, 250, 247, 0)",
            borderColor: scrolled ? "rgba(216, 222, 212, 0.7)" : "rgba(216, 222, 212, 0)",
            paddingTop: scrolled ? 10 : 16,
            paddingBottom: scrolled ? 10 : 16,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto max-w-7xl rounded-full border px-5 sm:px-6 backdrop-blur-xl flex items-center justify-between"
        >
          <a href="#top" className="flex items-center gap-2.5 group">
            <Logo className="h-7 w-7 text-forest transition-transform duration-500 group-hover:rotate-180" />
            <span className="font-display text-lg sm:text-xl tracking-tight">
              <span className="text-forest">Alpha</span>
              <span className="text-muted ml-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.18em] align-middle">Waste</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3.5 py-1.5 text-sm text-graphite hover:text-forest transition-colors rounded-full group"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-sage scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-forest text-bg px-4 py-2 text-sm font-medium hover:bg-industrial transition-colors group"
            >
              Partner with us
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden h-9 w-9 grid place-items-center rounded-full bg-forest text-bg"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-3xl glass p-5 shadow-deep"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-graphite hover:text-forest hover:bg-sage rounded-xl transition-colors text-base"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-forest text-bg text-center"
              >
                Partner with us →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-50 bg-gradient-to-r from-forest via-emerald to-lime"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}
