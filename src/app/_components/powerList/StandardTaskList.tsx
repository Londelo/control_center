"use client"

import { StandardTask } from '@/types/standards';
import { StandardTaskCard } from './StandardTaskCard';
import { Plus, X } from 'lucide-react';

interface StandardTaskListProps {
  tasks: StandardTask[];
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  onAddTask: () => void;
  onRemoveTask: (taskId: string) => void;
  taskRefs: React.RefObject<HTMLInputElement>[];
  onKeyDown: (index: number, e: React.KeyboardEvent) => void;
}

export function StandardTaskList({
  tasks,
  isEditing,
  showCheckboxes,
  onTaskUpdate,
  onTaskToggle,
  onAddTask,
  onRemoveTask,
  taskRefs,
  onKeyDown
}: StandardTaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div key={task.id} className="flex items-start gap-2">
          <StandardTaskCard
            task={task}
            isEditing={isEditing}
            showCheckbox={showCheckboxes}
            onTextChange={(text) => onTaskUpdate(task.id, text)}
            onToggleComplete={() => onTaskToggle(task.id)}
            inputRef={taskRefs[index]}
            onKeyDown={(e) => onKeyDown(index, e)}
          />
          {isEditing && (
            <button
              onClick={() => onRemoveTask(task.id)}
              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 flex-shrink-0 mt-2"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}

      {isEditing && (
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 text-gray-500 hover:text-black font-mono text-sm"
        >
          <Plus size={16} />
          Add task
        </button>
      )}
    </div>
  );
}
