// Next.sett Nail Business Website
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CustomizerSection } from '@/components/sections/CustomizerSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { HowToOrderSection } from '@/components/sections/HowToOrderSection';
import { SizingGuideSection } from '@/components/sections/SizingGuideSection';
import { PoliciesSection } from '@/components/sections/PoliciesSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CustomizerSection />
      <GallerySection />
      <HowToOrderSection />
      <SizingGuideSection />
      <PoliciesSection />
      <ContactSection />
    </div>
  );
}
