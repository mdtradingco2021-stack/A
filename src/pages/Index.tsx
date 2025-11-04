import { useState } from "react";
import { AuthStatus } from "@/components/AuthStatus";
import { MarketDataTable } from "@/components/MarketDataTable";
import { CollectionControls } from "@/components/CollectionControls";
import { StockChart } from "@/components/StockChart";
import { ScoringDashboard } from "@/components/ScoringDashboard";
import { TechnicalIndicators } from "@/components/TechnicalIndicators";
import { Activity, BarChart3, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>("NSE:RELIANCE-EQ");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Stock Market Intelligence
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time Data Collection & AI Scoring System
                </p>
              </div>
            </div>
            <AuthStatus />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Collection Controls */}
        <CollectionControls />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live" className="gap-2">
              <Activity className="h-4 w-4" />
              Live Market
            </TabsTrigger>
            <TabsTrigger value="charts" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Charts & Analysis
            </TabsTrigger>
            <TabsTrigger value="scoring" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              AI Scoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <MarketDataTable onSymbolSelect={setSelectedSymbol} />
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StockChart symbol={selectedSymbol} />
              </div>
              <div>
                <TechnicalIndicators symbol={selectedSymbol} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scoring" className="space-y-6">
            <ScoringDashboard symbol={selectedSymbol} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
