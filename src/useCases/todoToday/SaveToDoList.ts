import ToDoTodayDB from '@/backend/todoToday';
import { ToDoList } from '@/types/todoToday';

type SaveToDoListArgs = {
  currentToDoList: ToDoList;
  updateToDoListState: (ToDoList: ToDoList) => void;
};

const SaveToDoList = ({
  currentToDoList,
  updateToDoListState
}: SaveToDoListArgs) => async () => {
  await ToDoTodayDB.save(currentToDoList);
  updateToDoListState(currentToDoList)
};

export default SaveToDoList;
