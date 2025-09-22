"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { TaskList } from '@/types/powerList';
import powerList from '@/middleware/powerList';
import {
  AddSideTask,
  GetStats,
  HandleKeyDown,
  InitializeApp,
  LoadTaskListForDate,
  NavigateToDate,
  RemoveSideTask,
  SaveTaskList,
  ToggleEditMode,
  ToggleTaskCompletion,
  UpdateSideTask,
  UpdateTask,
} from '@/logic/powerList';
import {
  createTaskList,
  updateTaskListStatus,
  generateMissedDays,
  getMostRecentTasks,
  isTaskListComplete,
  normalizeTaskList,
  createEmptyTask,
} from '@/logic/powerList/powerListLogic';

export function usePowerListService() {
  const today = new Date().toLocaleDateString();
  const [currentTaskList, setCurrentTaskList] = useState<TaskList | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(today);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create refs for all inputs
  const powerListRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);
  const sideTaskRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);

  const canNavigateNext = currentDate < today;

  // Initialize refs
  useEffect(() => {
    const powerListInputCount = 5;
    const createPowerListRefs = Array.from({ length: powerListInputCount }, () => React.createRef<HTMLInputElement>());
    powerListRefs.current = createPowerListRefs as React.RefObject<HTMLInputElement>[];
  }, []);

  useEffect(() => {
    const hasCurrentTaskList = Boolean(currentTaskList);
    const sideTaskInputCount = currentTaskList?.sideTasks.length || 0;
    if (hasCurrentTaskList) {
      const createSideTaskRefs = Array.from({ length: sideTaskInputCount }, () => React.createRef<HTMLInputElement>());
      sideTaskRefs.current = createSideTaskRefs as React.RefObject<HTMLInputElement>[];
    }
  }, [currentTaskList?.sideTasks.length]);

  const loadTaskListForDate = useCallback(
    LoadTaskListForDate({
      setIsLoading,
      setCurrentTaskList,
      setIsEditing,
      today,
      currentDate,
      powerList,
      generateMissedDays,
      createTaskList,
      getMostRecentTasks,
      normalizeTaskList,
      isTaskListComplete,
    }),
    [setIsLoading, setCurrentTaskList, setIsEditing, today, currentDate, powerList]
  );

  const initializeApp = useCallback(
    InitializeApp({
      loadTaskListForDate,
      currentDate,
    }),
    [loadTaskListForDate, currentDate]
  );

  const navigateToDate = useCallback(
    NavigateToDate({
      currentDate,
      today,
      setCurrentDate,
    }),
    [currentDate, today, setCurrentDate]
  );

  const updateTask = useCallback(
    UpdateTask({
      currentTaskList,
      setCurrentTaskList,
      updateTaskListStatus,
    }),
    [currentTaskList, setCurrentTaskList, updateTaskListStatus]
  );

  const updateSideTask = useCallback(
    UpdateSideTask({
      currentTaskList,
      setCurrentTaskList,
      updateTaskListStatus,
    }),
    [currentTaskList, setCurrentTaskList, updateTaskListStatus]
  );

  // updateSideTask logic is similar to updateTask, can be refactored similarly if needed
  // For now, keep as is or refactor to its own HOF if required

  const addSideTask = useCallback(
    AddSideTask({
      currentTaskList,
      setCurrentTaskList,
      updateTaskListStatus,
      createEmptyTask,
    }),
    [currentTaskList, setCurrentTaskList, updateTaskListStatus, createEmptyTask]
  );

  const removeSideTask = useCallback(
    RemoveSideTask({
      currentTaskList,
      setCurrentTaskList,
      updateTaskListStatus,
    }),
    [currentTaskList, setCurrentTaskList, updateTaskListStatus]
  );

  const toggleTaskCompletion = useCallback(
    ToggleTaskCompletion({
      currentTaskList,
      isEditing,
      currentDate,
      setCurrentTaskList,
      updateTaskStatus: powerList.updateTaskStatus,
      updateTaskListStatus,
    }),
    [currentTaskList, isEditing, currentDate, setCurrentTaskList, powerList.updateTaskStatus, updateTaskListStatus]
  );

  const saveTaskList = useCallback(
    SaveTaskList({
      currentTaskList,
      currentDate,
      today,
      setCurrentTaskList,
      updateTaskListStatus,
      saveTasksForDate: powerList.saveTasksForDate,
      setIsEditing,
    }),
    [currentTaskList, currentDate, today, setCurrentTaskList, updateTaskListStatus, powerList.saveTasksForDate, setIsEditing]
  );

  const toggleEditMode = useCallback(
    ToggleEditMode({
      isEditing,
      setIsEditing,
    }),
    [isEditing, setIsEditing]
  );

  const getStats = useCallback(
    GetStats({
      getAllTaskHistory: powerList.getAllTaskHistory,
    }),
    [powerList.getAllTaskHistory]
  );

  const handleKeyDown = useCallback(
    HandleKeyDown({
      currentTaskList,
      powerListRefs: powerListRefs.current,
      sideTaskRefs: sideTaskRefs.current,
    }),
    [currentTaskList, powerListRefs, sideTaskRefs]
  );

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return {
    state: {
      today,
      currentTaskList,
      currentDate,
      isEditing,
      isLoading,
      powerListRefs: powerListRefs.current,
      sideTaskRefs: sideTaskRefs.current,
      isWin: currentTaskList?.isWin || false,
      canSave: currentTaskList ? isTaskListComplete(currentTaskList) : false,
      canNavigateNext
    },
    updateTask,
    updateSideTask,
    addSideTask,
    removeSideTask,
    toggleTaskCompletion,
    saveTaskList,
    toggleEditMode,
    getStats,
    navigateToDate,
    handleKeyDown,
  };
}
