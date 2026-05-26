import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageFooter from "@/components/ui/PageFooter";
import EngagementSection from "@/components/sections/EngagementSection";
import NextPageCTA from "@/components/ui/NextPageCTA";
import { services } from "@/components/sections/engagement-data";

export const metadata: Metadata = {
  title: "Services for waste producers · Alpha Waste Management",
  description:
    "Three ways Alpha works with steel and stainless-steel producers: on-site processing (Alpha installs a line at your plant), collection (you send waste to our hub), and sustainability advisory with R&D trials.",
};

export default function ServicesPage() {
  return (
    <main className="relative">
      <PageHero
        fillViewport
        eyebrow="Services"
        title="Services for waste producers."
        subtitle="Three ways to hand the problem to Alpha. Choose the model that fits your facility, regulation, and ESG goals."
      />
      <EngagementSection
        sectionNumber="§ 01"
        sectionLabel="What we offer"
        leadHeading="Three services."
        intro="Each service shares the same operational core. They differ in where the processing happens, who funds the equipment, and how the producer's reporting story is structured."
        data={services}
      />
      <NextPageCTA
        href="/partnerships"
        meta="Partnerships"
        title="Partner with us."
        body="Three ways to engage on capital, technology, and cross-border R&D."
      />
      <PageFooter />
    </main>
  );
}
