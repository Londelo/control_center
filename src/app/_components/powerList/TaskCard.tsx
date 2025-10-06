"use client"

import { Task } from '@/types/powerList';
import { Check, Settings } from 'lucide-react';
import { getTaskBackgroundColor } from '@/useCases/powerList';

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
  const circleColor = !isEditing ? getTaskBackgroundColor(task.time.needed, task.time.left) : '#e5e7eb';

  return (
    <div className="task-card-container relative">
      {showCheckbox && (
        <button
          onClick={onToggleComplete}
          disabled={isEditing}
          className="btn-checkbox"
        >
          {task.completed ? (
            <Check className="w-2.5 h-2.5" />
          ) : null}
        </button>
      )}

      {isEditing && (
        <button
          onClick={onSettingsClick}
          className="btn-icon-small mt-2"
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
          className="input-task"
        />
      ) : (
        <div className="flex-1 relative">
          <button
            onClick={onTaskClick}
            className={`task-text-display ${
              task.completed ? 'task-text-completed' : 'task-text-pending'
            }`}
          >
            {task.text ? task.text : 'Enter your task'}
          </button>
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full border border-ui"
            style={{ backgroundColor: circleColor }}
          />
        </div>
      )}
    </div>
  );
}
