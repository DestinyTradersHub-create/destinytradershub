import { lazy, Suspense } from "react";
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

// Lazy load heavy components to reduce main thread work
const LiveMarketSection = lazy(() => import("@/components/LiveMarketSection"));

const LiveMarketFallback = () => (
  <section className="py-10 md:py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 md:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 md:mb-6">
          <div className="w-4 h-4 bg-accent/50 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Loading Market Data...</span>
        </div>
        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          Live <span className="text-gradient-gold">Market Prices</span>
        </h2>
      </div>
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mb-6 md:mb-12">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="glass-card p-3 md:p-4 animate-pulse min-w-[140px] md:min-w-0 flex-shrink-0">
            <div className="h-5 md:h-6 bg-secondary rounded mb-2" />
            <div className="h-6 md:h-8 bg-secondary rounded mb-2" />
            <div className="h-4 bg-secondary rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MarketTicker />
        <StatsSection />
        <TradingAssetsSection />
        <Suspense fallback={<LiveMarketFallback />}>
          <LiveMarketSection />
        </Suspense>
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
