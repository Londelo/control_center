"use client"

import { Task } from '@/types/powerList';
import { Check, Settings } from 'lucide-react';
import { getTaskCompletionColor } from '@/useCases/powerList';

interface TaskCardProps {
  task: Task;
  date: string
  isEditing: boolean;
  showCheckbox: boolean;
  onTextChange: (text: string) => void;
  onToggleComplete: () => void;
  onSettingsClick?: () => void;
  onTaskClick?: () => void;
}

const getTaskBackgroundColor = (task: Task, date: string) => {

  if(task.time.resettingNext) {
    return 'bg-orange-200'
  }

  if(task.time.resetDates?.includes(date)) {
    return 'bg-red-200'
  }

  return 'bg-stone-200'
}

export function TaskCard({ task, date, isEditing, showCheckbox, onTextChange, onToggleComplete, onSettingsClick, onTaskClick }: TaskCardProps) {
  const circleColor = !isEditing ? getTaskCompletionColor(task.time.needed, task.time.left) : '#e5e7eb';

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
          type="text"
          value={task.text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter your task"
          className="input-task"
        />
      ) : (
        <div className="flex-1 relative">
          <button
            onClick={onTaskClick}
            className={`task-text-display ${getTaskBackgroundColor(task, date)}`}
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
