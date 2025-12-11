import { TrendingUp, Shield, AlertTriangle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4">
        {/* Risk Warning */}
        <div className="glass-card p-6 mb-12 border-destructive/30">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Risk Warning</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trading Deriv products involves risk. Ensure you understand the terms and conditions before trading. Past performance does not guarantee future results. Only trade with money you can afford to lose. Trading derivatives may not be suitable for all investors.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              Destiny<span className="text-gradient-gold">Traders</span>Hub
            </span>
          </div>

          {/* Sponsor Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/30">
            <Shield className="w-4 h-4 text-emerald" />
            <span className="text-sm text-muted-foreground">Powered by Deriv</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Destiny Traders Hub. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
          <a
            href="https://deriv.com/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Terms & Conditions
          </a>
          <a
            href="https://deriv.com/responsible"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Responsible Trading
          </a>
          <a
            href="https://deriv.com/regulatory"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Regulatory Information
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
