"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { TaskList } from '@/types/powerList';
import powerList from '@/controllers/powerList';
import { GetStats, isTaskListComplete } from '@/logic/powerList';
import {
  HandleMissedDays,
  LoadTaskListForDate,
  NavigateToDate,
  AddSideTask,
  RemoveSideTask,
  UpdateSideTask,
  UpdateTask,
  ToggleTaskCompletion,
  SaveTaskList,
  HandleKeyDown,
  ToggleEditMode
} from '../useCases/powerList';


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

  const handleMissedDays = useCallback(HandleMissedDays(), [])

  const loadTaskListForDate = useCallback(
    LoadTaskListForDate({
      setIsLoading,
      setCurrentTaskList,
      setIsEditing,
      today
    }),
    [setIsLoading, setCurrentTaskList, setIsEditing, today, currentDate, powerList]
  );

  //ON INIT
  useEffect(() => {
    handleMissedDays(today);
    loadTaskListForDate(today);
  }, [handleMissedDays, loadTaskListForDate]);

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
    }),
    [currentTaskList, setCurrentTaskList]
  );

  const updateSideTask = useCallback(
    UpdateSideTask({
      currentTaskList,
      setCurrentTaskList
    }),
    [currentTaskList, setCurrentTaskList]
  );

  const addSideTask = useCallback(
    AddSideTask({
      currentTaskList,
      setCurrentTaskList
    }),
    [currentTaskList, setCurrentTaskList]
  );

  const removeSideTask = useCallback(
    RemoveSideTask({
      currentTaskList,
      setCurrentTaskList
    }),
    [currentTaskList, setCurrentTaskList]
  );

  const toggleTaskCompletion = useCallback(
    ToggleTaskCompletion({
      currentTaskList,
      isEditing,
      currentDate,
      setCurrentTaskList
    }),
    [currentTaskList, isEditing, currentDate, setCurrentTaskList]
  );

  const saveTaskList = useCallback(
    SaveTaskList({
      currentTaskList,
      currentDate,
      today,
      setCurrentTaskList,
      setIsEditing
    }),
    [currentTaskList, currentDate, today, setCurrentTaskList, setIsEditing]
  );

  const toggleEditMode = useCallback(
    ToggleEditMode({
      isEditing,
      setIsEditing,
    }),
    [isEditing, setIsEditing]
  );

  const getStats = useCallback(GetStats(), []);

  const handleKeyDown = useCallback(
    HandleKeyDown({
      currentTaskList,
      powerListRefs: powerListRefs.current,
      sideTaskRefs: sideTaskRefs.current,
    }),
    [currentTaskList, powerListRefs, sideTaskRefs]
  );

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
