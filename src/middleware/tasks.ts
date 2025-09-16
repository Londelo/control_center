import { TaskList } from '@/types/powerList';
import LocalStore from '../backend/localStorage';

const STORAGE_KEY = 'power_list';

type StorageData = {
  taskLists: Record<string, TaskList>;
  lastAccessDate: string;
};

const getStorageData = (): StorageData => {
  const defaultData = { taskLists: {}, lastAccessDate: '' };
  const data = LocalStore.get<StorageData>(STORAGE_KEY);
  const hasData = data !== undefined;
  return hasData ? data : defaultData;
};

const upsertStorageData = (data: StorageData): void => {
  LocalStore.upsert(STORAGE_KEY, data);
};


const getTasksByDate = (date: string): TaskList | null => {
  const storageData = getStorageData();
  const hasTaskList = Object.prototype.hasOwnProperty.call(storageData.taskLists, date);
  return hasTaskList ? storageData.taskLists[date] : null;
};


const saveTasksForDate = (date: string, taskList: TaskList): void => {
  const storageData = getStorageData();
  storageData.taskLists[date] = taskList;
  storageData.lastAccessDate = date;
  upsertStorageData(storageData);
};

const getAllTaskHistory = (): Record<string, TaskList> => {
  const storageData = getStorageData();
  return storageData.taskLists;
};


const updateTaskStatus = (date: string, taskId: string, completed: boolean): void => {
  const storageData = getStorageData();
  const hasTaskList = Object.prototype.hasOwnProperty.call(storageData.taskLists, date);
  if (hasTaskList) {
    const task = storageData.taskLists[date].tasks.find(t => t.id === taskId);
    const hasTask = task !== undefined;
    if (hasTask) {
      task.completed = completed;
      storageData.taskLists[date].updatedAt = new Date().toISOString();
      upsertStorageData(storageData);
    }
  }
};

const getLastAccessDate = (): string => {
  const storageData = getStorageData();
  return storageData.lastAccessDate;
};

const clearAllData = (): void => {
  LocalStore.remove(STORAGE_KEY);
};

export default {
  getTasksByDate,
  saveTasksForDate,
  getAllTaskHistory,
  updateTaskStatus,
  getLastAccessDate,
  clearAllData
};
