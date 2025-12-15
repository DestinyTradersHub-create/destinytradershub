import { AlertTriangle } from "lucide-react";

const BlogRiskDisclaimer = () => {
  return (
    <div className="my-8 p-6 glass-card border-destructive/30">
      <div className="flex items-start gap-4">
        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-foreground mb-2 text-sm">Risk Warning</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trading Deriv products involves risk. Ensure you understand the terms and conditions before trading. 
            Past performance does not guarantee future results. Only trade with money you can afford to lose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogRiskDisclaimer;
