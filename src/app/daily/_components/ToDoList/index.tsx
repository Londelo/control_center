"use client"

import { ToDoTask } from '@/types/todoToday';
import { ToDoTaskCard } from './ToDoTaskCard';
import { AddTaskButton, RemoveTaskButton } from '../shared';

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
              {isEditing && <RemoveTaskButton onClick={() => onRemoveTask(task.id)} />}
            </div>
          ))}

          {isEditing && <AddTaskButton onClick={onAddTask} />}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
