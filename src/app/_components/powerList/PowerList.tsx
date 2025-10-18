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

export function PowerList({ powerList, isEditing, showCheckboxes, onTaskUpdate, onTaskToggle, onTaskSettings, onTaskClick }: PowerListProps) {
  return (
    <div className="space-y-3 max-w-md mx-auto">
      {powerList.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isEditing={isEditing}
          showCheckbox={showCheckboxes}
          onTextChange={(text) => onTaskUpdate(task.id, text)}
          onToggleComplete={() => onTaskToggle(task.id)}
          onSettingsClick={() => onTaskSettings?.(task.id)}
          onTaskClick={() => onTaskClick?.(task.id)}
        />
      ))}
    </div>
  );
}
