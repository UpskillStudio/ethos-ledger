import { Fingerprint, Lock, Bell, Download, Trash2, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="pb-4 border-b border-white/5">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">
          Manage your privacy boundary, integrations, and preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-2">
          {["Privacy & Security", "Connected Accounts", "Agent Permissions", "Notifications", "Billing"].map((tab, i) => (
            <button
              key={tab}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Zero-Leakage Boundary</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Local Encryption Key (DEK)</h4>
                    <p className="text-sm text-muted-foreground mt-1">Your data is encrypted at rest using a key only you control.</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors">
                  Rotate Key
                </button>
              </div>

              <div className="h-px bg-white/5 w-full" />

              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Fingerprint className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Biometric Action Gates</h4>
                    <p className="text-sm text-muted-foreground mt-1">Require FaceID/TouchID for any transaction execution.</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold text-destructive">Data Sovereignty</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              You own your data. You can export your entire financial graph, history, and action logs at any time. You can also request a total deletion of your Twin.
            </p>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Full Payload
              </button>
              <button className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Twin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
