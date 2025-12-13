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
    question: "What is Deriv and what trading options does it offer?",
    answer: "Deriv is an online trading platform offering access to forex, cryptocurrencies, commodities, stocks, and synthetic indices. With over 2 million users worldwide, Deriv provides a regulated environment for trading CFDs, options, and multipliers. You can start with a demo account to practice risk-free.",
  },
  {
    question: "Is Deriv a regulated trading platform?",
    answer: "Yes, Deriv is regulated by multiple financial authorities including the Malta Financial Services Authority (MFSA), Labuan Financial Services Authority, and the Vanuatu Financial Services Commission. This provides regulatory oversight for traders using the platform.",
  },
  {
    question: "What markets can I access on Deriv?",
    answer: "Deriv offers 100+ markets including Forex (major, minor, exotic pairs), Cryptocurrencies (BTC, ETH, and more), Commodities (Gold, Silver, Oil), Stock Indices (US500, UK100), and unique Synthetic Indices available 24/7.",
  },
  {
    question: "What is the minimum deposit to start on Deriv?",
    answer: "You can start on Deriv with as little as $5. Multiple deposit methods are available including credit/debit cards, bank transfers, e-wallets, and cryptocurrencies. We recommend starting with a demo account first to practice.",
  },
  {
    question: "What educational resources do you provide?",
    answer: "We offer educational content including practice trading bots, video tutorials, community discussions, and mentorship sessions. Our focus is on helping you understand trading concepts and risk management. Note: This is educational content, not financial advice.",
  },
  {
    question: "How do I get started with learning to trade?",
    answer: "Getting started is straightforward: 1) Create your Deriv account, 2) Practice on a demo account first, 3) Join our educational community, 4) Learn from our tutorials and mentorship resources. Always practice responsible trading and never risk more than you can afford to lose.",
  },
  {
    question: "What support does your mentorship program offer?",
    answer: "Our educational mentorship includes: Video tutorials on YouTube, Community discussions on Telegram and WhatsApp, Educational content about market analysis, and Q&A sessions. We focus on education and understanding, not financial advice or profit promises.",
  },
  {
    question: "What are the risks involved in trading?",
    answer: "Trading CFDs, forex, and derivatives involves significant risk and can result in losses. Past performance does not guarantee future results. Only trade with money you can afford to lose. We recommend thorough education and practicing on demo accounts before live trading.",
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
            Learn more about Deriv trading and our educational services.
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
            Still have questions? Join our community for educational support.
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