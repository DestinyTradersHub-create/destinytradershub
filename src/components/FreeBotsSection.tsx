import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Shield, ArrowRight } from "lucide-react";

const FreeBotsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="freebots" className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/20 mb-8 animate-float"
            >
              <Bot className="w-10 h-10 text-primary" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Get <span className="text-gradient-gold">Free</span> Deriv Trading Bots
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Access our collection of proven, profit-generating trading bots designed specifically for Deriv. Start automating your trades today!
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {[
                { icon: Zap, text: "Instant Access" },
                { icon: Shield, text: "Tested & Proven" },
                { icon: Bot, text: "Auto Trading" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-secondary/60 border border-border/50"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                variant="hero"
                size="xl"
                asChild
                className="px-12"
              >
                <a
                  href="https://dbotpro.live/#freebots"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Free Trading Bots
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeBotsSection;
