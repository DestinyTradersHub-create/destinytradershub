import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Handshake, Send } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { trackDerivSignupClick } from "@/lib/gtag";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image - using img for better LCP */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      </div>

      {/* Animated Particles - CSS-only for better performance */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="particles-container" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Partnership Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-accent/30"
          >
            <Handshake className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              In Partnership with Deriv
            </span>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 ml-2"
          >
            <Shield className="w-4 h-4 text-emerald" />
            <span className="text-sm font-medium text-muted-foreground">
              Educational Platform for 1,900+ Students
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Trade CFDs, Forex, Options,</span>
            <br />
            <span className="text-gradient-gold">Crypto & More on Deriv</span>
          </motion.h1>
          

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Learn to navigate 100+ global markets including Forex, Cryptocurrencies, Commodities, 
            Stocks & Synthetic Indices. Access educational resources, practice tools & community mentorship.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <Button variant="hero" size="xl" className="w-full sm:w-auto" asChild>
              <a
                href="https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
                onClick={trackDerivSignupClick}
              >
                Create Free Trading Account
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>
            </Button>

            <Button variant="telegram" size="xl" asChild className="w-full sm:w-auto">
              <a href="https://t.me/thetradinghub101" target="_blank" rel="noopener noreferrer">
                <Send className="w-5 h-5 mr-1" />
                Join Our Trading Community
              </a>
            </Button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <Button variant="heroSecondary" size="lg" asChild>
              <a href="https://dbotpro.live" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                Trade Now With Free Tools
              </a>
            </Button>
          </motion.div>

          {/* Markets Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {["Forex", "Crypto", "Commodities", "Stocks", "Synthetic Indices", "CFDs", "Options"].map((market) => (
              <div
                key={market}
                className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border/30 text-sm text-muted-foreground"
              >
                {market}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
