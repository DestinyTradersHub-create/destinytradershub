import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Globe, TrendingUp, BookOpen } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 1900,
    suffix: "+",
    label: "Students Enrolled",
    color: "text-primary",
  },
  {
    icon: Globe,
    value: 22,
    suffix: "+",
    label: "Countries Reached",
    color: "text-emerald",
  },
  {
    icon: TrendingUp,
    value: 96,
    suffix: "+",
    label: "Course Completions",
    color: "text-primary",
  },
  {
    icon: BookOpen,
    value: 50,
    suffix: "+",
    label: "Educational Resources",
    color: "text-emerald",
  },
];

const AnimatedCounter = ({
  value,
  suffix = "",
  inView,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 text-center hover:border-primary/30 transition-colors"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`text-3xl md:text-4xl font-display font-bold mb-2 ${stat.color}`}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
