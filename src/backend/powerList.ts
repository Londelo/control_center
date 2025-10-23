"use client"

import { PowerList, PowerLists } from '@/types/powerList';
import ControlCenterDB from './indexedDB';
import LocalStore from './localStorage';

const save = async (powerList: PowerList): Promise<void> => {
  await ControlCenterDB.upsert('PowerList', powerList, powerList.date);
};

const getAllPowerLists = async (): Promise<PowerLists> => {
  const powerList = await ControlCenterDB.getAll('PowerList');
  const normalizedList: PowerLists = {};
  powerList.forEach((item) => {
    if (item.date) normalizedList[item.date] = item;
  });
  return normalizedList;
};

const clearAllData = async (): Promise<void> => {
  await ControlCenterDB.clearAll('PowerList');
};

const LAST_VIEWED_DATE = 'LAST_VIEWED_DATE';

const getLastViewedDate = (): string => {
  const data = LocalStore.get<string>(LAST_VIEWED_DATE);
  return data ? data : '';
};

const updateLastViewedDate = (date: string): void => {
  LocalStore.upsert(LAST_VIEWED_DATE, date)
};

export type PowerListType = {
  save: (powerList: PowerList) => Promise<void>;
  getAllPowerLists: () => Promise<Record<string, PowerList>>;
  getLastViewedDate: () => string;
  updateLastViewedDate: (date: string) => void;
  clearAllData: () => Promise<void>;
};

const PowerListDB: PowerListType = {
  save,
  getAllPowerLists,
  getLastViewedDate,
  updateLastViewedDate,
  clearAllData,
};

export default PowerListDB;
