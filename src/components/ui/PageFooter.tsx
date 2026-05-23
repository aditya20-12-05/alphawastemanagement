"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "The Site",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Products", href: "/products" },
      { label: "Partner", href: "/partner" },
    ],
  },
  {
    title: "Engagement",
    links: [
      { label: "Operations partnership", href: "/partner#operations" },
      { label: "Investment", href: "/partner#investment" },
      { label: "Licensing", href: "/partner#licensing" },
      { label: "Collaboration", href: "/partner#collaboration" },
    ],
  },
  {
    title: "Parent",
    links: [
      { label: "Mangalam Alloys Ltd.", href: "/about" },
      { label: "DSIR R&D centre", href: "/about" },
      { label: "Ahmedabad, Gujarat", href: "/about" },
    ],
  },
];

export default function PageFooter() {
  return (
    <footer className="relative bg-forest text-paper overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 pt-24 pb-12">
        <div className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tight text-fern">
          Zero residue.
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-12 pb-12 border-b border-paper/10">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8 text-fern" />
              <span className="flex flex-col items-center leading-none">
                <span className="font-display text-xl text-paper">Alpha</span>
                <span className="mt-1 text-[9px] font-sans font-medium uppercase tracking-[0.22em] text-fern/80">
                  Waste Management
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm text-paper/65 max-w-sm leading-relaxed">
              A waste-valorization venture of Mangalam Alloys Ltd. Patented technology operating today, now scaling to industrial throughput.
              Government of India PLI approval secured for commercial scale-up.
            </p>

            <div className="mt-7 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-forest">
              <span className="h-2 w-2 rounded-full bg-fern animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-fern/90">
                PLI approved · pilot live
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            {columns.map((c) => (
              <div key={c.title}>
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-fern/70">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-paper/80 hover:text-fern transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-paper/60">
          <div className="font-mono uppercase tracking-[0.22em]">
            © {new Date().getFullYear()} Alpha Waste Management · A Mangalam Alloys Ltd. Venture
          </div>
          <div className="flex gap-5 font-mono uppercase tracking-[0.22em]">
            <Link href="/" className="hover:text-fern transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-fern transition-colors">Terms</Link>
            <Link href="/partner" className="hover:text-fern transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
