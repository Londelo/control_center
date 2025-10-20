"use client"

import { StandardTask, Standards } from '@/types/standards';
import ControlCenterDB from './indexedDB';

const getStandardTaskByDateAndText = async (date: string, text: string): Promise<StandardTask | undefined> => {
  return await ControlCenterDB.getTable("Standards")
    .where({ date, text })
    .first();
};

const saveList = async (standardTasks: StandardTask[]): Promise<void> => {
  for (const task of standardTasks) {
    await ControlCenterDB.upsert('Standards', task, task.id);
  }
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
  const standardTasks = await ControlCenterDB.getAll('Standards');
  await Promise.all(standardTasks.map((task) => ControlCenterDB.remove('Standards', task.id)));
};

const removeStandardTask = async (taskId: string): Promise<void> => {
  await ControlCenterDB.remove('Standards', taskId);
};

export type StandardsDBType = {
  saveList: (standardTasks: StandardTask[]) => Promise<void>;
  getAllStandardsLists: () => Promise<Standards>;
  getStandardsListByDate: (date: string) => Promise<StandardTask[]>;
  getStandardTaskByDateAndText: (date: string, text: string) => Promise<StandardTask | undefined>;
  clearAllData: () => Promise<void>;
  removeStandardTask: (taskId: string) => Promise<void>;
};

const StandardsDB: StandardsDBType = {
  saveList,
  getAllStandardsLists,
  getStandardsListByDate,
  getStandardTaskByDateAndText,
  clearAllData,
  removeStandardTask,
};

export default StandardsDB;
