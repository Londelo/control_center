import { ToDoLists, ToDoTask } from '@/types/todoToday';

const handleIncompleteTasks = (
  allToDos: ToDoLists,
  today: string
): ToDoTask[] | [] => {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString();

  const yesterdayToDoList = allToDos[yesterdayStr];
  const todaysToDoList = allToDos[today];

  if(todaysToDoList) {
    return []
  }

  if (!yesterdayToDoList) {
    return [];
  }

  const incompleteTasks = yesterdayToDoList.tasks.filter(task => !task.completed);

  if (incompleteTasks.length === 0) {
    return [];
  }

  return incompleteTasks;
};

export default handleIncompleteTasks;
