import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-muted-foreground text-sm font-medium tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className="text-primary/80 group-hover:text-primary transition-colors">
            {icon}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-3xl font-semibold text-foreground tracking-tight">
          {value}
        </p>
        
        {change && (
          <div className="flex items-center gap-1 mt-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                trend === "up" && "text-accent bg-accent/10",
                trend === "down" && "text-destructive bg-destructive/10",
                trend === "neutral" && "text-muted-foreground bg-muted"
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "−"} {change}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs last month
            </span>
          </div>
        )}
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
