"use client"

import { useState, useEffect, useCallback } from 'react';
import { PowerList, PowerLists, Task } from '@/types/powerList';
import { StandardTask, Standards } from '@/types/standards';
import { calculatePowerListStats, isPowerListComplete } from '@/logic/powerList';
import ControlCenterDB from '@/backend/indexedDB';
import createMockPowerLists from '@/tools/createMockPowerLists';

import {
  NavigateToDate,
  RemoveTask,
  UpdateTask,
  ToggleTaskCompletion,
  SavePowerList,
  ToggleEditMode,
  OnInit as PowerListOnInit,
} from '@/useCases/powerList';
import {
  AddStandardTask,
  RemoveStandardTask,
  UpdateStandardTask,
  ToggleStandardTaskCompletion,
  SaveStandardsList,
  ConvertToStandard,
  OnInit as StandardsOnInit
} from '@/useCases/standards';

const today = new Date().toLocaleDateString();

const getCanNavigateBackward = (date: string, lists: PowerLists) => {
  const previousDateObject = new Date(date);
  previousDateObject.setDate(previousDateObject.getDate() - 1);
  const previousDateString = previousDateObject.toLocaleDateString();
  return Boolean(lists[previousDateString]);
};

export function useDaily() {
  const [powerLists, setPowerLists] = useState<PowerLists>({});
  const [currentPowerList, setCurrentPowerList] = useState<PowerList | null>(null);
  const [allStandards, setAllStandards] = useState<Standards>({});
  const [currentStandardTasks, setCurrentStandardTasks] = useState<StandardTask[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(today);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState<Task | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);



  const canNavigateForward = !isEditing && new Date(currentDate).getTime() < new Date(today).getTime();
  const canNavigateBackward = !isEditing && getCanNavigateBackward(currentDate, powerLists);

  const powerListOnInit = useCallback(
    PowerListOnInit({
      today,
      setPowerLists,
      setCurrentPowerList,
      setIsEditing
    }),
    []
  );

  const standardsOnInit = useCallback(
    StandardsOnInit({
      today,
      setAllStandards,
      setCurrentStandardTasks,
      setIsLoading
    }),
    []
  );

  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      await ControlCenterDB.handleOpenDatabase();

      if(process.env.NEXT_PUBLIC_MOCK_TASKS) {
        console.warn("MOCKING POWER LISTS")
        await createMockPowerLists(today);
      }

      await Promise.all([powerListOnInit(), standardsOnInit()]);
      setIsLoading(false);
    };
    initializeApp();
  }, [powerListOnInit, standardsOnInit]);


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
      allStandards,
      setCurrentPowerList,
      setCurrentStandardTasks,
      canNavigateForward,
      canNavigateBackward
    }),
    [currentDate, powerLists, allStandards, setCurrentDate, canNavigateForward, canNavigateBackward]
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
      currentStandardTasks,
      setCurrentStandardTasks
    }),
    [currentStandardTasks, setCurrentStandardTasks]
  );

  const addStandardTask = useCallback(
    AddStandardTask({
      currentDate,
      currentStandardTasks,
      setCurrentStandardTasks
    }),
    [currentDate, currentStandardTasks, setCurrentStandardTasks]
  );

  const removeStandardTask = useCallback(
    RemoveStandardTask({
      currentStandardTasks,
      setCurrentStandardTasks
    }),
    [currentStandardTasks, setCurrentStandardTasks]
  );

  const removeTask = useCallback(
    RemoveTask({
      currentPowerList,
      setCurrentPowerList
    }),
    [currentPowerList, setCurrentPowerList]
  );

  const convertToStandard = useCallback(
    ConvertToStandard({
      currentDate,
      currentStandardTasks,
      setCurrentStandardTasks
    }),
    [currentDate, currentStandardTasks, setCurrentStandardTasks]
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

  const toggleStandardTaskCompletion = useCallback(
    ToggleStandardTaskCompletion({
      currentStandardTasks,
      setCurrentStandardTasks,
      isEditing
    }),
    [currentDate, currentStandardTasks, setCurrentStandardTasks, isEditing]
  );

  const saveList = useCallback(
    SaveStandardsList({
      currentDate,
      currentStandardTasks
    }),
    [currentDate, currentStandardTasks]
  );

  const savePowerList = useCallback(
    async () => {
      await SavePowerList({
        currentPowerList,
        currentDate,
        today,
        setCurrentPowerList,
        setIsEditing,
        updatePowerListsItem
      })();
      await saveList();
    },
    [currentPowerList, currentDate, today, setCurrentPowerList, setIsEditing, updatePowerListsItem, saveList]
  );

  const toggleEditMode = useCallback(
    ToggleEditMode({
      isEditing,
      setIsEditing,
    }),
    [isEditing, setIsEditing]
  );


  const handleTaskSettings = useCallback((taskId: string) => {
    const task = currentPowerList?.tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsSettingsModalOpen(true);
    }
  }, [currentPowerList]);

  const handleTaskClick = useCallback((taskId: string) => {
    const task = currentPowerList?.tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTaskForDetails(task);
      setIsDetailsModalOpen(true);
    }
  }, [currentPowerList]);

  const handleModalClose = useCallback(() => {
    setIsSettingsModalOpen(false);
    setSelectedTask(null);
  }, []);

  const handleDetailsModalClose = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedTaskForDetails(null);
  }, []);

  const handleEditFromDetails = useCallback(() => {
    if (selectedTaskForDetails) {
      setSelectedTask(selectedTaskForDetails);
      setIsDetailsModalOpen(false);
      setIsSettingsModalOpen(true);
      setIsEditing(true);
    }
  }, [selectedTaskForDetails]);

  return {
    state: {
      today,
      currentPowerList,
      currentStandardTasks,
      currentDate,
      isEditing,
      isLoading,
      canSave: currentPowerList ? isPowerListComplete(currentPowerList) : false,
      canNavigateForward,
      canNavigateBackward,
      isSettingsModalOpen,
      isDetailsModalOpen,
      selectedTask,
      selectedTaskForDetails,
      powerLists,
      allStandards
    },
    updateTask,
    updateStandardTask,
    addStandardTask,
    removeStandardTask,
    removeTask,
    convertToStandard,
    toggleTaskCompletion,
    toggleStandardTaskCompletion,
    savePowerList,
    toggleEditMode,
    getStats,
    navigateToDate,
    updatePowerListsItem,
    handleDetailsModalClose,
    handleEditFromDetails,
    handleModalClose,
    handleTaskClick,
    handleTaskSettings
  };
}
