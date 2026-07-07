import { Calendar, Briefcase, Baby, Plus, MapPin } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      id: 1,
      type: "JOB_CHANGE",
      title: "Joined Startup Inc.",
      date: "Oct 2025",
      impact: "High Earner Node triggered. ISO grants received.",
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      bg: "bg-primary/10",
    },
    {
      id: 2,
      type: "RELOCATION",
      title: "Moved to Texas",
      date: "Mar 2024",
      impact: "Zero state income tax factored into projections.",
      icon: <MapPin className="w-5 h-5 text-accent" />,
      bg: "bg-accent/10",
    },
    {
      id: 3,
      type: "DEPENDENT_ADDED",
      title: "First Child Born",
      date: "Nov 2022",
      impact: "529 Plan established. Beneficiaries updated.",
      icon: <Baby className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Life Events</h1>
          <p className="text-muted-foreground">
            Deterministic trajectory triggers that adapt your financial strategies.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Log Event
        </button>
      </header>

      <div className="max-w-3xl">
        <div className="relative border-l border-white/10 ml-6 space-y-10 py-6">
          {events.map((event) => (
            <div key={event.id} className="relative pl-8">
              {/* Timeline Dot */}
              <div className={`absolute -left-5 top-1.5 w-10 h-10 rounded-full ${event.bg} border-4 border-background flex items-center justify-center`}>
                {event.icon}
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                </div>
                <div className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-white/5 text-muted-foreground mb-4">
                  {event.type}
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <p className="text-sm font-medium text-foreground mb-1">Strategy Impact</p>
                  <p className="text-sm text-muted-foreground">{event.impact}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="relative pl-8 opacity-50">
            <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-white/10 border-2 border-background" />
            <p className="text-sm text-muted-foreground pt-1">Beginning of recorded financial history</p>
          </div>
        </div>
      </div>
    </div>
  );
}
