"use client"

import { StandardTask } from '@/types/standards';
import { StandardTaskCard } from './StandardTaskCard';
import { AddTaskButton, RemoveTaskButton } from '../shared';

interface StandardsListProps {
  tasks: StandardTask[];
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  onAddTask: () => void;
  onRemoveTask: (taskId: string) => void;
}

function StandardsList({
  tasks,
  isEditing,
  showCheckboxes,
  onTaskUpdate,
  onTaskToggle,
  onAddTask,
  onRemoveTask
}: StandardsListProps) {
  return (

    <div className="flex-1 p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-mono font-bold mb-6 text-center">STANDARD TASKS:</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2">
              <StandardTaskCard
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

export default StandardsList
