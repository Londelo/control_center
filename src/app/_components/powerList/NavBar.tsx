"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavBarProps {
  dayOfWeek: string;
  status: string;
  statusColor: string;
  currentDate: string;
  canNavigateBackward: boolean;
  canNavigateForward: boolean;
  onNavigateToDate: (direction: 'prev' | 'next') => void;
}

export function NavBar({
  dayOfWeek,
  status,
  statusColor,
  currentDate,
  canNavigateBackward,
  canNavigateForward,
  onNavigateToDate
}: NavBarProps) {
  return (
    <div className="relative text-center py-8 border-b border-ui">
      <button
        onClick={() => onNavigateToDate('prev')}
        disabled={!canNavigateBackward}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 btn-icon"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="text-2xl font-mono mb-2 flex items-center justify-center gap-2">
        <span>{dayOfWeek} -</span>
        <span className={statusColor}>
          {status}
        </span>
      </div>

      <div className="text-xl font-mono mb-3 text-ui-secondary">
        {currentDate}
      </div>

      <button
        onClick={() => onNavigateToDate('next')}
        disabled={!canNavigateForward}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 btn-icon"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
