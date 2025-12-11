import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import FreeBotsSection from "@/components/FreeBotsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnershipSection from "@/components/PartnershipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <FreeBotsSection />
        <TestimonialsSection />
        <PartnershipSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
