import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import ProcessProblem from "@/components/sections/ProcessProblem";
import ProcessStages from "@/components/sections/ProcessStages";
import ProcessPilot from "@/components/sections/ProcessPilot";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "The Process. Alpha Waste Management",
  description:
    "Patented stages turning industrial waste into saleable output: metal segregation, metal recovery, hydrometallurgy, and cement-less brick manufacturing. 100% mass balance.",
};

export default function ProcessPage() {
  return (
    <main className="relative">
      <PageHero
        fillViewport
        eyebrow="Process"
        title="How we do it."
        meta={[
          { label: "Research projects", value: "2 in progress" },
          { label: "Mass balance", value: "100%" },
          { label: "Pilot throughput", value: "≈ 180 tonnes/mo" },
          { label: "Residue", value: "Zero" },
        ]}
      />
      <ProcessProblem />
      <ProcessStages />
      <ProcessPilot />
      <NextPageCTA
        href="/products"
        meta="Products"
        title="The Products"
        body="Five output streams: recovered metals, gypsum, sodium sulphate, metal-oxide powders, and cement-less bricks."
      />
      <PageFooter />
    </main>
  );
}
