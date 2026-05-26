"use client";

import Link from "next/link";

const columns = [
  {
    title: "The Site",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Products", href: "/products" },
      { label: "Services", href: "/services" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "On-site processing", href: "/services#on-site-processing" },
      { label: "Collection", href: "/services#collection" },
      { label: "Advisory & R&D", href: "/services#sustainability-advisory" },
    ],
  },
  {
    title: "Partnerships",
    links: [
      { label: "Investment", href: "/partnerships#investment" },
      { label: "Licensing", href: "/partnerships#licensing" },
      { label: "Collaboration", href: "/partnerships#collaboration" },
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
            <Link href="/" className="inline-block">
              <span className="flex flex-col items-center leading-none">
                <span className="font-display text-xl text-paper">Alpha</span>
                {/* paddingLeft compensates for the trailing letter-spacing —
                    without it the visual block sits ~0.19em left of centre. */}
                <span
                  className="mt-1.5 text-[9px] font-sans font-extrabold uppercase tracking-[0.38em] text-fern/80"
                  style={{ paddingLeft: "0.38em" }}
                >
                  Waste Management
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm text-paper/65 max-w-sm leading-relaxed">
              A waste-valorization venture of Mangalam Alloys Ltd. (MAL). Patented technology operating today, now scaling to industrial throughput.
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
            © {new Date().getFullYear()} Alpha Waste Management · A Mangalam Alloys Ltd. (MAL) Venture
          </div>
          <div className="flex gap-5 font-mono uppercase tracking-[0.22em]">
            <Link href="/" className="hover:text-fern transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-fern transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-fern transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
