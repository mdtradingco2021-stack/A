import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const generateMockData = () => {
  const symbols = [
    "NSE:RELIANCE-EQ", "NSE:TCS-EQ", "NSE:INFY-EQ", "NSE:HDFCBANK-EQ", 
    "NSE:ICICIBANK-EQ", "NSE:SBIN-EQ", "NSE:BHARTIARTL-EQ", "NSE:ITC-EQ",
    "NSE:HINDUNILVR-EQ", "NSE:LT-EQ", "NSE:AXISBANK-EQ", "NSE:WIPRO-EQ"
  ];

  return symbols.map((symbol, i) => ({
    symbol,
    ltp: 2000 + Math.random() * 1000,
    change: (Math.random() - 0.5) * 100,
    changePct: (Math.random() - 0.5) * 5,
    volume: Math.floor(Math.random() * 10000000),
    oi: Math.floor(Math.random() * 5000000),
    score: (Math.random() - 0.5) * 20,
    confidence: Math.floor(Math.random() * 40) + 60,
    signal: ["STRONG_BULLISH", "BULLISH", "NEUTRAL", "BEARISH", "STRONG_BEARISH"][Math.floor(Math.random() * 5)],
    vwap: 2000 + Math.random() * 1000,
    rsi: Math.random() * 100,
  }));
};

interface MarketDataTableProps {
  onSymbolSelect: (symbol: string) => void;
}

export const MarketDataTable = ({ onSymbolSelect }: MarketDataTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [data] = useState(generateMockData());

  const sortedAndFilteredData = useMemo(() => {
    let filtered = data.filter(row => 
      row.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      const modifier = sortDirection === "asc" ? 1 : -1;
      return aValue < bValue ? -modifier : modifier;
    });

    return filtered;
  }, [data, searchQuery, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSignalBadge = (signal: string) => {
    const variants: Record<string, { className: string; icon: any }> = {
      STRONG_BULLISH: { className: "bg-success/20 border-success text-success font-semibold", icon: TrendingUp },
      BULLISH: { className: "bg-success/10 border-success/50 text-success", icon: TrendingUp },
      NEUTRAL: { className: "bg-muted border-border text-muted-foreground", icon: null },
      BEARISH: { className: "bg-destructive/10 border-destructive/50 text-destructive", icon: TrendingDown },
      STRONG_BEARISH: { className: "bg-destructive/20 border-destructive text-destructive font-semibold", icon: TrendingDown },
    };

    const { className, icon: Icon } = variants[signal] || variants.NEUTRAL;
    
    return (
      <Badge variant="outline" className={`gap-1 ${className}`}>
        {Icon && <Icon className="h-3 w-3" />}
        {signal.replace(/_/g, " ")}
      </Badge>
    );
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Live Market Data</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search symbols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => handleSort("symbol")} className="gap-1 hover:bg-background/50">
                    Symbol <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("ltp")} className="gap-1 hover:bg-background/50">
                    LTP <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("changePct")} className="gap-1 hover:bg-background/50">
                    Change % <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("volume")} className="gap-1 hover:bg-background/50">
                    Volume <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("score")} className="gap-1 hover:bg-background/50">
                    AI Score <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("confidence")} className="gap-1 hover:bg-background/50">
                    Confidence <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Signal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredData.map((row) => (
                <TableRow 
                  key={row.symbol} 
                  className="cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => onSymbolSelect(row.symbol)}
                >
                  <TableCell className="font-mono text-sm font-medium">{row.symbol}</TableCell>
                  <TableCell className="text-right font-semibold">₹{row.ltp.toFixed(2)}</TableCell>
                  <TableCell className={`text-right font-semibold ${row.changePct >= 0 ? "text-success" : "text-destructive"}`}>
                    {row.changePct >= 0 ? "+" : ""}{row.changePct.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {(row.volume / 1000000).toFixed(2)}M
                  </TableCell>
                  <TableCell className={`text-right font-bold text-lg ${
                    row.score > 5 ? "text-success" : row.score < -5 ? "text-destructive" : "text-primary"
                  }`}>
                    {row.score >= 0 ? "+" : ""}{row.score.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="text-sm font-medium">{row.confidence}%</div>
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${row.confidence}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getSignalBadge(row.signal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
