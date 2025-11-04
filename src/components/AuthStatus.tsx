import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RefreshCw, LogOut, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

export const AuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsAuthenticated(true);
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);
      setExpiresAt(expires.toISOString());
      setIsLoading(false);
      toast.success("Connected to Fyers API successfully!");
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
    setExpiresAt(null);
    toast.info("Disconnected from Fyers API");
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);
      setExpiresAt(expires.toISOString());
      setIsLoading(false);
      toast.success("Token refreshed successfully!");
    }, 1000);
  };

  const getTimeRemaining = () => {
    if (!expiresAt) return "";
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `Expires in ${hours}h ${minutes}m`;
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur border-border">
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Badge variant="outline" className="gap-2 bg-success/10 border-success text-success">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Fyers Connected
            </Badge>
            <span className="text-xs text-muted-foreground">{getTimeRemaining()}</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading}
                className="gap-2"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDisconnect}
                className="gap-2"
              >
                <LogOut className="h-3.5 w-3.5" />
                Disconnect
              </Button>
            </div>
          </>
        ) : (
          <>
            <Badge variant="outline" className="gap-2 bg-destructive/10 border-destructive text-destructive">
              <XCircle className="h-3.5 w-3.5" />
              Not Authenticated
            </Badge>
            <Button
              size="sm"
              onClick={handleConnect}
              disabled={isLoading}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <LinkIcon className={`h-3.5 w-3.5 ${isLoading ? "animate-pulse" : ""}`} />
              Connect with Fyers
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
