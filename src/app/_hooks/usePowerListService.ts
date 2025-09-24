"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { PowerList, PowerLists } from '@/types/powerList';
import { calculatePowerListStats, isPowerListComplete } from '@/logic/powerList';
import createMockPowerLists from '@/tools/createMockPowerLists';
import {
  HandleMissedDays,
  HandleLostDays,
  LoadPowerListForDate,
  NavigateToDate,
  AddSideTask,
  RemoveSideTask,
  UpdateSideTask,
  UpdateTask,
  ToggleTaskCompletion,
  SavePowerList,
  HandleKeyDown,
  ToggleEditMode,
  OnInit
} from '@/useCases/powerList';
import db from '@/logic/powerList/db';

const today = new Date().toLocaleDateString();

const getCanNavigateBackward = (date: string, lists: PowerLists) => {
  const previousDateObject = new Date(date);
  previousDateObject.setDate(previousDateObject.getDate() - 1);
  const previousDateString = previousDateObject.toLocaleDateString();
  return Boolean(lists[previousDateString]);
};

export function usePowerListService() {
  const [powerLists, setPowerLists] = useState<PowerLists>({});
  const [currentPowerList, setCurrentPowerList] = useState<PowerList | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(today);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const powerListRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);
  const sideTaskRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);

  const canNavigateForward = currentDate < today;
  const canNavigateBackward = getCanNavigateBackward(currentDate, powerLists);

  const handleMissedDays = useCallback(HandleMissedDays(), [])
  const handleLostDays = useCallback(HandleLostDays(), [])

  const onInit = useCallback(
    OnInit({
      today,
      setPowerLists,
      handleMissedDays,
      handleLostDays,
      loadPowerListForDate
    }),
    [setPowerLists, handleMissedDays, handleLostDays, loadPowerListForDate]
  );

  const loadPowerListForDate = useCallback(
    LoadPowerListForDate({
      setIsLoading,
      setCurrentPowerList,
      setIsEditing,
      setPowerLists,
      today
    }),
    [setIsLoading, setCurrentPowerList, setIsEditing, setPowerLists, today]
  );

  //ON INIT
  useEffect(() => {
    onInit();
  }, [onInit]);

  // Initialize refs
  useEffect(() => {
    const powerListInputCount = 5;
    const createPowerListRefs = Array.from({ length: powerListInputCount }, () => React.createRef<HTMLInputElement>());
    powerListRefs.current = createPowerListRefs as React.RefObject<HTMLInputElement>[];
  }, []);

  useEffect(() => {
    const hasCurrentPowerList = Boolean(currentPowerList);
    const sideTaskInputCount = currentPowerList?.sideTasks.length || 0;
    if (hasCurrentPowerList) {
      const createSideTaskRefs = Array.from({ length: sideTaskInputCount }, () => React.createRef<HTMLInputElement>());
      sideTaskRefs.current = createSideTaskRefs as React.RefObject<HTMLInputElement>[];
    }
  }, [currentPowerList?.sideTasks.length]);

  const getStats = useCallback(() => {
    return calculatePowerListStats(powerLists);
  }, [powerLists]);

  const updatePowerListsItem = useCallback(
    (date:string, powerList: PowerList) => {
      setPowerLists({
        ...powerLists,
        [date]: powerList,
      });
    },
    [setPowerLists, powerLists]
  );

  const navigateToDate = useCallback(
    NavigateToDate({
      currentDate,
      setCurrentDate,
      canNavigateForward,
      canNavigateBackward,
      loadPowerListForDate,
    }),
    [currentDate, setCurrentDate, canNavigateForward, canNavigateBackward, loadPowerListForDate]
  );

  const updateTask = useCallback(
    UpdateTask({
      currentPowerList,
      setCurrentPowerList,
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const updateSideTask = useCallback(
    UpdateSideTask({
      currentPowerList,
      setCurrentPowerList
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const addSideTask = useCallback(
    AddSideTask({
      currentPowerList,
      setCurrentPowerList
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const removeSideTask = useCallback(
    RemoveSideTask({
      currentPowerList,
      setCurrentPowerList
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const toggleTaskCompletion = useCallback(
    ToggleTaskCompletion({
      currentPowerList,
      isEditing,
      currentDate,
      today,
      setCurrentPowerList,
      updatePowerListsItem
    }),
    [currentPowerList, isEditing, currentDate, today, setCurrentPowerList, updatePowerListsItem]
  );

  const savePowerList = useCallback(
    SavePowerList({
      currentPowerList,
      currentDate,
      today,
      setCurrentPowerList,
      setIsEditing,
      updatePowerListsItem
    }),
    [currentPowerList, currentDate, today, setCurrentPowerList, setIsEditing, updatePowerListsItem]
  );

  const toggleEditMode = useCallback(
    ToggleEditMode({
      isEditing,
      setIsEditing,
    }),
    [isEditing, setIsEditing]
  );

  const handleKeyDown = useCallback(
    HandleKeyDown({
      currentPowerList,
      powerListRefs: powerListRefs.current,
      sideTaskRefs: sideTaskRefs.current,
    }),
    [currentPowerList, powerListRefs, sideTaskRefs]
  );

  return {
    state: {
      today,
      currentPowerList,
      currentDate,
      isEditing,
      isLoading,
      powerListRefs: powerListRefs.current,
      sideTaskRefs: sideTaskRefs.current,
      canSave: currentPowerList ? isPowerListComplete(currentPowerList) : false,
      canNavigateForward,
      canNavigateBackward,
    },
    updateTask,
    updateSideTask,
    addSideTask,
    removeSideTask,
    toggleTaskCompletion,
    savePowerList,
    toggleEditMode,
    getStats,
    navigateToDate,
    handleKeyDown,
    updatePowerListsItem,
  };
}
