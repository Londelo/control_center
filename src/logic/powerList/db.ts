"use client"

import { PowerList, PowerLists } from '@/types/powerList';
import LocalStore from '../../backend/localStorage';

const STORAGE_KEY = 'power_list';

type StorageData = {
  powerLists: PowerLists;
  lastViewedDate: string;
};

const getStorageData = (): StorageData => {
  const defaultData = { powerLists: {}, lastViewedDate: '' };
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
  storageData.lastViewedDate = date;
  upsertStorageData(storageData);
};

const getAllPowerLists = (): PowerLists => {
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

const getLastViewedDate = (): string => {
  const storageData = getStorageData();
  return storageData.lastViewedDate;
};

const updateLastViewedDate = (date: string): void => {
  const storageData = getStorageData();
  storageData.lastViewedDate = date;
  upsertStorageData(storageData);
};

const clearAllData = (): void => {
  LocalStore.remove(STORAGE_KEY);
};

export type PowerListType = {
    getTasksByDate: (date: string) => PowerList | null;
    saveTasksForDate: (date: string, powerList: PowerList) => void;
    getAllPowerLists: () => Record<string, PowerList>;
    updateTaskStatus: (date: string, taskId: string, completed: boolean) => void;
    getLastViewedDate: () => string;
    clearAllData: () => void;
}

const PowerListDB = {
  getTasksByDate,
  saveTasksForDate,
  getAllPowerLists,
  updateTaskStatus,
  getLastViewedDate,
  updateLastViewedDate,
  clearAllData
};

export default PowerListDB
