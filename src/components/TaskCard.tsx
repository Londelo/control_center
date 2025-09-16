import { Task } from '@/types/powerList';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isEditing: boolean;
  onTextChange: (text: string) => void;
  onToggleComplete: () => void;
}

export function TaskCard({ task, isEditing, onTextChange, onToggleComplete }: TaskCardProps) {
  return (
    <Card className="p-4 bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
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
          <Input
            value={task.text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter your task"
            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
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
    </Card>
  );
}
