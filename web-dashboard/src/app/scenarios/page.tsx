import { ArrowRight, BarChart3, LineChart, Target, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ScenariosPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Scenarios</h1>
          <p className="text-muted-foreground">
            Explore what-if projections driven by Monte Carlo simulations.
          </p>
        </div>
        <Link href="#" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium shadow-lg shadow-primary/20 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          New Simulation
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link href="#" className="glass-card p-6 rounded-2xl group cursor-pointer hover:border-primary/50 transition-all block">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Coast FIRE Variant</h3>
                <p className="text-sm text-muted-foreground">Generated 2 days ago</p>
              </div>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Assuming a target coast age of 45, covering only base expenses thereafter with no additional contributions.
          </p>
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Success Rate</p>
              <p className="text-2xl font-semibold text-accent">94.2%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Median Outcome</p>
              <p className="text-2xl font-semibold">$3.8M</p>
            </div>
          </div>
        </Link>

        <Link href="#" className="glass-card p-6 rounded-2xl group cursor-pointer hover:border-primary/50 transition-all block">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Real Estate Pivot</h3>
                <p className="text-sm text-muted-foreground">Generated 1 week ago</p>
              </div>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Liquidating $150k from taxable brokerage to fund a multi-family property down payment.
          </p>
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Success Rate</p>
              <p className="text-2xl font-semibold text-accent">88.5%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Median Outcome</p>
              <p className="text-2xl font-semibold">$4.2M</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <LineChart className="text-primary w-6 h-6" />
          <h3 className="font-semibold text-lg">Comparative Analysis</h3>
        </div>
        <div className="w-full h-[400px] relative rounded-xl overflow-hidden border border-white/5 bg-[#1a1c23]">
          <Image 
            src="/monte_carlo_chart.png"
            alt="Monte Carlo Simulation Visualization"
            fill
            className="object-contain opacity-90 p-4"
          />
        </div>
      </div>
    </div>
  );
}
