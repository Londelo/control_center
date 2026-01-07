import { BaseTask, BaseTaskList } from '@/types/shared';

type UpdateTaskArgs<C extends BaseTaskList<any>> = {
  currentList: C | null;
  setCurrentList: (list: C) => void;
};

export function createUpdateTaskUseCase<T extends BaseTask, C extends BaseTaskList<T>>(
  postProcess?: (list: C) => C
) {
  return ({ currentList, setCurrentList }: UpdateTaskArgs<C>) =>
    (taskId: string, updates: string | Partial<T>) => {
      if (!currentList) return;

      const taskUpdates = typeof updates === 'string' ? { text: updates } : updates;

      let updatedList = {
        ...currentList,
        tasks: currentList.tasks.map(task =>
          task.id === taskId ? { ...task, ...taskUpdates } : task
        ),
      } as C;

      if (postProcess) {
        updatedList = postProcess(updatedList);
      }

      setCurrentList(updatedList);
    };
}
