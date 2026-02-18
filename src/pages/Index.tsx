import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarketTicker from "@/components/MarketTicker";

// Lazy load below-the-fold sections
const StatsSection = lazy(() => import("@/components/StatsSection"));
const TradingAssetsSection = lazy(() => import("@/components/TradingAssetsSection"));
const GetStartedSection = lazy(() => import("@/components/GetStartedSection"));
const ToolsMentorshipSection = lazy(() => import("@/components/ToolsMentorshipSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const PartnershipSection = lazy(() => import("@/components/PartnershipSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MarketTicker />
        <Suspense fallback={<SectionFallback />}>
          <StatsSection />
          <TradingAssetsSection />
          <GetStartedSection />
          <ToolsMentorshipSection />
          <TestimonialsSection />
          <FAQSection />
          <PartnershipSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
