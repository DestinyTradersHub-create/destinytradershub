import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: number;
  type: "crypto" | "forex";
}

const MarketTicker = () => {
  const [tickers, setTickers] = useState<TickerItem[]>([
    { symbol: "BTC/USD", price: "---", change: 0, type: "crypto" },
    { symbol: "ETH/USD", price: "---", change: 0, type: "crypto" },
    { symbol: "XRP/USD", price: "---", change: 0, type: "crypto" },
    { symbol: "BNB/USD", price: "---", change: 0, type: "crypto" },
    { symbol: "SOL/USD", price: "---", change: 0, type: "crypto" },
    { symbol: "DOGE/USD", price: "---", change: 0, type: "crypto" },
    { symbol: "ADA/USD", price: "---", change: 0, type: "crypto" },
    { symbol: "EUR/USD", price: "1.0850", change: 0.12, type: "forex" },
    { symbol: "GBP/USD", price: "1.2650", change: -0.08, type: "forex" },
    { symbol: "USD/JPY", price: "154.50", change: 0.25, type: "forex" },
  ]);

  useEffect(() => {
    const fetchBinancePrices = async () => {
      try {
        const symbols = ["BTCUSDT", "ETHUSDT", "XRPUSDT", "BNBUSDT", "SOLUSDT", "DOGEUSDT", "ADAUSDT"];
        const responses = await Promise.all(
          symbols.map((symbol) =>
            fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
              .then((res) => res.json())
              .catch(() => null)
          )
        );

        setTickers((prev) => {
          const updated = [...prev];
          responses.forEach((data, index) => {
            if (data && data.lastPrice) {
              const price = parseFloat(data.lastPrice);
              const change = parseFloat(data.priceChangePercent);
              updated[index] = {
                ...updated[index],
                price: price > 100 ? price.toFixed(2) : price.toFixed(4),
                change: change,
              };
            }
          });
          return updated;
        });
      } catch (error) {
        console.error("Error fetching Binance prices:", error);
      }
    };

    fetchBinancePrices();
    const interval = setInterval(fetchBinancePrices, 2000);
    return () => clearInterval(interval);
  }, []);

  // Double the tickers for seamless loop
  const displayTickers = [...tickers, ...tickers];

  return (
    <div className="w-full bg-secondary/80 border-y border-border/30 overflow-hidden">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {displayTickers.map((ticker, index) => (
            <div
              key={`${ticker.symbol}-${index}`}
              className="inline-flex items-center gap-3 px-6 py-3 border-r border-border/30"
            >
              <span className="font-semibold text-foreground text-sm">{ticker.symbol}</span>
              <span className="text-foreground font-mono text-sm">${ticker.price}</span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  ticker.change >= 0 ? "text-accent" : "text-destructive"
                }`}
              >
                {ticker.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {ticker.change >= 0 ? "+" : ""}
                {ticker.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
