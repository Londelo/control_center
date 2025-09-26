"use client"

import { Task } from '@/types/powerList';
import { Check, Settings } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isEditing: boolean;
  showCheckbox: boolean;
  onTextChange: (text: string) => void;
  onToggleComplete: () => void;
  onSettingsClick?: () => void;
  onTaskClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function TaskCard({ task, isEditing, showCheckbox, onTextChange, onToggleComplete, onSettingsClick, onTaskClick, onKeyDown, inputRef }: TaskCardProps) {
  return (
    <div className="flex items-start gap-3 font-mono text-base text-left">
      {showCheckbox && (
        <button
          onClick={onToggleComplete}
          disabled={isEditing}
          className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0 mt-1 disabled:cursor-not-allowed rounded opacity-50"
        >
          {task.completed ? (
            <Check className="w-2.5 h-2.5" />
          ) : null}
        </button>
      )}

      {isEditing && (
        <button
          onClick={onSettingsClick}
          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-black flex-shrink-0 mt-2"
        >
          <Settings size={14} />
        </button>
      )}

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={task.text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter your task"
          className="flex-1 bg-white border-2 border-gray-300 outline-none font-mono text-base placeholder-gray-400 px-2 py-1 focus:border-black"
        />
      ) : (
        <button
          onClick={onTaskClick}
          className={`flex-1 text-left hover:bg-stone-200 px-1 py-0.5 rounded transition-colors ${
            task.completed ? 'line-through text-gray-500' : 'text-black'
          }`}
        >
          {task.text ? task.text : 'Enter your task'}
        </button>
      )}
    </div>
  );
}
