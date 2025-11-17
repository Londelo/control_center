import { ToDoLists, ToDoTask } from '@/types/todoToday';


const getIncompleteTasks = (
  allToDos: ToDoLists,
  today: string
): ToDoTask[] => {

  const dates = Object.keys(allToDos)
    .filter(date => date < today) // Only consider dates before today
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  for (const date of dates) {
    const list = allToDos[date];
    if (list && list.tasks) {
      const incompleteTasks = list.tasks.filter(task => !task.completed);
      if (incompleteTasks.length > 0) {
        return incompleteTasks;
      }
    }
  }

  return [];
};

export default getIncompleteTasks;
