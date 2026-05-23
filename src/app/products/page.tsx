import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "Output Streams. Alpha Waste Management",
  description:
    "Five output streams from Alpha's recycling process: recovered metals, gypsum, sodium sulphate, metal-oxide powders, and patented cement-less bricks.",
};

export default function ProductsPage() {
  return (
    <main className="relative">
      <PageHero
        fillViewport
        eyebrow="Products"
        title="What we produce."
        subtitle="Five output streams come out of the process. Every one of them has an existing industrial market."
        meta={[
          { label: "Used in", value: "Agriculture" },
          { label: "Used in", value: "Construction" },
          { label: "Used in", value: "Ceramic industry" },
          { label: "Used in", value: "Metal industry" },
        ]}
      />
      <ProductsShowcase />
      <NextPageCTA
        href="/partner"
        meta="Partner"
        title="Partner with us."
        body="Four ways to engage: operations partnership, investment, licensing, and collaboration."
      />
      <PageFooter />
    </main>
  );
}
