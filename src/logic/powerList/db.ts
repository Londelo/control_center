"use client"

import { PowerList } from '@/types/powerList';
import LocalStore from '../../backend/localStorage';

const STORAGE_KEY = 'power_list';

type StorageData = {
  powerLists: Record<string, PowerList>;
  lastSaveDate: string;
};

const getStorageData = (): StorageData => {
  const defaultData = { powerLists: {}, lastSaveDate: '' };
  const data = LocalStore.get<StorageData>(STORAGE_KEY);
  const hasData = data !== undefined;
  return hasData ? data : defaultData;
};

const upsertStorageData = (data: StorageData): void => {
  LocalStore.upsert(STORAGE_KEY, data);
};

const getTasksByDate = (date: string): PowerList | null => {
  const storageData = getStorageData();
  const powerList = storageData.powerLists[date]
  return powerList ? powerList : null;
};

const saveTasksForDate = (date: string, powerList: PowerList): void => {
  const storageData = getStorageData();
  storageData.powerLists[date] = powerList;
  storageData.lastSaveDate = date;
  upsertStorageData(storageData);
};

const getAllTaskHistory = (): Record<string, PowerList> => {
  const storageData = getStorageData();
  return storageData.powerLists;
};

const updateTaskStatus = (date: string, taskId: string, completed: boolean): void => {
  const storageData = getStorageData();
  const hasPowerList = Object.prototype.hasOwnProperty.call(storageData.powerLists, date);
  if (hasPowerList) {
    const task = storageData.powerLists[date].tasks.find(t => t.id === taskId);
    const hasTask = task !== undefined;
    if (hasTask) {
      task.completed = completed;
      storageData.powerLists[date].updatedAt = new Date().toISOString();
      upsertStorageData(storageData);
    }
  }
};

const getLastSaveDate = (): string => {
  const storageData = getStorageData();
  return storageData.lastSaveDate;
};

const clearAllData = (): void => {
  LocalStore.remove(STORAGE_KEY);
};

export type PowerListType = {
    getTasksByDate: (date: string) => PowerList | null;
    saveTasksForDate: (date: string, powerList: PowerList) => void;
    getAllTaskHistory: () => Record<string, PowerList>;
    updateTaskStatus: (date: string, taskId: string, completed: boolean) => void;
    getLastSaveDate: () => string;
    clearAllData: () => void;
}

const PowerListDB = {
  getTasksByDate,
  saveTasksForDate,
  getAllTaskHistory,
  updateTaskStatus,
  getLastSaveDate,
  clearAllData
};

export default PowerListDB
