export interface BaseTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface BaseTaskList<T extends BaseTask> {
  id: string;
  date: string;
  tasks: T[];
}
