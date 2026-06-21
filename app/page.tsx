import { HeroSection } from "@/components/public/HeroSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { SiteHeader } from "@/components/public/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAF7] text-[#1F2937]">
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
