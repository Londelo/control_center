"use client"

import { ToDoList, ToDoLists } from '@/types/todoToday';
import ControlCenterDB from './indexedDB';

const saveList = async (toDoLists: ToDoList[]): Promise<void> => {
  for (const task of toDoLists) {
    await ControlCenterDB.upsert('ToDoToday', task, task.date);
  }
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
  const toDoLists = await ControlCenterDB.getAll('ToDoToday');
  await Promise.all(toDoLists.map((task) => ControlCenterDB.remove('ToDoToday', task.id)));
};

const removeToDoTask = async (taskId: string): Promise<void> => {
  await ControlCenterDB.remove('ToDoToday', taskId);
};

export type ToDoTodayDBType = {
  saveList: (toDoLists: ToDoList[]) => Promise<void>;
  getAllToDoLists: () => Promise<ToDoLists>;
  clearAllData: () => Promise<void>;
  removeToDoTask: (taskId: string) => Promise<void>;
};

const ToDoTodayDB: ToDoTodayDBType = {
  saveList,
  getAllToDoLists,
  clearAllData,
  removeToDoTask,
};

export default ToDoTodayDB;
