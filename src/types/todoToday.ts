export interface ToDoTask {
  id: string;
  text: string;
  completed: boolean;
}

export type ToDoList = {
  id: string;
  date: string;
  tasks: ToDoTask[]
}

export type ToDoLists = {
  [date: string]: ToDoList
}
