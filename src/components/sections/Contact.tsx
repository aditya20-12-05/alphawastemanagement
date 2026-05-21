"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const intents = [
  { id: "mou", label: "Sign an MOU", note: "We handle your plant's waste year-round." },
  { id: "onsite", label: "On-site co-processing", note: "We run the line on your premises." },
  { id: "invest", label: "Invest", note: "Fund the commercial scale-up." },
  { id: "license", label: "License the technology", note: "Run your own — we retain equity." },
  { id: "synergy", label: "International synergy", note: "Two-way tech exchange." },
];

export default function Contact() {
  const [intent, setIntent] = useState<string>("mou");

  return (
    <section id="contact" className="relative py-32 sm:py-40 bg-mist overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="09" title="Get in touch" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-8" direction="up">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tight">
              Let&apos;s build the zero-residue
              <span className="block italic text-forest">industrial economy.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Pick the engagement that fits. We&apos;ll come back with a structured next step
              within two working days.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks — this is a placeholder form. We'll wire up a real backend later.");
            }}
            className="grid lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted">
                I&apos;m here to…
              </div>
              <div className="flex flex-col gap-2">
                {intents.map((it) => {
                  const active = intent === it.id;
                  return (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => setIntent(it.id)}
                      className={`group relative text-left rounded-2xl border px-5 py-4 transition-all overflow-hidden ${
                        active
                          ? "border-forest bg-forest text-bg"
                          : "border-line bg-surface hover:border-industrial"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className={`font-display text-lg ${active ? "text-bg" : "text-ink"}`}>
                            {it.label}
                          </div>
                          <div className={`text-xs mt-0.5 ${active ? "text-lime" : "text-muted"}`}>
                            {it.note}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: active ? 0 : -45, opacity: active ? 1 : 0.5 }}
                          transition={{ duration: 0.3 }}
                          className={active ? "text-lime" : "text-muted"}
                        >
                          →
                        </motion.div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-line bg-surface p-7 sm:p-9">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name" id="name" placeholder="Full name" />
                <Field label="Organisation" id="org" placeholder="Company / institution" />
                <Field label="Email" id="email" type="email" placeholder="you@company.com" />
                <Field label="Phone (optional)" id="phone" placeholder="+91 ..." />
              </div>
              <div className="mt-5">
                <label htmlFor="msg" className="text-xs font-mono uppercase tracking-[0.18em] text-muted">
                  Tell us about your waste streams / partnership idea
                </label>
                <textarea
                  id="msg"
                  rows={5}
                  placeholder="A few lines is enough — type of plant, volumes, what you'd like from a partnership."
                  className="mt-2 w-full rounded-2xl border border-line bg-mist/40 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-surface transition-colors resize-none"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted max-w-sm">
                  By submitting, you consent to Alpha contacting you about your enquiry.
                  We don&apos;t share contact details.
                </p>
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-forest text-bg px-6 py-3.5 font-medium overflow-hidden"
                >
                  <span className="relative z-10">Send enquiry</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                  <span className="absolute inset-0 bg-industrial translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-[0.18em] text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-mist/40 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-surface transition-colors"
      />
    </div>
  );
}
