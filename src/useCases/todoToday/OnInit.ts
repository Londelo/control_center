import ToDoTodayDB from '@/backend/todoToday';
import { ToDoList, ToDoLists } from '@/types/todoToday';
import { v4 } from 'uuid';

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

  const todaysToDoList = allToDos[today] || { id: v4(), date: today, tasks: [] };
  setCurrentToDoTasks(todaysToDoList);

  if (todaysToDoList.tasks.length > 0) {
    setShowToDoSection(true);
  }
};

export default OnInit;
