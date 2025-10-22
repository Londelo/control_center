export interface ToDoTask {
  text: string;
  completed: boolean;
}

export type ToDoTasks = {
  id: string;
  date: string;
  tasks: ToDoTask[]
}
