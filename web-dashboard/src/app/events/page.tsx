"use client";

import { Activity, Plus, FileText, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleAddEvent = async () => {
    setIsAdding(true);
    const newEvent = {
      type: "JOB_CHANGE",
      title: "Promoted to VP of Engineering",
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      impact: "Base salary increased by 30%. Triggering tax bracket reassessment."
    };

    try {
      const res = await fetch("/api/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });
      
      if (res.ok) {
        const data = await res.json();
        setEvents([data.event, ...events]);
        // Show LLM reasoning from local reasoning engine
        alert(`Local Engine Evaluation:\n${data.evaluation.llmReasoning}\n\nRecommended Strategies:\n- ${data.evaluation.recommendations.join('\n- ')}`);
      }
    } catch (e) {
      console.error(e);
    }
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Life Events</h1>
          <p className="text-muted-foreground">
            The immutable append-only log of your financial reality.
          </p>
        </div>
        <button 
          onClick={handleAddEvent}
          disabled={isAdding || isLoading}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? <Activity className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Log New Event
        </button>
      </header>

      {isLoading ? (
        <div className="flex justify-center p-12"><Activity className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {events.map((event: any) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-accent/20 text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <FileText className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl group-hover:border-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-accent tracking-wider uppercase">{event.date}</span>
                  <span className="text-xs font-medium px-2 py-1 bg-white/5 rounded text-muted-foreground">{event.type}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {event.impact}
                </p>
                <button className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
                  View Triggered Strategies <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
