import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import PartnerEngagement from "@/components/sections/PartnerEngagement";

export const metadata: Metadata = {
  title: "Partner with Alpha. Engagement Models",
  description:
    "Four ways to engage with Alpha Waste Management: operations partnership (collection or on-site), investment, licensing, and collaboration.",
};

export default function PartnerPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Partner · Chapter IV"
        title="Work with us."
        subtitle="Four engagement models around one core process. Pick the one that fits your constraints."
        fillViewport
      />
      <PartnerEngagement />
      <PageFooter />
    </main>
  );
}
