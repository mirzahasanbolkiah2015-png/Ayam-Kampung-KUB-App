"use client";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
   
      <div className="min-h-screen bg-[oklch(0.98_0.008_100)] pb-[72px]">
        <div className="max-w-lg mx-auto">{children}</div>
        <BottomNav />
      </div>
    
  );
}
