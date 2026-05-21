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
        title={
          <>
            A waste-to-value platform — built for <span className="text-forest italic">regional scale</span>.
          </>
        }
        intro={
          <p>
            Alpha is a platform, not a single product. The R&amp;D pipeline extends well
            beyond steel waste, and the commercial plan deploys regional recycling hubs
            across India&apos;s producing regions. The context — waste norms tightening,
            carbon mechanisms rewarding low-carbon processing, natural aggregates
            depleting — is favourable.
          </p>
        }
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
