import { Task, PowerList } from '@/types/powerList';
import { updatePowerListStatus } from '@/logic/powerList'

type UpdateTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const UpdateTask = ({ currentPowerList, setCurrentPowerList }: UpdateTaskArgs) =>
  (taskId: string, updates: string | Partial<Task>) => {
    if (!currentPowerList) return;

    // Handle both string (text only) and object (full task) updates for backward compatibility
    const taskUpdates = typeof updates === 'string' ? { text: updates } : updates;

    const updatedTasks = currentPowerList.tasks.map((task: Task) =>
      task.id === taskId ? { ...task, ...taskUpdates } : task
    );

    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      tasks: updatedTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default UpdateTask;
