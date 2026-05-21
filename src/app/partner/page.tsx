import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import PartnerModels from "@/components/sections/PartnerModels";
import PartnerOffer from "@/components/sections/PartnerOffer";
import PartnerContact from "@/components/sections/PartnerContact";

export const metadata: Metadata = {
  title: "Partner with Alpha — Engagement Models",
  description:
    "Five ways to engage with Alpha Waste Management: MOU collection, on-site co-processing, investment, licensing with retained equity, and international technology synergy.",
};

export default function PartnerPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Partner · Chapter V"
        title={
          <>
            Five ways to engage. <span className="text-forest italic">One core process.</span>
          </>
        }
        intro={
          <p>
            Alpha&apos;s core model is to collect waste metal from industry, apply its
            patented processes, and sell the resulting products. Around that core, partners
            can engage in the way that best matches their constraints — from contracted
            collection to international technology synergy.
          </p>
        }
        meta={[
          { label: "Engagement modes", value: "Five" },
          { label: "Partnership terms", value: "MOU + equity" },
          { label: "PLI status", value: "Approved" },
          { label: "Response time", value: "≤ 2 days" },
        ]}
      />
      <PartnerModels />
      <PartnerOffer />
      <PartnerContact />
      <PageFooter />
    </main>
  );
}
