import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  BarChart3, 
  GraduationCap, 
  MessageCircle, 
  Video, 
  Lightbulb,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const tools = [
  {
    icon: Bot,
    title: "Free Trading Bots",
    description: "Automated trading strategies that work 24/7. No coding required.",
    features: ["Pre-configured strategies", "Easy to deploy", "Works on Deriv"],
    link: "https://dbotpro.live/#freebots",
    cta: "Get Free Bots",
  },
  {
    icon: BarChart3,
    title: "Analysis Tools",
    description: "Professional-grade market analysis and signal indicators.",
    features: ["Technical indicators", "Market signals", "Price alerts"],
    link: "https://dbotpro.live",
    cta: "Access Tools",
  },
  {
    icon: GraduationCap,
    title: "Trading Education",
    description: "Learn to trade from scratch with our comprehensive courses.",
    features: ["Video tutorials", "Live sessions", "Strategy guides"],
    link: "https://youtube.com/@destinythetrader",
    cta: "Start Learning",
  },
  {
    icon: MessageCircle,
    title: "Community Support",
    description: "Join our active trading community for signals and discussions.",
    features: ["Telegram group", "WhatsApp channel", "Daily updates"],
    link: "https://t.me/thetradinghub101",
    cta: "Join Community",
  },
  {
    icon: Video,
    title: "Live Mentorship",
    description: "Get personalized guidance from experienced traders.",
    features: ["1-on-1 sessions", "Strategy reviews", "Account analysis"],
    link: "https://wa.me/254748406098",
    cta: "Book Session",
  },
  {
    icon: Lightbulb,
    title: "Daily Trade Ideas",
    description: "Receive actionable trade ideas and market insights daily.",
    features: ["Morning analysis", "Entry/exit levels", "Risk management"],
    link: "https://whatsapp.com/channel/0029VbB35fQHrDZjhSaxOG0c",
    cta: "Get Signals",
  },
];

const ToolsMentorshipSection = () => {
  return (
    <section id="tools" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Free Tools & <span className="text-gradient-gold">Mentorship</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to succeed in trading - from automated bots to personal mentorship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col h-full hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
              
              <ul className="space-y-2 mb-6 flex-grow">
                {tool.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" size="sm" asChild className="w-full group-hover:border-primary/50">
                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                  {tool.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Don't have a Deriv account yet?
          </p>
          <Button variant="hero" size="xl" asChild>
            <a
              href="https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
              target="_blank"
              rel="noopener noreferrer"
            >
              Create Free Trading Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsMentorshipSection;
