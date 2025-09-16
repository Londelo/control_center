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
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        {!isEditing && (
          <button
            onClick={onToggleComplete}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? 'bg-gray-800 border-gray-800 text-white'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {task.completed ? (
              <Check className="w-4 h-4" />
            ) : null}
          </button>
        )}

        {isEditing ? (
          <input
            type="text"
            value={task.text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter your task"
            className="flex-1 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          />
        ) : (
          <span
            className={`flex-1 ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {task.text || 'Enter your task'}
          </span>
        )}
      </div>
    </div>
  );
}