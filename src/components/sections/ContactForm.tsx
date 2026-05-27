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

   Backend: submissions are POSTed to Web3Forms, which forwards them as
   email to ceo@alphawastemanagement.com. The access key is locked to that
   single recipient by Web3Forms' configuration, so exposing it in the
   client bundle is safe — the worst-case abuse is someone spamming our
   own inbox, mitigated by Web3Forms' rate limiting and our honeypot field.
   Rotate via https://web3forms.com if needed.
-------------------------------------------------------------------------- */

const WEB3FORMS_ACCESS_KEY = "c68c3221-53a2-4aa1-9d26-9e86a89ffb05";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams?.get("topic") ?? "";
  const [interested, setInterested] = useState<string>(initialTopic);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("access_key", WEB3FORMS_ACCESS_KEY);
    data.set(
      "subject",
      `Alpha enquiry — ${selectedLabel ?? "General"}`
    );
    const visitorName = data.get("name");
    if (visitorName) data.set("from_name", String(visitorName));
    // Web3Forms honeypot — must be empty. If a bot fills it, the submission
    // is silently dropped server-side.
    if (!data.has("botcheck")) data.set("botcheck", "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
        setInterested("");
      } else {
        setStatus("error");
        setErrorMsg(
          result.message ?? "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and retry.");
    }
  }

  return (
    <Reveal direction="up">
      <form
        onSubmit={handleSubmit}
        className="mt-10 mx-auto max-w-4xl rounded-3xl border border-line bg-ivory p-6 sm:p-10"
      >
        {/* Honeypot: invisible to humans, bots tend to fill every field. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: "none" }}
          aria-hidden="true"
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your name" id="c-name" name="name" placeholder="Full name" required />
          <Field label="Organisation" id="c-org" name="organisation" placeholder="Company / institution" />
          <Field label="Email" id="c-email" name="email" type="email" placeholder="you@company.com" required />
          <Field label="Phone (optional)" id="c-phone" name="phone" placeholder="+91 ..." />
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
              name="interested_in"
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
            name="message"
            rows={5}
            placeholder="A few lines is enough."
            className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors resize-none"
          />
        </div>

        {status === "success" && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-fern/40 bg-fern/10 px-4 py-3 text-sm text-forest"
          >
            Thank you. Your enquiry has been sent — we&apos;ll be in touch shortly.
          </div>
        )}
        {status === "error" && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust"
          >
            {errorMsg || "Something went wrong. Please try again."}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted max-w-sm">
            By submitting, you consent to Alpha contacting you about your
            enquiry. We don&apos;t share contact details.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group relative inline-flex items-center justify-between sm:justify-center gap-2 rounded-full bg-forest text-paper px-6 py-3.5 text-sm font-medium overflow-hidden w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {status === "submitting"
                ? "Sending…"
                : selectedLabel
                  ? `Send · ${selectedLabel.split(" ")[0]}`
                  : "Send enquiry"}
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
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  id: string;
  name: string;
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
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-line bg-paper/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-forest focus:bg-ivory transition-colors"
      />
    </div>
  );
}
