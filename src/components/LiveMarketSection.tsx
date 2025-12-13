import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: string;
  icon: string;
}

interface ForexPrice {
  symbol: string;
  price: number;
  change: number;
}

const LiveMarketSection = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [forexPrices, setForexPrices] = useState<ForexPrice[]>([
    { symbol: "EUR/USD", price: 1.085, change: 0.12 },
    { symbol: "GBP/USD", price: 1.265, change: -0.08 },
    { symbol: "USD/JPY", price: 154.5, change: 0.25 },
    { symbol: "AUD/USD", price: 0.655, change: 0.15 },
    { symbol: "USD/CAD", price: 1.365, change: -0.05 },
    { symbol: "USD/CHF", price: 0.885, change: 0.03 },
  ]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const cryptoSymbols = [
    { api: "BTCUSDT", name: "Bitcoin", icon: "₿" },
    { api: "ETHUSDT", name: "Ethereum", icon: "Ξ" },
    { api: "BNBUSDT", name: "BNB", icon: "◆" },
    { api: "XRPUSDT", name: "XRP", icon: "✕" },
    { api: "SOLUSDT", name: "Solana", icon: "◎" },
    { api: "DOGEUSDT", name: "Dogecoin", icon: "Ð" },
  ];

  // Fetch Binance crypto prices - deferred to reduce FID
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let cancelled = false;

    const fetchCryptoPrices = async () => {
      try {
        const responses = await Promise.all(
          cryptoSymbols.map((sym) =>
            fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${sym.api}`)
              .then((res) => res.json())
              .catch(() => null)
          )
        );

        if (cancelled) return;

        const prices: CryptoPrice[] = responses
          .map((data, index) => {
            if (!data || !data.lastPrice) return null;
            return {
              symbol: cryptoSymbols[index].api.replace("USDT", ""),
              name: cryptoSymbols[index].name,
              price: parseFloat(data.lastPrice),
              change24h: parseFloat(data.priceChangePercent),
              volume: (parseFloat(data.quoteVolume) / 1e9).toFixed(2) + "B",
              icon: cryptoSymbols[index].icon,
            };
          })
          .filter(Boolean) as CryptoPrice[];

        setCryptoPrices(prices);
        setLastUpdate(new Date());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
        if (!cancelled) setIsLoading(false);
      }
    };

    // Defer initial fetch to after first paint to reduce FID
    const scheduleInitialFetch = () => {
      if ('requestIdleCallback' in window) {
        (window as Window).requestIdleCallback(() => {
          fetchCryptoPrices();
          interval = setInterval(fetchCryptoPrices, 2000);
        }, { timeout: 1000 });
      } else {
        setTimeout(() => {
          fetchCryptoPrices();
          interval = setInterval(fetchCryptoPrices, 2000);
        }, 100);
      }
    };

    scheduleInitialFetch();
    
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, []);

  // Simulate forex price updates (would use TwelveData/Finnhub with API key)
  useEffect(() => {
    const updateForexPrices = () => {
      setForexPrices((prev) =>
        prev.map((pair) => ({
          ...pair,
          price: pair.price + (Math.random() - 0.5) * 0.001,
          change: pair.change + (Math.random() - 0.5) * 0.02,
        }))
      );
    };

    const interval = setInterval(updateForexPrices, 1500);
    return () => clearInterval(interval);
  }, []);

  // Load TradingView widget lazily with IntersectionObserver
  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const container = chartContainerRef.current;
          if (!container || container.querySelector('script')) return;
          
          const script = document.createElement("script");
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
          script.type = "text/javascript";
          script.async = true;
          script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "15",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            backgroundColor: "rgba(15, 23, 42, 1)",
            gridColor: "rgba(30, 41, 59, 0.5)",
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            calendar: false,
            support_host: "https://www.tradingview.com",
          });

          container.appendChild(script);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(chartContainerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="live-prices" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 gpu-accelerated"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Activity className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Real-Time Market Data</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Live <span className="text-gradient-gold">Market Prices</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Track real-time prices from Binance API. Data refreshes every 2 seconds.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Crypto Prices Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 gpu-accelerated"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="text-orange-400">₿</span> Cryptocurrency Prices
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="glass-card p-4 animate-pulse">
                      <div className="h-6 bg-secondary rounded mb-2" />
                      <div className="h-8 bg-secondary rounded mb-2" />
                      <div className="h-4 bg-secondary rounded w-1/2" />
                    </div>
                  ))
              : cryptoPrices.map((crypto) => (
                  <div key={crypto.symbol} className="glass-card p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{crypto.icon}</span>
                      <span className="font-semibold text-foreground">{crypto.symbol}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground font-mono">
                      ${crypto.price > 100 ? crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : crypto.price.toFixed(4)}
                    </p>
                    <div className={`flex items-center gap-1 mt-1 ${crypto.change24h >= 0 ? "text-accent" : "text-destructive"}`}>
                      {crypto.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-sm font-medium">
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h.toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Vol: ${crypto.volume}</p>
                  </div>
                ))}
          </div>
        </motion.div>

        {/* Forex Prices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 gpu-accelerated"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="text-blue-400">$</span> Forex Pairs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {forexPrices.map((pair) => (
              <div key={pair.symbol} className="glass-card p-4 hover:border-primary/30 transition-all">
                <p className="font-semibold text-foreground mb-2">{pair.symbol}</p>
                <p className="text-xl font-bold text-foreground font-mono">{pair.price.toFixed(4)}</p>
                <div className={`flex items-center gap-1 mt-1 ${pair.change >= 0 ? "text-accent" : "text-destructive"}`}>
                  {pair.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-sm font-medium">
                    {pair.change >= 0 ? "+" : ""}
                    {pair.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            * Forex prices shown are simulated. Connect TwelveData or Finnhub API for live data.
          </p>
        </motion.div>

        {/* TradingView Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-card overflow-hidden gpu-accelerated"
        >
          <div className="p-4 border-b border-border/30">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Live TradingView Chart - BTC/USDT
            </h3>
          </div>
          <div className="tradingview-widget-container" ref={chartContainerRef} style={{ height: "500px" }} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-12 gpu-accelerated"
        >
          <Button variant="hero" size="xl" asChild>
            <a
              href="https://partners.deriv.com/rx?sidc=F310811B-4DCC-433A-B9AF-E14FA2AA0E6C&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU92942"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Trading Now
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveMarketSection;
