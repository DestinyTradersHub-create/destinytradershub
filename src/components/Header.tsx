import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp, Handshake } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Markets", href: "#markets" },
  { label: "Get Started", href: "#get-started" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog", isExternal: true },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = useCallback((e: React.MouseEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      // Close menu first
      setIsOpen(false);
      
      // Small delay to allow menu animation to start
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      setIsOpen(false);
    }
  }, []);

  const toggleMenu = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-2 group"
            onClick={(e) => scrollToSection(e, '#home')}
            onTouchEnd={(e) => scrollToSection(e, '#home')}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-button">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-foreground">
              Destiny<span className="text-gradient-gold">Traders</span>Hub
            </span>
          </a>

          {/* Partnership Badge - Desktop */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <Handshake className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent">In Partnership with Deriv</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isExternal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create Free Account
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-3 text-foreground touch-manipulation"
            onClick={toggleMenu}
            onTouchEnd={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass border-t border-border/30 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {/* Partnership Badge - Mobile */}
              <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-accent/10 border border-accent/30 mb-2">
                <Handshake className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-accent">In Partnership with Deriv</span>
              </div>
              
              {navLinks.map((link) =>
                link.isExternal ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-4 text-left text-base font-medium text-foreground hover:bg-secondary/50 active:bg-secondary/70 rounded-lg transition-colors touch-manipulation"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    onClick={(e) => scrollToSection(e, link.href)}
                    onTouchEnd={(e) => scrollToSection(e, link.href)}
                    className="px-4 py-4 text-left text-base font-medium text-foreground hover:bg-secondary/50 active:bg-secondary/70 rounded-lg transition-colors touch-manipulation"
                  >
                    {link.label}
                  </button>
                )
              )}
              <Button variant="hero" size="lg" className="mt-4 w-full" asChild>
                <a
                  href="https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Create Free Account
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
