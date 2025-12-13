import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarketTicker from "@/components/MarketTicker";
import StatsSection from "@/components/StatsSection";
import TradingAssetsSection from "@/components/TradingAssetsSection";
import GetStartedSection from "@/components/GetStartedSection";
import ToolsMentorshipSection from "@/components/ToolsMentorshipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import PartnershipSection from "@/components/PartnershipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MarketTicker />
        <StatsSection />
        <TradingAssetsSection />
        <GetStartedSection />
        <ToolsMentorshipSection />
        <TestimonialsSection />
        <FAQSection />
        <PartnershipSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
