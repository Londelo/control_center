import { ToDoList } from '@/types/todoToday';
import ToDoTodayDB from '@/backend/todoToday';

type ToggleToDoTaskCompletionArgs = {
  currentToDoTasks: ToDoList;
  isEditing: boolean;
  updateToDoListState: (ToDoList: ToDoList) => void;
};

const ToggleToDoTaskCompletion = ({
  currentToDoTasks,
  isEditing,
  updateToDoListState
}: ToggleToDoTaskCompletionArgs) => async (taskId: string) => {
  if (isEditing) return;

  const updatedTasks = currentToDoTasks.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  const updatedToDoList = { ...currentToDoTasks, tasks: updatedTasks }

  await ToDoTodayDB.save(updatedToDoList)

  updateToDoListState(updatedToDoList)
};

export default ToggleToDoTaskCompletion;
