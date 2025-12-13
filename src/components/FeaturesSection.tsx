import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, LineChart, GraduationCap, Calendar, Rocket } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Practice Trading Bots",
    description: "Explore automated trading tools to learn how algorithmic strategies work on Deriv.",
  },
  {
    icon: LineChart,
    title: "Analysis Tools",
    description: "Access educational market analysis tools to help you understand trading concepts.",
  },
  {
    icon: GraduationCap,
    title: "Educational Mentorship",
    description: "Learn trading fundamentals from our educational mentorship program.",
  },
  {
    icon: Calendar,
    title: "Weekly Learning Sessions",
    description: "Receive educational market insights and trading strategy explanations weekly.",
  },
  {
    icon: Rocket,
    title: "Beginner-Friendly Setup",
    description: "Start learning in minutes with our streamlined onboarding process.",
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
            What You'll <span className="text-gradient-gold">Learn</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Educational resources to help you understand trading on Deriv's platform
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