import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import AboutMangalam from "@/components/sections/AboutMangalam";
import AboutResearch from "@/components/sections/AboutResearch";
import AboutPatents from "@/components/sections/AboutPatents";
import AboutCredentials from "@/components/sections/AboutCredentials";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "About Alpha — Mangalam Alloys, R&D and patents",
  description:
    "Alpha Waste Management is a venture of Mangalam Alloys Ltd. A 38-year operation, a DSIR-recognised research centre, three decades of waste-management work, and a portfolio of granted patents.",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="About · Chapter I"
        title={
          <>
            A venture grounded in <span className="text-forest italic">three decades</span> of work on industrial waste.
          </>
        }
        intro={
          <p>
            Alpha Waste Management is the commercial expression of a long-running, government-recognised research
            programme. The credibility behind the venture is the parent company, the R&amp;D centre, and the patents.
          </p>
        }
        meta={[
          { label: "Parent", value: "Mangalam Alloys" },
          { label: "Operating since", value: "1988" },
          { label: "R&D recognition", value: "DSIR · 2016" },
          { label: "Granted patents", value: "Seven" },
        ]}
      />
      <AboutMangalam />
      <AboutResearch />
      <AboutPatents />
      <AboutCredentials />
      <NextPageCTA
        href="/process"
        meta="Chapter II"
        title="The Process"
        body="How patented stages convert hazardous waste into saleable output."
      />
      <PageFooter />
    </main>
  );
}
