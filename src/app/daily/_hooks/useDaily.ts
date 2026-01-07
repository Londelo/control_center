"use client"

import { useState, useEffect, useCallback } from 'react';
import { PowerList, PowerLists, Task } from '@/types/powerList';
import { Standard, Standards } from '@/types/standards';
import { ToDoLists, ToDoList } from '@/types/todoToday';
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
import {
  AddToDoTask,
  RemoveToDoTask,
  UpdateToDoTask,
  ToggleToDoTaskCompletion,
  SaveToDoList,
  OnInit as ToDoOnInit
} from '@/useCases/todoToday';

const today = new Date().toLocaleDateString();

const getCanNavigateBackward = (date: string, lists: PowerLists) => {
  const previousDateObject = new Date(date);
  previousDateObject.setDate(previousDateObject.getDate() - 1);
  const previousDateString = previousDateObject.toLocaleDateString();
  return Boolean(lists[previousDateString]);
};

export function useDaily() {
  const [powerLists, setPowerLists] = useState<PowerLists>({});
  const [currentPowerList, setCurrentPowerList] = useState<PowerList>({
    id: '',
    date: '',
    tasks: [],
    isWin: false,
    isLoss: false,
    isComplete: false
  });

  const [allStandards, setAllStandards] = useState<Standards>({});
  const [currentStandardTasks, setCurrentStandardTasks] = useState<Standard>({ id: '', date: '', tasks: [] });

  const [allToDos, setAllToDos] = useState<ToDoLists>({});
  const [currentToDoTasks, setCurrentToDoTasks] = useState<ToDoList>({ id: '', date: '', tasks: [] });
  const [showToDoSection, setShowToDoSection] = useState(false);

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

  const todoOnInit = useCallback(
    ToDoOnInit({
      today,
      setAllToDos,
      setCurrentToDoTasks,
      setShowToDoSection
    }),
    []
  );

  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      await ControlCenterDB.handleOpenDatabase();

      if(process.env.NEXT_PUBLIC_MOCK_TASKS === 'true') {
        console.warn("MOCKING POWER LISTS")
        await createMockPowerLists(today);
      }

      await Promise.all([powerListOnInit(), standardsOnInit(), todoOnInit()]);
      setIsLoading(false);
    };
    initializeApp();
  }, [powerListOnInit, standardsOnInit, todoOnInit]);


  const getStats = useCallback(() => {
    return calculatePowerListStats(powerLists);
  }, [powerLists]);

  const updatePowerListState = useCallback(
    (powerList: PowerList) => {
      setCurrentPowerList(powerList)
      setPowerLists({
        ...powerLists,
        [powerList.date]: powerList,
      });
    },
    [setPowerLists, setCurrentPowerList, powerLists]
  );

  const updateStandardState = useCallback(
    (standard: Standard) => {
      setCurrentStandardTasks(standard)
      setAllStandards({
        ...allStandards,
        [standard.date]: standard,
      });
    },
    [setAllStandards, allStandards]
  );

  const updateToDoListState = useCallback(
    (toDoList: ToDoList) => {
      setCurrentToDoTasks(toDoList)
      setAllToDos({
        ...allToDos,
        [toDoList.date]: toDoList,
      });
    },
    [setAllToDos, allToDos]
  );

  const navigateToDate = useCallback(
    NavigateToDate({
        currentDate,
        setCurrentDate,
        powerLists,
        allStandards,
        allToDos,
        setCurrentPowerList,
        setCurrentStandardTasks,
        setCurrentToDoTasks,
        setShowToDoSection,
        canNavigateForward,
        canNavigateBackward
      }),
    [currentDate, powerLists, allStandards, allToDos, setCurrentDate, setCurrentPowerList, setCurrentStandardTasks, setCurrentToDoTasks, setShowToDoSection, canNavigateForward, canNavigateBackward]
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
      currentStandardTasks,
      setCurrentStandardTasks
    }),
    [currentStandardTasks, setCurrentStandardTasks]
  );

  const removeStandardTask = useCallback(
    RemoveStandardTask({
      currentStandardTasks,
      setCurrentStandardTasks
    }),
    [currentStandardTasks, setCurrentStandardTasks]
  );

  const updateToDoTask = useCallback(
    UpdateToDoTask({
      currentToDoTasks,
      setCurrentToDoTasks
    }),
    [currentToDoTasks, setCurrentToDoTasks]
  );

  const addToDoTask = useCallback(
    AddToDoTask({
      currentToDoTasks,
      setCurrentToDoTasks
    }),
    [currentToDoTasks, setCurrentToDoTasks]
  );

  const removeToDoTask = useCallback(
    RemoveToDoTask({
      currentToDoTasks,
      setCurrentToDoTasks
    }),
    [currentToDoTasks, setCurrentToDoTasks]
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
      currentStandardTasks,
      setCurrentStandardTasks
    }),
    [currentStandardTasks, setCurrentStandardTasks]
  );

  const toggleToDoTaskCompletion = useCallback(
    ToggleToDoTaskCompletion({
      currentToDoTasks,
      isEditing,
      updateToDoListState
    }),
    [currentToDoTasks, updateToDoListState, isEditing]
  );

  const toggleTaskCompletion = useCallback(
    ToggleTaskCompletion({
      currentPowerList,
      isEditing,
      currentDate,
      today,
      updatePowerListState
    }),
    [currentPowerList, isEditing, currentDate, today, updatePowerListState]
  );

  const toggleStandardTaskCompletion = useCallback(
    ToggleStandardTaskCompletion({
      currentStandardTasks,
      isEditing,
      updateStandardState
    }),
    [currentDate, currentStandardTasks, isEditing]
  );

  const toggleEditMode = useCallback(
    ToggleEditMode({
      isEditing,
      setIsEditing,
    }),
    [isEditing, setIsEditing]
  );

  const saveStandards = useCallback(
    SaveStandardsList({
      currentStandard: currentStandardTasks,
      updateStandardState
    }),
    [currentStandardTasks, updateStandardState]
  );

  const saveToDoList = useCallback(
    SaveToDoList({
      currentToDoList: currentToDoTasks,
      updateToDoListState
    }),
    [currentToDoTasks, updateToDoListState]
  );

  const savePowerList = useCallback(
    async () => {
      await SavePowerList({
        currentPowerList,
        currentDate,
        today,
        setIsEditing,
        updatePowerListState
      })();
      //TODO: these need to be moved
      await saveStandards();
      await saveToDoList();
    },
    [currentPowerList, currentDate, today, setCurrentPowerList, setIsEditing, updatePowerListState, saveStandards, saveToDoList]
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

  const handleAddToDoList = useCallback(() => {
    setShowToDoSection(true);
  }, []);

  const reorderStandardTasks = useCallback(async (reorderedTasks: typeof currentStandardTasks.tasks) => {
    const updatedStandard = {
      ...currentStandardTasks,
      tasks: reorderedTasks
    };
    updateStandardState(updatedStandard)
    await SaveStandardsList({
      currentStandard: updatedStandard,
      updateStandardState
    })()
  }, [currentStandardTasks, updateStandardState, saveStandards]);

  const reorderToDoTasks = useCallback(async (reorderedTasks: typeof currentToDoTasks.tasks) => {
    const updatedToDoList = {
      ...currentToDoTasks,
      tasks: reorderedTasks
    };
    updateToDoListState(updatedToDoList)
    await SaveToDoList({
      currentToDoList: updatedToDoList,
      updateToDoListState
    })()
  }, [currentToDoTasks, updateToDoListState, saveToDoList]);

  return {
    state: {
      today,
      currentPowerList,
      currentStandardTasks,
      currentToDoTasks,
      showToDoSection,
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
      allStandards,
      allToDos
    },
    updateTask,
    updateStandardTask,
    addStandardTask,
    removeStandardTask,
    removeTask,
    convertToStandard,
    toggleTaskCompletion,
    toggleStandardTaskCompletion,
    updateToDoTask,
    addToDoTask,
    removeToDoTask,
    toggleToDoTaskCompletion,
    savePowerList,
    toggleEditMode,
    getStats,
    navigateToDate,
    updatePowerListState,
    handleDetailsModalClose,
    handleEditFromDetails,
    handleModalClose,
    handleTaskClick,
    handleTaskSettings,
    handleAddToDoList,
    reorderStandardTasks,
    reorderToDoTasks
  };
}
