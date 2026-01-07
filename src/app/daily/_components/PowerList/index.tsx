"use client"

import { PowerList as PowerListType } from '@/types/powerList';
import { TaskCard } from './TaskCard';
import { Plus, X } from 'lucide-react';

interface PowerListProps {
  powerList: PowerListType;
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  onTaskSettings?: (taskId: string) => void;
  onTaskClick?: (taskId: string) => void;
  onAddTask?: () => void;
  onRemoveTask?: (taskId: string) => void;
}

function PowerList({
  powerList,
  isEditing,
  showCheckboxes,
  onTaskUpdate,
  onTaskToggle,
  onTaskSettings,
  onTaskClick,
  onAddTask,
  onRemoveTask
}: PowerListProps) {
  return (
    <div className="flex-1 p-8 border-r border-ui">
      <div className="mx-auto">
        <div className="relative mb-6">
          <h1 className="text-lg font-mono font-bold text-center">POWER LIST:</h1>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          {powerList.tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2">
              <TaskCard
                task={task}
                date={powerList.date}
                isEditing={isEditing}
                showCheckbox={showCheckboxes}
                onTextChange={(text: string) => onTaskUpdate(task.id, text)}
                onToggleComplete={() => onTaskToggle(task.id)}
                onSettingsClick={() => onTaskSettings?.(task.id)}
                onTaskClick={() => onTaskClick?.(task.id)}
              />
              {isEditing && onRemoveTask && (
                <button
                  onClick={() => onRemoveTask(task.id)}
                  className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 flex-shrink-0 mt-2"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          {isEditing && onAddTask && (
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

export default PowerList
export * from './TaskDetailsModal'
export * from './TaskSettingsModal'
