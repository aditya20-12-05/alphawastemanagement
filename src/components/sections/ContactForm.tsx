"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { services, partnerships, findEngagement } from "./engagement-data";

/* --------------------------------------------------------------------------
   Shared contact form, mounted on /contact. The "Interested in" dropdown
   carries both services and partnerships in two <optgroup>s, so the form
   serves every visitor flow from a single URL.

   Pre-population: if the visitor arrived from a card on /services or
   /partnerships, the URL has ?topic={id}. We read it via useSearchParams
   on mount and pre-select the matching option.
-------------------------------------------------------------------------- */

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams?.get("topic") ?? "";
  const [interested, setInterested] = useState<string>(initialTopic);

  // Keep state in sync if the URL changes after mount (e.g. clicking a
  // different card on the same /contact page — unusual, but handled).
  useEffect(() => {
    const t = searchParams?.get("topic");
    if (t) setInterested(t);
  }, [searchParams]);

  const selectedLabel =
    interested === "other"
      ? "Other"
      : findEngagement(interested)?.label;

  return (
    <Reveal direction="up">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            `Thank you. Enquiry${
              selectedLabel ? ` for "${selectedLabel}"` : ""
            } received. We'll wire this up to a real backend later.`
          );
        }}
        className="mt-10 mx-auto max-w-4xl rounded-3xl border border-line bg-ivory p-6 sm:p-10"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your name" id="c-name" placeholder="Full name" required />
          <Field label="Organisation" id="c-org" placeholder="Company / institution" />
          <Field label="Email" id="c-email" type="email" placeholder="you@company.com" required />
          <Field label="Phone (optional)" id="c-phone" placeholder="+91 ..." />
        </div>

        <div className="mt-5">
          <label
            htmlFor="c-interested"
            className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted"
          >
            Interested in
          </label>
          <div className="relative mt-2">
            <select
              id="c-interested"
              value={interested}
              onChange={(e) => setInterested(e.target.value)}
              className="w-full appearance-none rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest focus:bg-ivory transition-colors cursor-pointer"
            >
              <option value="">Choose what fits…</option>
              <optgroup label="Services">
                {services.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Partnerships">
                {partnerships.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </optgroup>
              <option value="other" style={{ fontWeight: 700 }}>
                Other
              </option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              ▾
            </span>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="c-msg"
            className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted"
          >
            Brief context (waste streams, volumes, fit)
          </label>
          <textarea
            id="c-msg"
            rows={5}
            placeholder="A few lines is enough."
            className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors resize-none"
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted max-w-sm">
            By submitting, you consent to Alpha contacting you about your
            enquiry. We don&apos;t share contact details.
          </p>
          <button
            type="submit"
            className="group relative inline-flex items-center justify-between sm:justify-center gap-2 rounded-full bg-forest text-paper px-6 py-3.5 text-sm font-medium overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10">
              {selectedLabel ? `Send · ${selectedLabel.split(" ")[0]}` : "Send enquiry"}
            </span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 bg-moss translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </form>
    </Reveal>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
        {label}
        {required && <span className="ml-1 text-rust">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-line bg-paper/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors"
      />
    </div>
  );
}
