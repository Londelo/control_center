"use client";

import Link from "next/link";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        <header className="mb-8">
          <h1 className="text-lg font-mono font-bold">Map</h1>
        </header>

        <div>
          <Link href="/">
            <button className="btn-outline">
              Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
