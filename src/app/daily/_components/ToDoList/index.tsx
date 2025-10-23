"use client"

import { ToDoTask } from '@/types/todoToday';
import { ToDoTaskCard } from './ToDoTaskCard';
import { Plus, X } from 'lucide-react';

interface ToDoListProps {
  tasks: ToDoTask[];
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskIndex: number, text: string) => void;
  onTaskToggle: (taskIndex: number) => void;
  onAddTask: () => void;
  onRemoveTask: (taskIndex: number) => void;
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
          {tasks.map((task, index) => (
            <div key={index} className="flex items-start gap-2">
              <ToDoTaskCard
                task={task}
                isEditing={isEditing}
                showCheckbox={showCheckboxes}
                onTextChange={(text: string) => onTaskUpdate(index, text)}
                onToggleComplete={() => onTaskToggle(index)}
              />
              {isEditing && (
                <button
                  onClick={() => onRemoveTask(index)}
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
