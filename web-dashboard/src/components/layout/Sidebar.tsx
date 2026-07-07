"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LineChart, 
  FileText, 
  ShieldCheck, 
  Settings,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Scenarios", href: "/scenarios", icon: LineChart },
  { name: "Events", href: "/events", icon: FileText },
  { name: "Estate Graph", href: "/estate", icon: Users },
  { name: "Audit Log", href: "/audit", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 glass border-r border-white/5 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="text-primary-foreground font-bold text-xl">E</span>
        </div>
        <span className="text-lg font-semibold tracking-tight">Ethos Ledger</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5 transition-transform duration-200", 
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  !isActive && "group-hover:scale-110"
                )} 
              />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass-card p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center border border-white/10">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">High Earner Node</span>
          </div>
        </div>
      </div>
    </div>
  );
}
