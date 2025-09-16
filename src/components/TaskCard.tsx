import { Task } from '@/types/powerList';
import { Check } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isEditing: boolean;
  onTextChange: (text: string) => void;
  onToggleComplete: () => void;
}

export function TaskCard({ task, isEditing, onTextChange, onToggleComplete }: TaskCardProps) {
  return (
    <div>
      <div>
        {!isEditing && (
          <button
            onClick={onToggleComplete}
          >
            {task.completed ? (
              <Check />
            ) : null}
          </button>
        )}

        {isEditing ? (
          <input
            type="text"
            value={task.text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter your task"
          />
        ) : (
          <span
          >
            {task.text || 'Enter your task'}
          </span>
        )}
      </div>
    </div>
  );
}