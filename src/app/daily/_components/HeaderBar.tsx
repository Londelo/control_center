"use client";

import { ChartBar as BarChart3 } from "lucide-react";
import Link from "next/link";

export function HeaderBar() {
  return (
    <header className="border-b border-ui py-4 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-mono font-bold">Control Center</h1>

        <div className="flex gap-2">
          <Link href="/">
            <button className="btn-outline">
              Home
            </button>
          </Link>

          <Link href="/daily/stats">
            <button className="btn-outline">
              <BarChart3 size={16} />
              View Stats
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
