"use client";

import { StatsPanel } from "@/components/StatsPanel";
import { usePowerListService } from "@/hooks/usePowerListService";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function StatsPage() {
  const { getStats } = usePowerListService();
  const stats = getStats();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-lg font-mono font-bold">STANDARDS:</h1>
        </header>

        {/* Stats Panel */}
        <div className="mb-12">
          <StatsPanel stats={stats} />
        </div>

        {/* Back Button */}
        <div>
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white font-mono">
              <ArrowLeft size={16} />
              Back to PowerList
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}