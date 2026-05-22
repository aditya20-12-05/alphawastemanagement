"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Products", href: "/products" },
  { label: "Partner", href: "/partner" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(245, 241, 232, 0.82)" : "rgba(245, 241, 232, 0)",
            borderColor: scrolled ? "rgba(213, 207, 188, 0.8)" : "rgba(213, 207, 188, 0)",
            paddingTop: scrolled ? 10 : 16,
            paddingBottom: scrolled ? 10 : 16,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto max-w-7xl rounded-full border px-5 sm:px-6 backdrop-blur-xl flex items-center justify-between"
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo className="h-7 w-7 text-forest transition-transform duration-700 group-hover:rotate-180" />
            <span className="font-display text-lg sm:text-xl tracking-tight">
              <span className="text-forest">Alpha</span>
              <span className="text-muted ml-1.5 text-[10px] sm:text-xs font-sans font-medium uppercase tracking-[0.18em] align-middle">
                Waste Management
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-3.5 py-1.5 text-sm transition-colors rounded-full ${
                    active ? "text-forest" : "text-graphite hover:text-forest"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-cream"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/partner"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-forest text-paper px-4 py-2 text-sm font-medium hover:bg-moss transition-colors group"
            >
              Partner with us
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden h-9 w-9 grid place-items-center rounded-full bg-forest text-paper"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
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
            className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-3xl glass-paper p-5"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-3 text-graphite hover:text-forest hover:bg-cream rounded-xl transition-colors text-base"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/partner"
                className="mt-2 px-4 py-3 rounded-xl bg-forest text-paper text-center"
              >
                Partner with us →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-50 bg-forest"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}
