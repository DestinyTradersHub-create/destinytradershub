import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Bitcoin, 
  BarChart3, 
  Globe2, 
  Package, 
  Activity,
  LineChart
} from "lucide-react";

const assets = [
  {
    icon: Globe2,
    title: "Forex",
    description: "Trade major, minor & exotic currency pairs 24/5",
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Bitcoin,
    title: "Cryptocurrencies",
    description: "Trade Bitcoin, Ethereum & 50+ crypto assets 24/7",
    pairs: ["BTC/USD", "ETH/USD", "SOL/USD", "XRP/USD"],
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Package,
    title: "Commodities",
    description: "Gold, Silver, Oil & agricultural commodities",
    pairs: ["XAU/USD", "XAG/USD", "WTI Oil", "Brent"],
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: BarChart3,
    title: "Stock Indices",
    description: "Trade global stock indices & top company shares",
    pairs: ["US Tech 100", "US 500", "UK 100", "DE 40"],
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Activity,
    title: "Synthetic Indices",
    description: "24/7 volatility indices unique to Deriv",
    pairs: ["Volatility 75", "Boom 500", "Crash 500", "Range Break"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: LineChart,
    title: "CFDs & Options",
    description: "Flexible trading with multipliers & options",
    pairs: ["Digital Options", "Multipliers", "Accumulators", "Turbos"],
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
];

const TradingAssetsSection = () => {
  return (
    <section id="markets" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 gpu-accelerated"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">100+ Markets Available</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Trade <span className="text-gradient-gold">Any Market</span> You Want
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access global markets from one platform. Trade forex, crypto, stocks, commodities & more with competitive spreads.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group gpu-accelerated"
            >
              <div className={`w-12 h-12 rounded-xl ${asset.bg} flex items-center justify-center mb-4`}>
                <asset.icon className={`w-6 h-6 ${asset.color}`} />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {asset.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{asset.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {asset.pairs.map((pair) => (
                  <span
                    key={pair}
                    className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground"
                  >
                    {pair}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradingAssetsSection;
