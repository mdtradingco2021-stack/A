import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface TechnicalIndicatorsProps {
  symbol: string | null;
}

export const TechnicalIndicators = ({ symbol }: TechnicalIndicatorsProps) => {
  // Mock technical indicator data
  const indicators = {
    rsi: 58.5,
    vwap: { current: 2487.50, signal: 5.2 },
    ema: {
      ema9: 2495.20,
      ema20: 2482.30,
      ema50: 2470.15,
      trend: "RISING"
    },
    fibonacci: {
      levels: {
        "23.6%": 2420.50,
        "38.2%": 2445.80,
        "50.0%": 2465.00,
        "61.8%": 2484.20,
        "78.6%": 2508.40
      },
      signal: 6.5
    },
    volumeProfile: {
      poc: 2475.30,
      vah: 2495.80,
      val: 2455.20,
      signal: 4.8
    }
  };

  const getRSIColor = (rsi: number) => {
    if (rsi > 70) return "text-destructive";
    if (rsi < 30) return "text-success";
    return "text-primary";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "RISING") return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "FALLING") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  const getSignalBadge = (signal: number) => {
    if (signal > 5) {
      return <Badge className="bg-success/10 border-success text-success">Strong Bullish</Badge>;
    }
    if (signal > 0) {
      return <Badge className="bg-success/10 border-success/50 text-success">Bullish</Badge>;
    }
    if (signal < -5) {
      return <Badge className="bg-destructive/10 border-destructive text-destructive">Strong Bearish</Badge>;
    }
    if (signal < 0) {
      return <Badge className="bg-destructive/10 border-destructive/50 text-destructive">Bearish</Badge>;
    }
    return <Badge className="bg-muted border-border">Neutral</Badge>;
  };

  if (!symbol) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur border-border">
        <div className="text-center text-muted-foreground">
          Select a symbol to view technical indicators
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Technical Indicators</h3>
      </div>

      {/* RSI */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">RSI (14)</span>
          <span className={`text-lg font-bold ${getRSIColor(indicators.rsi)}`}>
            {indicators.rsi.toFixed(1)}
          </span>
        </div>
        <Progress value={indicators.rsi} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Oversold (30)</span>
          <span>Overbought (70)</span>
        </div>
      </div>

      {/* VWAP */}
      <div className="space-y-2 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">VWAP</span>
          {getSignalBadge(indicators.vwap.signal)}
        </div>
        <div className="text-2xl font-bold">₹{indicators.vwap.current.toFixed(2)}</div>
        <div className="text-xs text-muted-foreground">
          Signal Strength: {indicators.vwap.signal.toFixed(1)} / 10
        </div>
      </div>

      {/* EMA Trend */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">EMA Trend</span>
          <div className="flex items-center gap-2">
            {getTrendIcon(indicators.ema.trend)}
            <span className="text-sm font-semibold">{indicators.ema.trend}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">EMA 9</span>
            <span className="font-mono">₹{indicators.ema.ema9.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">EMA 20</span>
            <span className="font-mono">₹{indicators.ema.ema20.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">EMA 50</span>
            <span className="font-mono">₹{indicators.ema.ema50.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Fibonacci Levels */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Fibonacci Retracement</span>
          {getSignalBadge(indicators.fibonacci.signal)}
        </div>
        <div className="space-y-1.5">
          {Object.entries(indicators.fibonacci.levels).map(([level, price]) => (
            <div key={level} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{level}</span>
              <span className="font-mono">₹{price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Volume Profile */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Volume Profile</span>
          {getSignalBadge(indicators.volumeProfile.signal)}
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">POC (Point of Control)</span>
            <span className="font-mono font-semibold">₹{indicators.volumeProfile.poc.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">VAH (Value Area High)</span>
            <span className="font-mono">₹{indicators.volumeProfile.vah.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">VAL (Value Area Low)</span>
            <span className="font-mono">₹{indicators.volumeProfile.val.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
