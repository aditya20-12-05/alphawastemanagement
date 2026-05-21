import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import MangalamStory from "@/components/sections/MangalamStory";
import Process from "@/components/sections/Process";
import Products from "@/components/sections/Products";
import Patents from "@/components/sections/Patents";
import BusinessModel from "@/components/sections/BusinessModel";
import Numbers from "@/components/sections/Numbers";
import Future from "@/components/sections/Future";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Problem />
      <MangalamStory />
      <Process />
      <Products />
      <Patents />
      <BusinessModel />
      <Numbers />
      <Future />
      <Contact />
      <Footer />
    </main>
  );
}
