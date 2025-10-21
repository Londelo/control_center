"use client"

import { ToDoTask } from '@/types/todoToday';
import { Check } from 'lucide-react';

interface ToDoTaskCardProps {
  task: ToDoTask;
  isEditing: boolean;
  showCheckbox: boolean;
  onTextChange: (text: string) => void;
  onToggleComplete: () => void;
}

export function ToDoTaskCard({ task, isEditing, showCheckbox, onTextChange, onToggleComplete }: ToDoTaskCardProps) {
  return (
    <div className="task-card-container">
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

      {isEditing ? (
        <input
          type="text"
          value={task.text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter your task"
          className="input-task"
        />
      ) : (
        <span
          className={`flex-1 cursor-default ${task.completed ? 'task-text-completed' : 'task-text-pending'}`}
        >
          {task.text || 'Enter your task'}
        </span>
      )}
    </div>
  );
}
