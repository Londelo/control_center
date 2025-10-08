"use client";

import { Download } from "lucide-react";
import ExportService from "@/backend/export";

const handleExport = async () => {
  await ExportService.exportToJSON();
};

export function HeaderBar() {
  return (
    <header className="border-b border-ui py-4 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-mono font-bold">Control Center</h1>

        <button
          onClick={handleExport}
          className="btn-outline"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </header>
  );
}
