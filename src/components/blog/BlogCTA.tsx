import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface BlogCTAProps {
  variant?: "primary" | "secondary" | "inline";
}

const BlogCTA = ({ variant = "primary" }: BlogCTAProps) => {
  const derivSignupUrl = "https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942";
  const toolsUrl = "https://dbotpro.live";

  if (variant === "inline") {
    return (
      <div className="my-8 p-6 glass-card border-primary/30 text-center">
        <p className="text-muted-foreground mb-4">
          Ready to start your trading journey with the right tools?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href={derivSignupUrl} target="_blank" rel="noopener noreferrer">
              Create Free Deriv Account
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={toolsUrl} target="_blank" rel="noopener noreferrer">
              Explore Free Trading Tools
            </a>
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <div className="my-8 p-6 rounded-xl bg-accent/10 border border-accent/30">
        <h4 className="font-display font-semibold text-foreground mb-2">
          Access Free Trading Bots
        </h4>
        <p className="text-muted-foreground text-sm mb-4">
          Enhance your trading with our collection of free automated trading tools.
        </p>
        <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent/10">
          <a href="https://dbotpro.live/#freebots" target="_blank" rel="noopener noreferrer">
            Get Free Deriv Trading Bots
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 glass-card border-primary/30 text-center">
      <h3 className="font-display text-2xl font-bold text-foreground mb-3">
        Start Your Trading Education Today
      </h3>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
        Join thousands of traders who have started their journey with Deriv. 
        Create a free account and practice with a demo account before trading live.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="hero" size="lg" asChild>
          <a href={derivSignupUrl} target="_blank" rel="noopener noreferrer">
            Create Free Trading Account
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href={toolsUrl} target="_blank" rel="noopener noreferrer">
            Trade Now With Free Tools
          </a>
        </Button>
      </div>
    </div>
  );
};

export default BlogCTA;
