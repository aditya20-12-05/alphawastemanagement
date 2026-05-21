import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import ProductsList from "@/components/sections/ProductsList";
import ProductsBrickFocus from "@/components/sections/ProductsBrickFocus";
import NextPageCTA from "@/components/ui/NextPageCTA";

export const metadata: Metadata = {
  title: "Output Streams — Alpha Waste Management",
  description:
    "Five output streams from Alpha's recycling process: recovered metals, gypsum, sodium sulphate, metal-oxide powders, and patented cement-less bricks.",
};

export default function ProductsPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Products · Chapter III"
        title={
          <>
            Five output streams. Each in <span className="text-forest italic">industrial demand</span>.
          </>
        }
        intro={
          <p>
            Every product from the process has a market. The principle is that no
            stream of incoming waste leaves Alpha as a residue — each becomes a
            saleable output, either re-used in steel-making or sold to its respective
            downstream market.
          </p>
        }
        meta={[
          { label: "Streams", value: "Five" },
          { label: "Brick strength", value: "19–20 kg/sq mm" },
          { label: "Fly-ash comparison", value: "≈ 2.3×" },
          { label: "Approved use", value: "Homes · blocks" },
        ]}
      />
      <ProductsList />
      <ProductsBrickFocus />
      <NextPageCTA
        href="/future"
        meta="Chapter IV"
        title="The Direction"
        body="Regional hubs across India, a nine-project R&D pipeline, and the macro context for zero-residue recycling."
      />
      <PageFooter />
    </main>
  );
}
