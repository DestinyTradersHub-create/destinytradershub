import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

const SIGNUP_URL = "https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942";

const faqs = [
  {
    question: "What is Deriv and how does it work?",
    answer: "Deriv is a leading online trading platform offering access to forex, cryptocurrencies, commodities, stocks, and synthetic indices. With over 2 million traders worldwide, Deriv provides a secure, regulated environment for trading CFDs, options, and multipliers. You can start with as little as $5 and access free demo accounts to practice.",
  },
  {
    question: "Is it safe to trade on Deriv?",
    answer: "Yes, Deriv is a trusted broker regulated by multiple financial authorities including the Malta Financial Services Authority (MFSA), Labuan Financial Services Authority, and the Vanuatu Financial Services Commission. Your funds are kept in segregated accounts for maximum security.",
  },
  {
    question: "What markets can I trade on Deriv?",
    answer: "Deriv offers 100+ markets including Forex (major, minor, exotic pairs), Cryptocurrencies (BTC, ETH, and 50+ coins), Commodities (Gold, Silver, Oil), Stock Indices (US500, UK100), and unique Synthetic Indices available 24/7 with no market hours restrictions.",
  },
  {
    question: "What is the minimum deposit to start trading?",
    answer: "You can start trading on Deriv with as little as $5. Multiple deposit methods are available including credit/debit cards, bank transfers, e-wallets, and cryptocurrencies. Deposits are usually instant, and there are no deposit fees.",
  },
  {
    question: "Are the trading bots really free?",
    answer: "Yes! We provide completely free trading bots that work on the Deriv platform. These bots are pre-configured with proven strategies for synthetic indices and forex pairs. No coding skills required - just download, configure your risk settings, and deploy.",
  },
  {
    question: "How do I get started with trading?",
    answer: "Getting started is easy: 1) Create your free Deriv account (takes 2 minutes), 2) Verify your email and complete basic KYC, 3) Fund your account with a minimum of $5, 4) Start trading on demo or live account. We also provide free mentorship and trading tools to help you succeed.",
  },
  {
    question: "What support do you offer for beginners?",
    answer: "We offer comprehensive support including: Free trading bots and analysis tools, Video tutorials on YouTube, Live mentorship sessions, 24/7 Telegram and WhatsApp community access, Daily trading signals and market analysis, and One-on-one coaching for serious traders.",
  },
  {
    question: "Can I trade on mobile?",
    answer: "Yes! Deriv offers mobile apps for both iOS and Android devices. You can also trade directly from any mobile browser. All features including deposits, withdrawals, and trading are fully accessible on mobile devices.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about trading with Deriv and our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-border/30 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  <p className="mb-4">{faq.answer}</p>
                  <Button variant="link" asChild className="p-0 h-auto text-primary">
                    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                      Start Here <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? Join our community for instant support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://t.me/thetradinghub101" target="_blank" rel="noopener noreferrer">
                Ask in Telegram
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
