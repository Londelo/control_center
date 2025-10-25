import ToDoTodayDB from '@/backend/todoToday';
import { ToDoList, ToDoLists } from '@/types/todoToday';
import { createEmptyToDoList, handleIncompleteTasks } from '@/logic/todoToday';

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

  const todaysToDoTasks = allToDos[today]?.tasks || [];
  const incompleteTodoList = handleIncompleteTasks(allToDos, today);
  console.log(incompleteTodoList)
  const todaysToDoList = createEmptyToDoList(today, { tasks: [ ...todaysToDoTasks, ...incompleteTodoList ] })

  await ToDoTodayDB.save(todaysToDoList)
  setCurrentToDoTasks(todaysToDoList);

  if (todaysToDoList.tasks.length > 0) {
    setShowToDoSection(true);
  }
};

export default OnInit;
