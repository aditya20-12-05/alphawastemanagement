import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import ContactForm from "@/components/sections/ContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact Alpha Waste Management",
  description:
    "Get in touch with Alpha Waste Management. One form for every kind of engagement — services for waste producers, investment, licensing, and collaboration.",
};

/* The form uses useSearchParams (to pre-fill the dropdown from ?topic=...),
   which forces client-side rendering at that boundary. We wrap it in
   Suspense so the rest of the page can prerender as static. */

export default function ContactPage() {
  return (
    <main className="relative">
      <PageHero
        fillViewport
        eyebrow="Contact"
        title="Start a conversation."
        subtitle="Tell us a little about your situation and what you're looking for. We respond with a structured next step."
      />

      <section className="relative bg-cream/60 border-t border-line py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 grain opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel number="§ 01" title="Get in touch" prominent />
            <p className="mt-5 text-base sm:text-[17px] text-graphite leading-relaxed mx-auto max-w-xl">
              One form, every kind of enquiry.
            </p>
            <p className="mt-3 text-base text-graphite leading-relaxed mx-auto max-w-xl">
              Pick the engagement that fits in the dropdown below. Services
              are for waste producers; partnerships are for investors,
              international operators, and research collaborators.
            </p>
          </div>

          <Suspense fallback={<div className="mt-10 mx-auto max-w-4xl h-96 rounded-3xl border border-line bg-ivory/60" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
