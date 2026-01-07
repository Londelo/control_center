import { BaseTask, BaseTaskList } from '@/types/shared';

type RemoveTaskArgs<C extends BaseTaskList<any>> = {
  currentList: C | null;
  setCurrentList: (list: C) => void;
};

export function createRemoveTaskUseCase<T extends BaseTask, C extends BaseTaskList<T>>(
  postProcess?: (list: C) => C
) {
  return ({ currentList, setCurrentList }: RemoveTaskArgs<C>) => (taskId: string) => {
    if (!currentList) return;

    let updatedList = {
      ...currentList,
      tasks: currentList.tasks.filter(task => task.id !== taskId),
    } as C;

    if (postProcess) {
      updatedList = postProcess(updatedList);
    }

    setCurrentList(updatedList);
  };
}
