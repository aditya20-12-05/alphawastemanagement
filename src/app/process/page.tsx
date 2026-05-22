import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import ProcessProblem from "@/components/sections/ProcessProblem";
import ProcessStages from "@/components/sections/ProcessStages";
import ProcessPilot from "@/components/sections/ProcessPilot";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "The Process — Alpha Waste Management",
  description:
    "Four patented stages turning industrial waste into saleable output: metal segregation, metal recovery, hydrometallurgy, and cement-less brick manufacturing. 100% mass balance.",
};

export default function ProcessPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Process · Chapter II"
        title="How we recycle."
        subtitle="Four patented stages convert industrial steel waste into saleable output. Nothing is dumped back."
        meta={[
          { label: "Stages", value: "Four" },
          { label: "Mass balance", value: "100%" },
          { label: "Pilot throughput", value: "≈ 180 MT/mo" },
          { label: "Residue", value: "Zero" },
        ]}
      />
      <ProcessProblem />
      <ProcessStages />
      <ProcessPilot />
      <NextPageCTA
        href="/products"
        meta="Chapter III"
        title="The Products"
        body="Five output streams — recovered metals, gypsum, sodium sulphate, metal-oxide powders, and cement-less bricks."
      />
      <PageFooter />
    </main>
  );
}
