import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Activity, Target, BarChart3 } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ScoringDashboardProps {
  symbol: string | null;
}

export const ScoringDashboard = ({ symbol }: ScoringDashboardProps) => {
  // Mock AI scoring data
  const scoringData = {
    finalScore: 7.8,
    confidence: 82,
    signalType: "BULLISH",
    components: {
      vwScore: 6.5,
      trendMultiplier: 1.3,
      vwapSignal: 5.2,
      vpSignal: 4.8,
      fibSignal: 6.5,
      rsiPenalty: null
    },
    breakdown: [
      { name: "VW Score", value: 65, color: "hsl(var(--chart-1))" },
      { name: "VWAP", value: 52, color: "hsl(var(--chart-2))" },
      { name: "Volume Profile", value: 48, color: "hsl(var(--chart-3))" },
      { name: "Fibonacci", value: 65, color: "hsl(var(--chart-4))" },
      { name: "Trend", value: 85, color: "hsl(var(--chart-5))" }
    ]
  };

  const confidenceData = [
    { name: "Confidence", value: scoringData.confidence, fill: "hsl(var(--primary))" }
  ];

  const getScoreColor = (score: number) => {
    if (score > 5) return "text-success";
    if (score < -5) return "text-destructive";
    return "text-primary";
  };

  const getSignalBadge = (signal: string) => {
    const variants: Record<string, string> = {
      STRONG_BULLISH: "bg-success/20 border-success text-success",
      BULLISH: "bg-success/10 border-success/50 text-success",
      NEUTRAL: "bg-muted border-border text-muted-foreground",
      BEARISH: "bg-destructive/10 border-destructive/50 text-destructive",
      STRONG_BEARISH: "bg-destructive/20 border-destructive text-destructive",
    };

    return (
      <Badge variant="outline" className={`${variants[signal]} text-lg px-4 py-2 font-semibold`}>
        {signal.replace(/_/g, " ")}
      </Badge>
    );
  };

  if (!symbol) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur border-border">
        <div className="text-center text-muted-foreground">
          Select a symbol to view AI scoring analysis
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <Card className="p-8 bg-card/50 backdrop-blur border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Scoring Engine</h2>
                <p className="text-sm text-muted-foreground">Multi-factor analysis</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Final AI Score</div>
                <div className={`text-6xl font-bold ${getScoreColor(scoringData.finalScore)}`}>
                  {scoringData.finalScore >= 0 ? "+" : ""}{scoringData.finalScore.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Scale: -10 to +10</div>
              </div>

              <div className="pt-4">
                {getSignalBadge(scoringData.signalType)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="60%"
                  outerRadius="100%"
                  data={confidenceData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold">{scoringData.confidence}%</div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Component Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur border-border space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Score Components</h3>
          </div>

          <div className="space-y-4">
            {[
              { label: "VW Score", value: scoringData.components.vwScore, max: 10 },
              { label: "VWAP Signal", value: scoringData.components.vwapSignal, max: 10 },
              { label: "Volume Profile Signal", value: scoringData.components.vpSignal, max: 10 },
              { label: "Fibonacci Signal", value: scoringData.components.fibSignal, max: 10 }
            ].map((component) => (
              <div key={component.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{component.label}</span>
                  <span className={`font-bold ${getScoreColor(component.value)}`}>
                    {component.value >= 0 ? "+" : ""}{component.value.toFixed(1)}
                  </span>
                </div>
                <Progress 
                  value={((component.value + 10) / 20) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Trend Multiplier</span>
              <Badge className="bg-success/10 border-success text-success">
                ×{scoringData.components.trendMultiplier}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              RISING trend applied +30% boost
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur border-border space-y-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Signal Breakdown</h3>
          </div>

          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={scoringData.breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {scoringData.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {scoringData.breakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-xs">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Analysis Details */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Analysis Summary</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <div className="text-xs text-muted-foreground mb-1">Strengths</div>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-success" />
                Strong uptrend alignment
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-success" />
                Price above VWAP
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-success" />
                Near Fib golden ratio
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <div className="text-xs text-muted-foreground mb-1">Neutral Factors</div>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-muted-foreground" />
                RSI in neutral zone
              </li>
              <li className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-muted-foreground" />
                Moderate volume levels
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <div className="text-xs text-muted-foreground mb-1">Risk Factors</div>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <Target className="h-3 w-3 text-accent" />
                Watch for RSI divergence
              </li>
              <li className="flex items-center gap-2">
                <Target className="h-3 w-3 text-accent" />
                Monitor volume confirmation
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
