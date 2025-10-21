"use client"

import { PowerList, PowerLists } from '@/types/powerList';
import ControlCenterDB from './indexedDB';
import LocalStore from './localStorage';

const saveList = async (powerList: PowerList): Promise<void> => {
  await ControlCenterDB.upsert('PowerList', powerList, powerList.date);
};

const getAllPowerLists = async (): Promise<PowerLists> => {
  //TODO: I think we can do .toCollection, so we need DB.getAll_ARR and DB.getAll_Obj
  // powerList db is already stored by date
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
  saveList: (powerList: PowerList) => Promise<void>;
  getAllPowerLists: () => Promise<Record<string, PowerList>>;
  getLastViewedDate: () => string;
  updateLastViewedDate: (date: string) => void;
  clearAllData: () => Promise<void>;
};

const PowerListDB: PowerListType = {
  saveList,
  getAllPowerLists,
  getLastViewedDate,
  updateLastViewedDate,
  clearAllData,
};

export default PowerListDB;
