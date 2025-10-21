import { ToDoTask } from '@/types/todoToday';
import { v4 } from 'uuid';

export function createEmptyToDoTask(date: string): ToDoTask {
  return {
    id: v4(),
    date,
    text: '',
    completed: false
  };
}

export function normalizeToDoList(_date: string, toDoTasks?: ToDoTask[]): ToDoTask[] {
  return toDoTasks || [];
}
