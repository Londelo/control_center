import { TaskList as TaskListType } from '@/types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  taskList: TaskListType;
  isEditing: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
}

export function TaskList({ taskList, isEditing, onTaskUpdate, onTaskToggle }: TaskListProps) {
  return (
    <div className="space-y-3">
      {taskList.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isEditing={isEditing}
          onTextChange={(text) => onTaskUpdate(task.id, text)}
          onToggleComplete={() => onTaskToggle(task.id)}
        />
      ))}
    </div>
  );
}