import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import AboutWhatIs from "@/components/sections/AboutWhatIs";
import AboutParent from "@/components/sections/AboutParent";
import AboutCredibility from "@/components/sections/AboutCredibility";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "About Alpha — Industrial waste, turned into revenue",
  description:
    "Alpha Waste Management collects industrial waste and recycles it into sellable products — recovered metals, gypsum, sodium sulphate, metal oxides, and cement-less bricks.",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="About · Chapter I"
        title="About Alpha."
        subtitle="A new waste-recycling venture that takes industrial waste from steel plants and turns it into sellable products — with nothing dumped back."
        meta={[
          { label: "Pilot today", value: "180 MT/mo" },
          { label: "Patents granted", value: "Seven" },
          { label: "PLI", value: "Approved" },
          { label: "Backed by", value: "38-yr parent" },
        ]}
      />
      <AboutWhatIs />
      <AboutParent />
      <AboutCredibility />
      <NextPageCTA
        href="/process"
        meta="Chapter II"
        title="See the process."
        body="Four patented stages turn hazardous waste into saleable output."
      />
      <PageFooter />
    </main>
  );
}
