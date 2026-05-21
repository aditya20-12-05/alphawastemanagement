import Link from "next/link";
import Cinematic from "@/components/cinematic/Cinematic";
import PageFooter from "@/components/ui/PageFooter";
import HomeIntro from "@/components/sections/HomeIntro";
import HomeNav from "@/components/sections/HomeNav";

export default function Home() {
  return (
    <main className="relative">
      <HomeIntro />
      <Cinematic />
      <HomeNav />
      <PageFooter />
    </main>
  );
}
