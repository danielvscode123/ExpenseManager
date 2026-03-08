import { AlertCircle, CheckCircle, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  loading?: boolean;
  error?: boolean;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  changeType = "neutral",
  icon,
  loading = false,
  error = false,
  trend,
}: StatCardProps) {
  const bgColors = {
    positive: "bg-primary/10",
    negative: "bg-destructive/10",
    neutral: "bg-secondary/50",
  };

  const textColors = {
    positive: "text-primary",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-primary" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return null;
  };

  return (
    <div className="glass-card p-5 transition-all duration-300 hover:shadow-lg animate-fade-in group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${bgColors[changeType]} group-hover:scale-110 transition-transform`}>
          {error ? (
            <AlertCircle className="h-5 w-5 text-destructive" />
          ) : loading ? (
            <div className="h-5 w-5 rounded-full border-2 border-muted border-t-primary animate-spin" />
          ) : icon ? (
            icon
          ) : (
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-8 w-32 bg-secondary/50 rounded animate-pulse" />
          <div className="h-4 w-24 bg-secondary/30 rounded animate-pulse" />
        </div>
      ) : error ? (
        <div>
          <p className="text-sm text-destructive font-medium">Erro ao carregar</p>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold font-mono tracking-tight">{value}</p>
          <div className="flex items-center gap-2 mt-2">
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {getTrendIcon()}
            {change && (
              <span className={`text-xs font-medium ${textColors[changeType]}`}>
                {change}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
