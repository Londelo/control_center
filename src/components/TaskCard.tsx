import { Task } from '@/types/powerList';
import { Check } from 'lucide-react';

interface TaskCardProps {
  task: Task;
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

export function TaskCard({ task, isEditing, showCheckbox, onTextChange, onToggleComplete, onKeyDown, inputRef }: TaskCardProps) {
  return (
    <div className="flex items-start gap-3 font-mono text-base text-left">
      {showCheckbox && (
        <button
          onClick={onToggleComplete}
          disabled={isEditing}
          className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5 disabled:cursor-not-allowed rounded opacity-20"
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
          className="flex-1 bg-transparent border-none outline-none font-mono text-base placeholder-gray-400"
        />
      ) : (
        <span
          className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}
        >
          {task.text ? formatTaskText(task.text) : 'Enter your task'}
        </span>
      )}
    </div>
  );
}