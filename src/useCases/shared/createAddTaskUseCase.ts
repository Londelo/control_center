import { BaseTask, BaseTaskList } from '@/types/shared';

type AddTaskArgs<C extends BaseTaskList<any>> = {
  currentList: C | null;
  setCurrentList: (list: C) => void;
};

export function createAddTaskUseCase<T extends BaseTask, C extends BaseTaskList<T>>(
  createEmptyTask: () => T,
  postProcess?: (list: C) => C
) {
  return ({ currentList, setCurrentList }: AddTaskArgs<C>) => () => {
    if (!currentList) return;

    const newTask = createEmptyTask();
    let updatedList = {
      ...currentList,
      tasks: [...currentList.tasks, newTask],
    } as C;

    if (postProcess) {
      updatedList = postProcess(updatedList);
    }

    setCurrentList(updatedList);
  };
}
