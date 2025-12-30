import { ToDoLists, ToDoTask } from '@/types/todoToday';
import { sortDateDescending } from '@/utils/dates';

const getIncompleteTasks = (
  allToDos: ToDoLists,
  today: string
): ToDoTask[] => {
  const dates = sortDateDescending(Object.keys(allToDos))

  for (const date of dates) {
    const list = allToDos[date];
    if (date !== today && list && list.tasks) {
      const incompleteTasks = list.tasks.filter(task => !task.completed);
      if (incompleteTasks.length > 0) {
        return incompleteTasks;
      }
    }
  }

  return [];
};

export default getIncompleteTasks;
