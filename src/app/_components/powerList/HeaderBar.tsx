"use client";

import { ChartBar as BarChart3 } from "lucide-react";
import Link from "next/link";

export function HeaderBar() {
  return (
    <header className="border-b border-ui py-4 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-mono font-bold">Control Center</h1>

        <Link href="/stats">
          <button className="btn-outline">
            <BarChart3 size={16} />
            View Stats
          </button>
        </Link>
      </div>
    </header>
  );
}
