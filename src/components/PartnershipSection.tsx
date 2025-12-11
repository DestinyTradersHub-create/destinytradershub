import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Handshake, DollarSign, Users, TrendingUp, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "High Commissions",
    description: "Earn competitive commissions for every trader you refer",
  },
  {
    icon: Users,
    title: "Growing Network",
    description: "Join a global community of successful affiliates",
  },
  {
    icon: TrendingUp,
    title: "Lifetime Earnings",
    description: "Earn from your referrals' trading activity forever",
  },
];

const PartnershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partnership" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-emerald/5" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Handshake className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Partnership Program</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-3xl md:text-4xl font-bold mb-6"
              >
                Join the <span className="text-gradient-gold">Deriv Partnership</span> Programme
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Turn your network into income. Partner with Deriv and earn commissions while helping others discover profitable trading opportunities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button
                  variant="hero"
                  size="xl"
                  asChild
                >
                  <a
                    href="https://partners.deriv.com/rx?sidi=2F3535CD-2836-4726-9F1E-AC6EC2C6C530&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Partnership Programme
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-secondary/50 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
