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
import { trackDerivSignupClick } from "@/lib/gtag";

const tools = [
  {
    icon: Bot,
    title: "Practice Trading Bots",
    description: "Explore automated trading strategies to understand how algorithmic trading works.",
    features: ["Educational demos", "Learn automation concepts", "Deriv platform compatible"],
    link: "https://dbotpro.live/#freebots",
    cta: "Explore Bots",
  },
  {
    icon: BarChart3,
    title: "Analysis Tools",
    description: "Educational market analysis tools to help you understand trading concepts.",
    features: ["Technical indicators", "Chart reading tutorials", "Market education"],
    link: "https://dbotpro.live",
    cta: "Access Tools",
  },
  {
    icon: GraduationCap,
    title: "Trading Education",
    description: "Structured courses to help you understand trading fundamentals from scratch.",
    features: ["Video tutorials", "Live Q&A sessions", "Strategy explanations"],
    link: "https://youtube.com/@destinythetrader",
    cta: "Start Learning",
  },
  {
    icon: MessageCircle,
    title: "Community Support",
    description: "Join our educational trading community for learning discussions.",
    features: ["Telegram group", "WhatsApp channel", "Daily educational content"],
    link: "https://t.me/thetradinghub101",
    cta: "Join Community",
  },
  {
    icon: Video,
    title: "Educational Mentorship",
    description: "Get personalized educational guidance to develop your trading knowledge.",
    features: ["1-on-1 learning sessions", "Concept explanations", "Q&A support"],
    link: "https://wa.me/254748406098",
    cta: "Book Session",
  },
  {
    icon: Lightbulb,
    title: "Daily Market Education",
    description: "Receive educational market analysis and trading concept explanations daily.",
    features: ["Morning briefings", "Market analysis tutorials", "Risk education"],
    link: "https://whatsapp.com/channel/0029VbB35fQHrDZjhSaxOG0c",
    cta: "Get Updates",
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
            Educational Tools & <span className="text-gradient-gold">Mentorship</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resources designed to help you learn about trading on Deriv's platform.
            <br />
            <span className="text-sm">*This is an educational program, not financial advice.</span>
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
            Ready to start learning? Create your Deriv account to access the platform.
          </p>
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
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsMentorshipSection;