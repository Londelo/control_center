import { TaskList } from '@/types/powerList';

type ToggleTaskCompletionArgs = {
  currentTaskList: TaskList | null;
  isEditing: boolean;
  currentDate: string;
  setCurrentTaskList: (taskList: TaskList) => void;
  updateTaskStatus: (date: string, taskId: string, completed: boolean) => void;
  updateTaskListStatus: (taskList: TaskList) => TaskList;
};

const ToggleTaskCompletion = ({
  currentTaskList,
  isEditing,
  currentDate,
  setCurrentTaskList,
  updateTaskStatus,
  updateTaskListStatus,
}: ToggleTaskCompletionArgs) => (taskId: string) => {
  if (!currentTaskList || isEditing) return;

  const task =
    currentTaskList.tasks.find(t => t.id === taskId) ||
    currentTaskList.sideTasks.find(t => t.id === taskId);
  if (!task) return;

  const newCompletedStatus = !task.completed;

  // Update in backend
  updateTaskStatus(currentDate, taskId, newCompletedStatus);

  // Update local state for both task lists
  const updatedTasks = currentTaskList.tasks.map(t =>
    t.id === taskId ? { ...t, completed: newCompletedStatus } : t
  );

  const updatedSideTasks = currentTaskList.sideTasks.map(t =>
    t.id === taskId ? { ...t, completed: newCompletedStatus } : t
  );

  const updatedList = updateTaskListStatus({
    ...currentTaskList,
    tasks: updatedTasks,
    sideTasks: updatedSideTasks,
  });

  setCurrentTaskList(updatedList);
};

export default ToggleTaskCompletion;
