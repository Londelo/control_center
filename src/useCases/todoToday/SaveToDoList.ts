import ToDoTodayDB from '@/backend/todoToday';
import { ToDoList } from '@/types/todoToday';

type SaveToDoListArgs = {
  currentToDoList: ToDoList;
  updateToDoListState: (ToDoList: ToDoList) => void;
};

//TODO: update this functionality to get the todoList from the returned function
//and do this for all similar functions. Meaning put the var in the params of the return function
const SaveToDoList = ({
  currentToDoList,
  updateToDoListState
}: SaveToDoListArgs) => async () => {
  await ToDoTodayDB.save(currentToDoList);
  updateToDoListState(currentToDoList)
};

export default SaveToDoList;
