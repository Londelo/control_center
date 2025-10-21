"use client"

import { ToDoTask, ToDoTasks } from '@/types/todoToday';
import ControlCenterDB from './indexedDB';

const saveList = async (toDoTasks: ToDoTask[]): Promise<void> => {
  for (const task of toDoTasks) {
    await ControlCenterDB.upsert('ToDoToday', task, task.id);
  }
};

const getAllToDoLists = async (): Promise<ToDoTasks> => {
  const toDoTasks = await ControlCenterDB.getAll('ToDoToday');
  const normalizedToDos: ToDoTasks = {};

  toDoTasks.forEach((task) => {
    if (task.date) {
      if (!normalizedToDos[task.date]) {
        normalizedToDos[task.date] = [];
      }
      normalizedToDos[task.date].push(task);
    }
  });

  return normalizedToDos;
};

const clearAllData = async (): Promise<void> => {
  const toDoTasks = await ControlCenterDB.getAll('ToDoToday');
  await Promise.all(toDoTasks.map((task) => ControlCenterDB.remove('ToDoToday', task.id)));
};

const removeToDoTask = async (taskId: string): Promise<void> => {
  await ControlCenterDB.remove('ToDoToday', taskId);
};

export type ToDoTodayDBType = {
  saveList: (toDoTasks: ToDoTask[]) => Promise<void>;
  getAllToDoLists: () => Promise<ToDoTasks>;
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
