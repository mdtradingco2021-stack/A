import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Activity, Wifi, WifiOff, Server } from "lucide-react";
import { toast } from "sonner";

export const CollectionControls = () => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [wsConnections, setWsConnections] = useState(0);
  const [symbolsTracked, setSymbolsTracked] = useState(0);
  const [messagesPerSec, setMessagesPerSec] = useState(0);

  const handleStart = () => {
    setIsCollecting(true);
    setWsConnections(5);
    setSymbolsTracked(212);
    
    // Simulate real-time message rate
    const interval = setInterval(() => {
      setMessagesPerSec(Math.floor(Math.random() * 50) + 100);
    }, 1000);

    toast.success("Data collection started", {
      description: "WebSocket connections established"
    });

    return () => clearInterval(interval);
  };

  const handleStop = () => {
    setIsCollecting(false);
    setWsConnections(0);
    setSymbolsTracked(0);
    setMessagesPerSec(0);
    toast.info("Data collection stopped");
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Data Collection Engine
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time market data collection via WebSocket connections
          </p>
        </div>

        <div className="flex items-center gap-4">
          {isCollecting && (
            <div className="flex items-center gap-6 mr-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{wsConnections}</div>
                <div className="text-xs text-muted-foreground">WS Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{symbolsTracked}</div>
                <div className="text-xs text-muted-foreground">Symbols</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{messagesPerSec}</div>
                <div className="text-xs text-muted-foreground">Msgs/Sec</div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {isCollecting ? (
                <Badge variant="outline" className="gap-2 bg-success/10 border-success text-success animate-pulse">
                  <Activity className="h-3 w-3" />
                  Collecting
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-2 bg-muted border-border text-muted-foreground">
                  <WifiOff className="h-3 w-3" />
                  Idle
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleStart}
                disabled={isCollecting}
                className="gap-2 bg-success hover:bg-success/90"
              >
                <Play className="h-3.5 w-3.5" />
                Start
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleStop}
                disabled={!isCollecting}
                className="gap-2"
              >
                <Square className="h-3.5 w-3.5" />
                Stop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
