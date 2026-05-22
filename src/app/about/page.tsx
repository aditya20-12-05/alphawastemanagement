import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import AboutWhatIs from "@/components/sections/AboutWhatIs";
import AboutParent from "@/components/sections/AboutParent";
import AboutCredibility from "@/components/sections/AboutCredibility";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "About Alpha · Industry waste turned into revenue",
  description:
    "Alpha Waste Management valorizes industrial steel waste into sellable products: recovered metals, gypsum, sodium sulphate, metal oxides, and cement-less bricks. We don't recycle our slag, we valorize it.",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="About · Chapter I"
        title="About Alpha."
        subtitle={
          <>
            We don&apos;t recycle our slag.{" "}
            <span className="text-forest italic">We valorize it into saleable oxides.</span>
          </>
        }
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
