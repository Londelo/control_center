"use client"

import { ToDoTask } from '@/types/todoToday';
import { ToDoTaskCard } from './ToDoTaskCard';
import { Plus, X } from 'lucide-react';

interface ToDoListProps {
  tasks: ToDoTask[];
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  onAddTask: () => void;
  onRemoveTask: (taskId: string) => void;
}

function ToDoList({
  tasks,
  isEditing,
  showCheckboxes,
  onTaskUpdate,
  onTaskToggle,
  onAddTask,
  onRemoveTask
}: ToDoListProps) {
  return (
    <div className="w-full p-8 border-t border-ui">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-mono font-bold mb-6 text-center">TODO LIST:</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2">
              <ToDoTaskCard
                task={task}
                isEditing={isEditing}
                showCheckbox={showCheckboxes}
                onTextChange={(text: string) => onTaskUpdate(task.id, text)}
                onToggleComplete={() => onTaskToggle(task.id)}
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
      </div>
    </div>
  );
}

export default ToDoList;
