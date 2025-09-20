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
    <div className="flex items-start gap-3 font-mono text-base">
      <div className="flex items-center gap-3 w-full">
        {!isEditing && (
          <button
            onClick={onToggleComplete}
            className="w-5 h-5 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            {task.completed ? (
              <Check className="w-3 h-3" />
            ) : null}
          </button>
        )}

        {isEditing ? (
          <input
            type="text"
            value={task.text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter your task"
            className="flex-1 bg-transparent border-none outline-none font-mono text-base placeholder-gray-400"
          />
        ) : (
          <span
            className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}
          >
            {task.text || 'Enter your task'}
          </span>
        )}
      </div>
    </div>
  );
}