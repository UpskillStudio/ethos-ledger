"use client";

import { ShieldCheck, ArrowRight, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [isInitializing, setIsInitializing] = useState(false);
  const router = useRouter();

  const handleInitialization = () => {
    setIsInitializing(true);
    // Simulate twin initialization taking a few seconds
    setTimeout(() => {
      router.push("/");
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in zoom-in duration-700">
      <div className="max-w-xl w-full">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/20">
            <span className="text-primary-foreground font-bold text-4xl">E</span>
          </div>
        </div>
        
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Initialize Your Twin</h1>
          <p className="text-muted-foreground text-lg">
            Connect your accounts to construct your Sovereign Wealth Co-Pilot. Your data remains encrypted within a zero-leakage privacy boundary.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Fiduciary Disclosure</h3>
                <p className="text-sm text-muted-foreground mt-1">Review our Form ADV and acknowledge our fiduciary duty to act in your best interest.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Zero-Knowledge Mapping</h3>
                <p className="text-sm text-muted-foreground mt-1">Your exact figures are tokenized locally. No raw financial data or PII ever leaves your device boundary.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleInitialization}
            disabled={isInitializing}
            className="w-full py-4 rounded-2xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isInitializing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Initializing Twin...
              </>
            ) : (
              <>
                Begin Initialization
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <p className="text-xs text-center text-muted-foreground">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
