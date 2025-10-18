"use client"

import { PowerList as PowerListType } from '@/types/powerList';
import { TaskCard } from './TaskCard';

interface PowerListProps {
  powerList: PowerListType;
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  onTaskSettings?: (taskId: string) => void;
  onTaskClick?: (taskId: string) => void;
}

function PowerList({ powerList, isEditing, showCheckboxes, onTaskUpdate, onTaskToggle, onTaskSettings, onTaskClick }: PowerListProps) {
  console.log(powerList)
  return (
    <div className="flex-1 p-8 border-r border-ui">
      <div className="mx-auto">
        <div className="relative mb-6">
          <h1 className="text-lg font-mono font-bold text-center">POWER LIST:</h1>
        </div>

          <div className="space-y-3 max-w-md mx-auto">
            {powerList.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isEditing={isEditing}
                showCheckbox={showCheckboxes}
                onTextChange={(text:string ) => onTaskUpdate(task.id, text)}
                onToggleComplete={() => onTaskToggle(task.id)}
                onSettingsClick={() => onTaskSettings?.(task.id)}
                onTaskClick={() => onTaskClick?.(task.id)}
              />
            ))}
          </div>

      </div>
    </div>
  );
}

export default PowerList
export * from './TaskDetailsModal'
export * from './TaskSettingsModal'
