import { BaseTask, BaseTaskList } from './shared';

export interface ToDoTask extends BaseTask {}

export interface ToDoList extends BaseTaskList<ToDoTask> {}

export type ToDoLists = {
  [date: string]: ToDoList
}
