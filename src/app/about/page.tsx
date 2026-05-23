import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import AboutSubheading from "@/components/sections/AboutSubheading";
import AboutWhatIs from "@/components/sections/AboutWhatIs";
import AboutAlphaName from "@/components/sections/AboutAlphaName";
import AboutParent from "@/components/sections/AboutParent";
import AboutCredibility from "@/components/sections/AboutCredibility";
import AboutMarket from "@/components/sections/AboutMarket";
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
        eyebrow="About"
        title="About Alpha."
        subtitle={<AboutSubheading />}
      />

      {/* Two-column block grid */}
      <section className="relative py-14 sm:py-20">
        <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 grid lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          <AboutWhatIs />
          <AboutAlphaName />
          <AboutParent />
          <AboutCredibility />
          <AboutMarket />
        </div>
      </section>

      <NextPageCTA
        href="/process"
        meta="Process"
        title="See the process."
        body="Patented stages turn hazardous waste into saleable output."
      />
      <PageFooter />
    </main>
  );
}
