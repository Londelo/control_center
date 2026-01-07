"use client"

import { X } from 'lucide-react';

interface RemoveTaskButtonProps {
  onClick: () => void;
}

export function RemoveTaskButton({ onClick }: RemoveTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 flex-shrink-0 mt-2"
    >
      <X size={14} />
    </button>
  );
}
