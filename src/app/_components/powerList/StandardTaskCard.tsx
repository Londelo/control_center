"use client"

import { StandardTask } from '@/types/powerList';
import { Check } from 'lucide-react';

interface TaskCardProps {
  task: StandardTask;
  isEditing: boolean;
  showCheckbox: boolean;
  onTextChange: (text: string) => void;
  onToggleComplete: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const formatTaskText = (text: string) => {
  const commaIndex = text.indexOf(',');
  if (commaIndex === -1) {
    return <span>{text}</span>;
  }

  const beforeComma = text.substring(0, commaIndex);
  const afterComma = text.substring(commaIndex);

  return (
    <span>
      <strong>{beforeComma}</strong>
      {afterComma}
    </span>
  );
};

export function StandardTaskCard({ task, isEditing, showCheckbox, onTextChange, onToggleComplete, onKeyDown, inputRef }: TaskCardProps) {
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
          ref={inputRef}
          type="text"
          value={task.text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter your task"
          className="input-task"
        />
      ) : (
        <span
          className={`flex-1 cursor-default ${task.completed ? 'task-text-completed' : 'task-text-pending'}`}
        >
          {task.text ? formatTaskText(task.text) : 'Enter your task'}
        </span>
      )}
    </div>
  );
}
