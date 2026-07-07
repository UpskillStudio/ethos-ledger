"use client";

import { MetricCard } from "@/components/ui/MetricCard";
import { Wallet, TrendingUp, PieChart, ShieldAlert, Activity } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [twinData, setTwinData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/twin")
      .then(res => res.json())
      .then(data => {
        setTwinData(data.twin);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-[80vh]"><Activity className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const financialState = twinData?.financialState || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="pb-4 border-b border-white/5">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Hello, {twinData?.name || "User"}
        </h1>
        <p className="text-muted-foreground">
          Sovereign Twin Status: <span className="text-accent font-medium">Synchronized</span>
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Net Worth" 
          value={`$${(financialState.netWorth || 0).toLocaleString()}`}
          trend="+2.4%" 
          trendUp={true} 
          icon={<Wallet className="w-4 h-4 text-primary" />} 
        />
        <MetricCard 
          title="Tax Efficiency Score" 
          value={`${financialState.taxEfficiency || 0}/100`}
          trend="Optimal" 
          trendUp={true} 
          icon={<TrendingUp className="w-4 h-4 text-accent" />} 
        />
        <MetricCard 
          title="Portfolio Drift" 
          value={`${financialState.portfolioDrift || 0}%`}
          trend="Needs Rebalancing" 
          trendUp={false} 
          icon={<PieChart className="w-4 h-4 text-amber-400" />} 
        />
        <MetricCard 
          title="Safe Withdrawal Rate" 
          value={`$${(financialState.safeWithdrawalRate || 0).toLocaleString()}/yr`}
          trend="Coast FIRE Ready" 
          trendUp={true} 
          icon={<ShieldAlert className="w-4 h-4 text-blue-400" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Wealth Trajectory</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-muted-foreground outline-none focus:border-primary/50 transition-colors">
              <option>Base Case</option>
              <option>Coast FIRE</option>
              <option>Bear Market (Stress Test)</option>
            </select>
          </div>
          <div className="w-full h-[300px] relative rounded-xl overflow-hidden border border-white/5">
            <Image 
              src="/monte_carlo_chart.png"
              alt="Monte Carlo Simulation Visualization"
              fill
              className="object-contain opacity-80 mix-blend-screen p-2"
            />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-6">Active Strategies</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <h4 className="font-medium text-primary text-sm mb-1">Tax-Loss Harvesting</h4>
              <p className="text-xs text-muted-foreground">Monitoring 4 volatile positions for capital loss offset opportunities.</p>
            </div>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <h4 className="font-medium text-accent text-sm mb-1">Mega Backdoor Roth</h4>
              <p className="text-xs text-muted-foreground">Automated sweeps configured. $14,500 remaining capacity this year.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-medium text-foreground text-sm mb-1">Asset Location Optimization</h4>
              <p className="text-xs text-muted-foreground">Shifting bonds to tax-advantaged accounts pending execution.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
