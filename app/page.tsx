import { GallerySection } from "@/components/public/GallerySection";
import { HeroSection } from "@/components/public/HeroSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { SiteHeader } from "@/components/public/SiteHeader";
import { AboutSection } from "@/components/public/AboutSection";
import { ContactSection } from "@/components/public/ContactSection";
import { FooterSection } from "@/components/public/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAF7] text-[#1F2937]">
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
