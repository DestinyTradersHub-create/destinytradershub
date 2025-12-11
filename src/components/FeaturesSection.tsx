import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, LineChart, GraduationCap, Calendar, Rocket } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Free Trading Bots",
    description: "Access automated trading bots designed for consistent profits on Deriv.",
  },
  {
    icon: LineChart,
    title: "Free Analysis Tools",
    description: "Get professional-grade market analysis tools at no cost.",
  },
  {
    icon: GraduationCap,
    title: "Expert Mentorship",
    description: "Learn from experienced traders with proven track records.",
  },
  {
    icon: Calendar,
    title: "Weekly Trading Tips",
    description: "Receive exclusive market insights and trading strategies weekly.",
  },
  {
    icon: Rocket,
    title: "Fast Onboarding",
    description: "Start trading in minutes with our streamlined setup process.",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What You <span className="text-gradient-gold">Get</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to start your profitable trading journey with Deriv
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-6 md:p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
