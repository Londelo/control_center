import { ToDoTask } from '@/types/todoToday';

export function createEmptyToDoTask(): ToDoTask {
  return {
    text: '',
    completed: false
  };
}
