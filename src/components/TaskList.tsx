"use client"

import { TaskList as TaskListType } from '@/types/powerList';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  taskList: TaskListType;
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  taskRefs: React.RefObject<HTMLInputElement>[];
  onKeyDown: (index: number, e: React.KeyboardEvent) => void;
}

export function TaskList({ taskList, isEditing, showCheckboxes, onTaskUpdate, onTaskToggle, taskRefs, onKeyDown }: TaskListProps) {
  return (
    <div className="space-y-3">
      {taskList.tasks.map((task, index) => (
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
