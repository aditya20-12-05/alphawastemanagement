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
  { id: "synergy", label: "International synergy", note: "Two-way technology exchange." },
];

export default function PartnerContact() {
  const [intent, setIntent] = useState<string>("mou");

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionLabel number="§ 03" title="Get in touch" />

        <div className="mt-6 grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-8" direction="up">
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1] tracking-tight">
              Start a conversation.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4" direction="left" delay={0.15}>
            <p className="text-base text-graphite leading-relaxed">
              Pick the engagement that fits. We respond with a structured next step
              within two working days.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" direction="up">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you — this is a placeholder form. We'll wire up a real backend later.");
            }}
            className="grid lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
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
                          ? "border-forest bg-forest text-paper"
                          : "border-line bg-ivory hover:border-moss"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className={`font-display text-lg ${active ? "text-paper" : "text-ink"}`}>
                            {it.label}
                          </div>
                          <div className={`text-xs mt-0.5 ${active ? "text-fern" : "text-muted"}`}>
                            {it.note}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: active ? 0 : -45, opacity: active ? 1 : 0.45 }}
                          transition={{ duration: 0.3 }}
                          className={active ? "text-fern" : "text-muted"}
                        >
                          →
                        </motion.div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-line bg-ivory p-7 sm:p-9">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name" id="name" placeholder="Full name" />
                <Field label="Organisation" id="org" placeholder="Company / institution" />
                <Field label="Email" id="email" type="email" placeholder="you@company.com" />
                <Field label="Phone (optional)" id="phone" placeholder="+91 ..." />
              </div>
              <div className="mt-5">
                <label htmlFor="msg" className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                  Tell us about your waste streams or partnership idea
                </label>
                <textarea
                  id="msg"
                  rows={5}
                  placeholder="A few lines is enough — type of plant, volumes, what you'd like from a partnership."
                  className="mt-2 w-full rounded-2xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors resize-none"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted max-w-sm">
                  By submitting, you consent to Alpha contacting you about your enquiry.
                  We don&apos;t share contact details.
                </p>
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-forest text-paper px-6 py-3.5 font-medium overflow-hidden"
                >
                  <span className="relative z-10">Send enquiry</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                  <span className="absolute inset-0 bg-moss translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
      <label htmlFor={id} className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors"
      />
    </div>
  );
}
