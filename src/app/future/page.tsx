import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import FutureMarket from "@/components/sections/FutureMarket";
import FuturePipeline from "@/components/sections/FuturePipeline";
import FutureHubs from "@/components/sections/FutureHubs";
import FutureMacro from "@/components/sections/FutureMacro";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "The Direction — Alpha Waste Management",
  description:
    "A waste-to-value platform — regional recycling hubs across India, nine R&D projects beyond steel waste, and the macro context for proven zero-residue recycling.",
};

export default function FuturePage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Future · Chapter IV"
        title="Where we're going."
        subtitle="A platform, not a single product. Regional recycling hubs across India and an R&D pipeline that extends well beyond steel waste."
        meta={[
          { label: "Phase 1 capacity", value: "2,000 MT" },
          { label: "Pipeline projects", value: "Nine" },
          { label: "India slag · 2024", value: "149 Mta" },
          { label: "Global slag", value: "1,884 Mta" },
        ]}
      />
      <FutureMarket />
      <FutureHubs />
      <FuturePipeline />
      <FutureMacro />
      <NextPageCTA
        href="/partner"
        meta="Chapter V"
        title="The Partnership"
        body="Five ways to engage — MOU collection, on-site co-processing, investment, licensing, and international technology synergy."
      />
      <PageFooter />
    </main>
  );
}
