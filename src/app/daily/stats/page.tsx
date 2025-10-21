"use client";

import { StatsPanel } from "@/app/daily/stats/_components/StatsPanel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        <header className="mb-8">
          <h1 className="text-lg font-mono font-bold">STANDARDS:</h1>
        </header>

        <div className="mb-12">
          <StatsPanel />
        </div>

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
