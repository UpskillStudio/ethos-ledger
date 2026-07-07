import { Users, FileText, Building, Key, AlertTriangle } from "lucide-react";

export default function EstatePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Estate Graph</h1>
          <p className="text-muted-foreground">
            Beneficiary topology, trusts, and digital legacy.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/5">
          Generate Attorney Packet
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Building className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Revocable Living Trust</h3>
          <p className="text-sm text-muted-foreground mb-4">Established 2024. Holds primary residence and taxable brokerage.</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">Fully Funded</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Beneficiaries</h3>
          <p className="text-sm text-muted-foreground mb-4">Primary and contingent designations across 8 accounts.</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Coverage</span>
            <span className="text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">100% Verified</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-destructive/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
            <Key className="w-6 h-6 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Digital Assets</h3>
          <p className="text-sm text-muted-foreground mb-4">Hardware wallet seed phrase inheritance protocol.</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="text-destructive font-medium bg-destructive/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Action Required
            </span>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 min-h-[400px]">
        <h3 className="font-semibold text-lg mb-6">Entity Topology</h3>
        <div className="w-full h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
          <span className="text-muted-foreground text-sm">Interactive node graph rendering...</span>
        </div>
      </div>
    </div>
  );
}
