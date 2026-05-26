import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import EngagementSection from "@/components/sections/EngagementSection";
import NextPageCTA from "@/components/ui/NextPageCTA";
import { partnerships } from "@/components/sections/engagement-data";

export const metadata: Metadata = {
  title: "Partnerships · Alpha Waste Management",
  description:
    "Three ways to partner with Alpha around capital, technology, and cross-border R&D: investment for Indian institutional partners, licensing for international plant operators, and collaboration with research and industry partners.",
};

export default function PartnershipsPage() {
  return (
    <main className="relative">
      <PageHero
        fillViewport
        eyebrow="Partnerships"
        title="Partner with us."
        subtitle="Three engagement models around one patented process. Pick the one that fits your geography, capital, and strategic fit."
      />
      <EngagementSection
        sectionNumber="§ 01"
        sectionLabel="Engagement modes"
        leadHeading="Three ways to partner."
        intro="Each engagement shares the same operational core. They differ in who funds the build, who runs the line, and where Alpha sits in the value chain."
        data={partnerships}
      />
      <NextPageCTA
        href="/contact"
        meta="Contact"
        title="Start a conversation."
        body="Tell us about your situation. We'll come back with a structured next step."
      />
      <PageFooter />
    </main>
  );
}
