"use client"

import { ToDoList, ToDoLists } from '@/types/todoToday';
import ControlCenterDB from './indexedDB';

const save = async (toDoList: ToDoList): Promise<void> => {
  await ControlCenterDB.upsert('ToDoToday', toDoList, toDoList.date);
};

const getAllToDoLists = async (): Promise<ToDoLists> => {
  const toDoLists = await ControlCenterDB.getAll('ToDoToday');
  return toDoLists.reduce(
    (acc, toDoList) => {
      acc[toDoList.date] = toDoList;
      return acc;
    }, {} as ToDoLists
  );
};

const clearAllData = async (): Promise<void> => {
  await ControlCenterDB.clearAll('ToDoToday');
};

export type ToDoTodayDBType = {
  save: (toDoList: ToDoList) => Promise<void>;
  getAllToDoLists: () => Promise<ToDoLists>;
  clearAllData: () => Promise<void>;
};

const ToDoTodayDB: ToDoTodayDBType = {
  save,
  getAllToDoLists,
  clearAllData,
};

export default ToDoTodayDB;
