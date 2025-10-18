"use client"

import { StandardTask, Standards } from '@/types/standards';
import ControlCenterDB from './indexedDB';

const saveStandardsList = async (_date: string, standardTasks: StandardTask[]): Promise<void> => {
  await Promise.all(
    standardTasks.map(task => ControlCenterDB.upsert('Standards', task))
  );
};

const getAllStandardsLists = async (): Promise<Standards> => {
  const standardTasks = await ControlCenterDB.getAll('Standards');
  const normalizedStandards: Standards = {};

  standardTasks.forEach((task) => {
    if (task.date) {
      if (!normalizedStandards[task.date]) {
        normalizedStandards[task.date] = [];
      }
      normalizedStandards[task.date].push(task);
    }
  });

  return normalizedStandards;
};

const getStandardsListByDate = async (date: string): Promise<StandardTask[]> => {
  const allStandards = await getAllStandardsLists();
  return allStandards[date] || [];
};

const clearAllData = async (): Promise<void> => {
  // if (!confirm('Are you sure you want to clear all standard tasks? This action cannot be undone.')) {
  //   return;
  // }
  const standardTasks = await ControlCenterDB.getAll('Standards');
  await Promise.all(standardTasks.map((task) => ControlCenterDB.remove('Standards', task.id)));
};

const removeStandardTask = async (taskId: string): Promise<void> => {
  await ControlCenterDB.remove('Standards', taskId);
};

export type StandardsDBType = {
  saveStandardsList: (date: string, standardTasks: StandardTask[]) => Promise<void>;
  getAllStandardsLists: () => Promise<Standards>;
  getStandardsListByDate: (date: string) => Promise<StandardTask[]>;
  clearAllData: () => Promise<void>;
  removeStandardTask: (taskId: string) => Promise<void>;
};

const StandardsDB: StandardsDBType = {
  saveStandardsList,
  getAllStandardsLists,
  getStandardsListByDate,
  clearAllData,
  removeStandardTask,
};

export default StandardsDB;
