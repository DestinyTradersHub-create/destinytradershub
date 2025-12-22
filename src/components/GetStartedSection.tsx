import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, CreditCard, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { trackDerivSignupClick } from "@/lib/gtag";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Free Account",
    description: "Sign up in under 2 minutes. No credit card required. Get instant access to your trading dashboard.",
    features: ["Free to register", "Email verification", "Secure platform"],
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Fund Your Account",
    description: "Deposit using your preferred method. Multiple options including cards, crypto, and local payments.",
    features: ["$5 minimum deposit", "Instant deposits", "Multiple currencies"],
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Start Trading",
    description: "Access 100+ markets with free tools, bots, and expert strategies. Trade on demo first if you prefer.",
    features: ["Demo account included", "Free trading bots", "24/7 support"],
  },
];

const GetStartedSection = () => {
  return (
    <section id="get-started" className="py-10 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
            Get Started in <span className="text-gradient-gold">3 Easy Steps</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Open your Deriv account today and start trading in minutes. It's free, fast, and secure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2 z-0" />
              )}
              
              <div className="glass-card p-5 md:p-8 relative z-10 h-full hover:border-primary/30 transition-all">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground shadow-button text-sm md:text-base">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                  <step.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 md:mb-4">{step.description}</p>
                
                <ul className="space-y-2 mb-4">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Start Now CTA for first step */}
                {index === 0 && (
                  <Button
                    asChild
                    className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-pulse"
                  >
                    <a
                      href="https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackDerivSignupClick}
                    >
                      Start Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="hero" size="xl" asChild>
            <a
              href="https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackDerivSignupClick}
            >
              Create Free Trading Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <a href="https://dbotpro.live" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Trade with free tools →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStartedSection;
