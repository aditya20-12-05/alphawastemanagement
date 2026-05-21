"use client";

import { Logo } from "@/components/ui/Logo";

export default function Footer() {
  const columns = [
    {
      title: "Company",
      links: [
        { label: "About", href: "#story" },
        { label: "The process", href: "#process" },
        { label: "Products", href: "#products" },
        { label: "Patents", href: "#patents" },
      ],
    },
    {
      title: "Engage",
      links: [
        { label: "Sign an MOU", href: "#contact" },
        { label: "Invest", href: "#contact" },
        { label: "License", href: "#contact" },
        { label: "Synergy", href: "#contact" },
      ],
    },
    {
      title: "Parent",
      links: [
        { label: "Mangalam Alloys Ltd.", href: "#story" },
        { label: "DSIR R&D centre", href: "#story" },
        { label: "Ahmedabad, Gujarat", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative bg-forest text-bg overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 pt-20 pb-12">
        <div className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tight gradient-text-footer">
          Zero residue.
        </div>
        <style jsx>{`
          .gradient-text-footer {
            background: linear-gradient(135deg, #A7D88B 0%, #10B981 50%, #2D5F3F 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}</style>

        <div className="mt-16 grid lg:grid-cols-12 gap-12 pb-12 border-b border-bg/10">
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8 text-lime" />
              <span className="font-display text-xl text-bg">
                Alpha
                <span className="text-lime/70 ml-1.5 text-sm font-sans font-medium uppercase tracking-[0.18em] align-middle">
                  Waste Management
                </span>
              </span>
            </a>
            <p className="mt-5 text-sm text-bg/65 max-w-sm leading-relaxed">
              A Mangalam Alloys Ltd. venture, turning industrial waste into a revenue stream — with zero residue.
              Pilot scale today. Commercial scale-up underway with Government of India PLI approval.
            </p>

            <div className="mt-7 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-dark">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-lime/90">
                PLI approved · pilot live
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            {columns.map((c) => (
              <div key={c.title}>
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-lime/70">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-bg/80 hover:text-lime transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-bg/60">
          <div className="font-mono uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} Alpha Waste Management · A Mangalam Alloys Ltd. Venture
          </div>
          <div className="flex gap-5 font-mono uppercase tracking-[0.18em]">
            <a href="#" className="hover:text-lime transition-colors">Privacy</a>
            <a href="#" className="hover:text-lime transition-colors">Terms</a>
            <a href="#contact" className="hover:text-lime transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
