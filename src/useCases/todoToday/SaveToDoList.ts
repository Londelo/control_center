import ToDoTodayDB from '@/backend/todoToday';
import { ToDoList } from '@/types/todoToday';

type SaveToDoListArgs = {
  currentToDoList: ToDoList;
};

const SaveToDoList = ({
  currentToDoList
}: SaveToDoListArgs) => async () => {
  await ToDoTodayDB.save(currentToDoList);
};

export default SaveToDoList;
