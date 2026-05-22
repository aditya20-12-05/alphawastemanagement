import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import PartnerEngagement from "@/components/sections/PartnerEngagement";

export const metadata: Metadata = {
  title: "Partner with Alpha. Engagement Models",
  description:
    "Five ways to engage with Alpha Waste Management: MOU collection, on-site co-processing, investment, licensing with retained equity, and international technology synergy.",
};

export default function PartnerPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Partner · Chapter IV"
        title="Work with us."
        subtitle="Five engagement models around one core process. Pick the one that fits your constraints."
        meta={[
          { label: "Engagement modes", value: "Five" },
          { label: "Partnership terms", value: "MOU + equity" },
          { label: "PLI status", value: "Approved" },
          { label: "Response time", value: "≤ 2 days" },
        ]}
      />
      <PartnerEngagement />
      <PageFooter />
    </main>
  );
}
