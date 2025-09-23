"use client"

import { PowerList as PowerListType } from '@/types/powerList';
import { TaskCard } from './TaskCard';

interface PowerListProps {
  powerList: PowerListType;
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  taskRefs: React.RefObject<HTMLInputElement>[];
  onKeyDown: (index: number, e: React.KeyboardEvent) => void;
}

export function PowerList({ powerList, isEditing, showCheckboxes, onTaskUpdate, onTaskToggle, taskRefs, onKeyDown }: PowerListProps) {
  return (
    <div className="space-y-3">
      {powerList.tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          isEditing={isEditing}
          showCheckbox={showCheckboxes}
          onTextChange={(text) => onTaskUpdate(task.id, text)}
          onToggleComplete={() => onTaskToggle(task.id)}
          inputRef={taskRefs[index]}
          onKeyDown={(e) => onKeyDown(index, e)}
        />
      ))}
    </div>
  );
}
