"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { PowerList, PowerLists } from '@/types/powerList';
import { calculatePowerListStats, isPowerListComplete } from '@/logic/powerList';
import {
  NavigateToDate,
  AddStandardTask,
  RemoveStandardTask,
  UpdateStandardTask,
  UpdateTask,
  ToggleTaskCompletion,
  SavePowerList,
  HandleKeyDown,
  ToggleEditMode,
  OnInit
} from '@/useCases/powerList';

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
  const standardTaskRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);

  const canNavigateForward = currentDate < today;
  const canNavigateBackward = getCanNavigateBackward(currentDate, powerLists);

  const onInit = useCallback(
    OnInit({
      today,
      setPowerLists,
      setIsLoading,
      setCurrentPowerList,
      setIsEditing
    }),
    []
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
    const standardTaskInputCount = currentPowerList?.standardTasks.length || 0;
    if (hasCurrentPowerList) {
      const createStandardTaskRefs = Array.from({ length: standardTaskInputCount }, () => React.createRef<HTMLInputElement>());
      standardTaskRefs.current = createStandardTaskRefs as React.RefObject<HTMLInputElement>[];
    }
  }, [currentPowerList?.standardTasks.length]);

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
      powerLists,
      setCurrentPowerList,
      canNavigateForward,
      canNavigateBackward
    }),
    [currentDate, powerLists, setCurrentDate, canNavigateForward, canNavigateBackward]
  );

  const updateTask = useCallback(
    UpdateTask({
      currentPowerList,
      setCurrentPowerList,
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const updateStandardTask = useCallback(
    UpdateStandardTask({
      currentPowerList,
      setCurrentPowerList
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const addStandardTask = useCallback(
    AddStandardTask({
      currentPowerList,
      setCurrentPowerList
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const removeStandardTask = useCallback(
    RemoveStandardTask({
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
      standardTaskRefs: standardTaskRefs.current,
    }),
    [currentPowerList, powerListRefs, standardTaskRefs]
  );

  return {
    state: {
      today,
      currentPowerList,
      currentDate,
      isEditing,
      isLoading,
      powerListRefs: powerListRefs.current,
      standardTaskRefs: standardTaskRefs.current,
      canSave: currentPowerList ? isPowerListComplete(currentPowerList) : false,
      canNavigateForward,
      canNavigateBackward,
    },
    updateTask,
    updateStandardTask,
    addStandardTask,
    removeStandardTask,
    toggleTaskCompletion,
    savePowerList,
    toggleEditMode,
    getStats,
    navigateToDate,
    handleKeyDown,
    updatePowerListsItem,
  };
}
