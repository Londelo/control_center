"use client"

import { StandardTask, Standard, Standards } from '@/types/standards';
import ControlCenterDB from './indexedDB';

const saveList = async (standardTasks: Standard[]): Promise<void> => {
  for (const task of standardTasks) {
    await ControlCenterDB.upsert('Standard', task, task.date);
  }
};

const getAllStandardsLists = async (): Promise<Standards> => {
  const standards = await ControlCenterDB.getAll('Standard');
  const normalizedStandards: Standards = standards.reduce(
    (acc, standard) => {
      acc[standard.date] = standard;
      return acc;
    }, {} as Standards
  );
  return normalizedStandards;
};

const getStandardsListByDate = async (date: string): Promise<StandardTask[]> => {
  const allStandards = await getAllStandardsLists();
  return allStandards[date].tasks || [];
};

const clearAllData = async (): Promise<void> => {
  const standardTasks = await ControlCenterDB.getAll('Standard');
  await Promise.all(standardTasks.map((task) => ControlCenterDB.remove('Standard', task.id)));
};

const removeStandardTask = async (taskId: string): Promise<void> => {
  await ControlCenterDB.remove('Standard', taskId);
};

export type StandardsDBType = {
  saveList: (standardTasks: Standard[]) => Promise<void>;
  getAllStandardsLists: () => Promise<Standards>;
  getStandardsListByDate: (date: string) => Promise<StandardTask[]>;
  clearAllData: () => Promise<void>;
  removeStandardTask: (taskId: string) => Promise<void>;
};

const StandardsDB: StandardsDBType = {
  saveList,
  getAllStandardsLists,
  getStandardsListByDate,
  clearAllData,
  removeStandardTask,
};

export default StandardsDB;
