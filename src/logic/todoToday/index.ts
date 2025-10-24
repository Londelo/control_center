import { ToDoTask } from '@/types/todoToday';
import { v4 } from 'uuid';

export function createEmptyToDoTask(): ToDoTask {
  return {
    id: v4(),
    text: '',
    completed: false
  };
}
