import { ToDoList, ToDoTask } from '@/types/todoToday';
import { v4 } from 'uuid';

export { default as getIncompleteTasks } from './getIncompleteTasks';

export function createEmptyToDoTask(): ToDoTask {
  return {
    id: v4(),
    text: '',
    completed: false
  };
}

export function createEmptyToDoList(date: string, overrides?: any): ToDoList {
  return {
    id: v4(),
    date,
    tasks: [ createEmptyToDoTask() ],
    ...overrides
  };
}
