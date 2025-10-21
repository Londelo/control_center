export interface ToDoTask {
  id: string;
  date: string;
  text: string;
  completed: boolean;
}

export type ToDoTasks = {
  [date: string]: ToDoTask[]
}
