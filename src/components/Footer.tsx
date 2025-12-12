import { TrendingUp, Shield, AlertTriangle, Handshake } from "lucide-react";

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
                Trading CFDs, forex, cryptocurrencies, and other derivatives involves significant risk and can result in the loss of your entire invested capital. 
                Ensure you understand the terms and conditions before trading. Past performance does not guarantee future results. 
                Only trade with money you can afford to lose. Trading derivatives may not be suitable for all investors. 
                Please consider our risk disclosure before trading.
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

          {/* Partnership Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <Handshake className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">In Partnership with Deriv</span>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/30">
            <Shield className="w-4 h-4 text-emerald" />
            <span className="text-sm text-muted-foreground">Secure & Regulated</span>
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
          <a
            href="https://deriv.com/tnc/general-terms.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Risk Disclosure
          </a>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
            Deriv is a pioneer and market leader with a 25-year track record, licensed and regulated by financial authorities including the Malta Financial Services Authority, 
            Labuan Financial Services Authority, Vanuatu Financial Services Commission, and British Virgin Islands Financial Services Commission.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
