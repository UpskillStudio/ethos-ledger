import { ShieldCheck, ArrowRightLeft, FileSearch, Cpu } from "lucide-react";

export default function AuditPage() {
  const logs = [
    {
      id: "log_9f82a",
      timestamp: "Today, 14:32:01",
      actor: "Local Engine",
      action: "Executed Tax-Loss Harvest Evaluation",
      status: "Success",
      icon: <Cpu className="w-4 h-4 text-primary" />,
    },
    {
      id: "log_8x71b",
      timestamp: "Yesterday, 09:15:44",
      actor: "User (You)",
      action: "Approved Tinyfish Agent: Vanguard Rollover",
      status: "Approved via Biometric",
      icon: <ShieldCheck className="w-4 h-4 text-accent" />,
    },
    {
      id: "log_7c60c",
      timestamp: "Oct 12, 11:20:00",
      actor: "Nexla Ingestion",
      action: "Plaid Sync: Schwab Brokerage",
      status: "Success",
      icon: <ArrowRightLeft className="w-4 h-4 text-blue-400" />,
    },
    {
      id: "log_6b59d",
      timestamp: "Oct 10, 16:45:12",
      actor: "Agentic Intent",
      action: "Generated 529 Account Application",
      status: "Pending User Signature",
      icon: <FileSearch className="w-4 h-4 text-amber-400" />,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Audit Log</h1>
          <p className="text-muted-foreground">
            Immutable execution record. Trust, but verify.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/5">
            Export JSON
          </button>
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/5">
            Filter
          </button>
        </div>
      </header>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/[0.02] border-b border-white/5 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Timestamp</th>
              <th className="px-6 py-4 font-medium">Actor</th>
              <th className="px-6 py-4 font-medium">Action</th>
              <th className="px-6 py-4 font-medium">Status / Outcome</th>
              <th className="px-6 py-4 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{log.timestamp}</td>
                <td className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    {log.icon}
                    {log.actor}
                  </div>
                </td>
                <td className="px-6 py-4 text-foreground">{log.action}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    log.status.includes('Success') || log.status.includes('Approved') 
                      ? 'bg-accent/10 text-accent' 
                      : 'bg-amber-400/10 text-amber-400'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    View Payload
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
