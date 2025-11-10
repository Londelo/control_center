import ToDoTodayDB from '@/backend/todoToday';
import { ToDoList, ToDoLists } from '@/types/todoToday';
import { createEmptyToDoList, getIncompleteTasks } from '@/logic/todoToday';

type OnInitArgs = {
  today: string;
  setAllToDos: (todos: ToDoLists) => void;
  setCurrentToDoTasks: (todoList: ToDoList) => void;
  setShowToDoSection: (show: boolean) => void;
};

const OnInit = ({
  today,
  setAllToDos,
  setCurrentToDoTasks,
  setShowToDoSection
}: OnInitArgs) => async () => {
  const allToDos = await ToDoTodayDB.getAllToDoLists();
  setAllToDos(allToDos);

  let todaysToDoList = allToDos[today];
  if(!todaysToDoList?.tasks) {
    const incompleteTodoList = getIncompleteTasks(allToDos, today);
    todaysToDoList = createEmptyToDoList(today, { tasks: incompleteTodoList })
    await ToDoTodayDB.save(todaysToDoList)
  }

  setCurrentToDoTasks(todaysToDoList);
  setShowToDoSection(true);
};

export default OnInit;
