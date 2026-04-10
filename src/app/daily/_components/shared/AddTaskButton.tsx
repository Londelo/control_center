"use client"

import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onClick: () => void;
  label?: string;
}

export function AddTaskButton({ onClick, label = 'Add task' }: AddTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-gray-500 hover:text-black font-mono text-sm"
    >
      <Plus size={16} />
      {label}
    </button>
  );
}
