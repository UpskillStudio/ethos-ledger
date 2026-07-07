import { MetricCard } from "@/components/ui/MetricCard";
import { Wallet, TrendingUp, PieChart, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Overview</h1>
          <p className="text-muted-foreground">
            Your financial twin is in sync. All systems nominal.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/5">
            Compare Scenarios
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium shadow-lg shadow-primary/20">
            Record Life Event
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Net Worth"
          value="$2,450,890"
          change="3.2%"
          trend="up"
          icon={<Wallet className="w-5 h-5" />}
        />
        <MetricCard
          title="Tax Efficiency"
          value="94/100"
          change="1.1%"
          trend="up"
          icon={<ShieldAlert className="w-5 h-5" />}
        />
        <MetricCard
          title="Portfolio Drift"
          value="1.2%"
          change="0.4%"
          trend="down"
          icon={<PieChart className="w-5 h-5" />}
        />
        <MetricCard
          title="Est. Safe Withdrawal"
          value="$98,400/yr"
          change="0.0%"
          trend="neutral"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Wealth Trajectory</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-muted-foreground outline-none focus:border-primary/50 transition-colors">
              <option>Base Case</option>
              <option>Coast FIRE</option>
              <option>Bear Market (Stress Test)</option>
            </select>
          </div>
          {/* Placeholder for chart */}
          <div className="w-full h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
            <span className="text-muted-foreground text-sm">Monte Carlo Simulation Rendered Here</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-6">Active Strategies</h3>
          <div className="space-y-4">
            {[
              { title: "Tax-Loss Harvesting", status: "Active", desc: "Monitored daily" },
              { title: "Mega Backdoor Roth", status: "Action Required", desc: "Fund 2026 contribution" },
              { title: "RSU Sell-to-Cover", status: "Pending Vest", desc: "Next vest: Oct 15" },
            ].map((strategy, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{strategy.title}</h4>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    strategy.status === "Active" ? "bg-accent/10 text-accent" : 
                    strategy.status === "Action Required" ? "bg-destructive/10 text-destructive" :
                    "bg-white/10 text-muted-foreground"
                  }`}>
                    {strategy.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{strategy.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
