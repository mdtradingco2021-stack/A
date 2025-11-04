import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Mock candlestick data
const generateChartData = () => {
  const data = [];
  let price = 2500;
  
  for (let i = 0; i < 75; i++) {
    const change = (Math.random() - 0.5) * 50;
    price += change;
    const open = price;
    const close = price + (Math.random() - 0.5) * 30;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    
    data.push({
      time: `${9 + Math.floor(i / 12)}:${(i % 12) * 5}`,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 100000),
      vwap: (high + low + close) / 3,
    });
  }
  
  return data;
};

interface StockChartProps {
  symbol: string | null;
}

export const StockChart = ({ symbol }: StockChartProps) => {
  const data = generateChartData();
  const currentPrice = data[data.length - 1].close;
  const previousPrice = data[0].close;
  const priceChange = currentPrice - previousPrice;
  const priceChangePct = (priceChange / previousPrice) * 100;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">{symbol || "Select a Symbol"}</h2>
            </div>
            {symbol && (
              <div className="flex items-center gap-4 mt-2">
                <div className="text-3xl font-bold">₹{currentPrice.toFixed(2)}</div>
                <Badge 
                  variant="outline" 
                  className={`gap-1 ${priceChange >= 0 ? "bg-success/10 border-success text-success" : "bg-destructive/10 border-destructive text-destructive"}`}
                >
                  <TrendingUp className={`h-3 w-3 ${priceChange < 0 ? "rotate-180" : ""}`} />
                  {priceChange >= 0 ? "+" : ""}{priceChangePct.toFixed(2)}%
                </Badge>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {["5m", "15m", "1h", "1d"].map((interval) => (
              <Button
                key={interval}
                size="sm"
                variant={interval === "5m" ? "default" : "outline"}
                className="min-w-[50px]"
              >
                {interval}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="vwapGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  padding: "12px"
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#priceGradient)"
                name="Price"
              />
              <Line
                type="monotone"
                dataKey="vwap"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="VWAP"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground">Open</div>
            <div className="text-lg font-semibold">₹{data[0].open.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">High</div>
            <div className="text-lg font-semibold text-success">
              ₹{Math.max(...data.map(d => d.high)).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Low</div>
            <div className="text-lg font-semibold text-destructive">
              ₹{Math.min(...data.map(d => d.low)).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Volume</div>
            <div className="text-lg font-semibold">
              {(data.reduce((sum, d) => sum + d.volume, 0) / 1000000).toFixed(2)}M
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
