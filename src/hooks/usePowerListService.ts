import { useState, useEffect, useCallback, useRef } from 'react';
import React from 'react';
import { TaskList } from '@/types/powerList';
import powerList from '@/middleware/powerList';
import {
  createTaskList,
  updateTaskListStatus,
  generateMissedDays,
  getMostRecentTasks,
  isTaskListComplete,
  calculateAppStats,
  normalizeTaskList,
  createEmptyTask,
} from '@/logic/powerListLogic';

export function usePowerListService() {
  const [currentTaskList, setCurrentTaskList] = useState<TaskList | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create refs for all inputs
  const powerListRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);
  const sideTaskRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);

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

  const today = new Date().toISOString().split('T')[0];
  console.log(today)
  const canNavigateNext = currentDate < today;

  const loadTaskListForDate = useCallback(async (date: string) => {
    setIsLoading(true);

    try {
      // Get task list for the specified date
      let taskList = powerList.getTasksByDate(date);

      if (!taskList) {
        // If it's today and no list exists, handle missed days
        if (date === today) {
          const lastAccessDate = powerList.getLastAccessDate();
          const allHistory = powerList.getAllTaskHistory();

          if (lastAccessDate && lastAccessDate !== today) {
            // Generate missed days as losses
            const missedDays = generateMissedDays(lastAccessDate, today);

            for (const missedDay of missedDays) {
              const missedList = createTaskList(missedDay);
              missedList.isLoss = true;
              missedList.isComplete = false;
              powerList.saveTasksForDate(missedDay, missedList);
            }
          }

          // Create today's list from most recent tasks
          const { tasks: recentTasks, sideTasks: recentSideTasks } = getMostRecentTasks(allHistory);
          taskList = createTaskList(date, recentTasks, recentSideTasks);
          powerList.saveTasksForDate(date, taskList);
        } else {
          // For other dates, create empty list
          taskList = createTaskList(date);
        }
      } else {
        // Normalize existing task list
        taskList = normalizeTaskList(taskList);
      }

      setCurrentTaskList(taskList);
      setIsEditing(!isTaskListComplete(taskList));
    } catch (error) {
      console.error('Error initializing app:', error);
      // Fallback: create empty list
      const fallbackList = createTaskList(date);
      setCurrentTaskList(fallbackList);
      setIsEditing(true);
    } finally {
      setIsLoading(false);
    }
  }, [today]);

  const initializeApp = useCallback(async () => {
    await loadTaskListForDate(currentDate);
  }, [loadTaskListForDate, currentDate]);

  const navigateToDate = useCallback((direction: 'prev' | 'next') => {
    console.log(direction)
    // Prevent navigating to future dates
    if (direction === 'next' && currentDate >= today) {
      return;
    }

    const currentDateObj = new Date(currentDate);
    if (direction === 'prev') {
      currentDateObj.setDate(currentDateObj.getDate() - 1);
    } else {
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    const newDate = currentDateObj.toISOString().split('T')[0];
    setCurrentDate(newDate);
  }, [currentDate, today]);

  const updateTask = useCallback((taskId: string, text: string) => {
    if (!currentTaskList) return;

    const updatedTasks = currentTaskList.tasks.map(task =>
      task.id === taskId ? { ...task, text } : task
    );

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      tasks: updatedTasks,
    });

    setCurrentTaskList(updatedList);
  }, [currentTaskList]);

  const updateSideTask = useCallback((taskId: string, text: string) => {
    if (!currentTaskList) return;

    const updatedSideTasks = currentTaskList.sideTasks.map(task =>
      task.id === taskId ? { ...task, text } : task
    );

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      sideTasks: updatedSideTasks,
    });

    setCurrentTaskList(updatedList);
  }, [currentTaskList]);

  const addSideTask = useCallback(() => {
    if (!currentTaskList) return;

    const newTask = createEmptyTask(currentTaskList.sideTasks.length);
    const updatedSideTasks = [...currentTaskList.sideTasks, newTask];

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      sideTasks: updatedSideTasks,
    });

    setCurrentTaskList(updatedList);
  }, [currentTaskList]);

  const removeSideTask = useCallback((taskId: string) => {
    if (!currentTaskList) return;

    const updatedSideTasks = currentTaskList.sideTasks.filter(task => task.id !== taskId);

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      sideTasks: updatedSideTasks,
    });

    setCurrentTaskList(updatedList);
  }, [currentTaskList]);

  const toggleTaskCompletion = useCallback((taskId: string) => {
    if (!currentTaskList || isEditing) return;

    // Check both main tasks and side tasks
    const task = currentTaskList.tasks.find(t => t.id === taskId) ||
                 currentTaskList.sideTasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompletedStatus = !task.completed;

    // Update in backend
    powerList.updateTaskStatus(currentDate, taskId, newCompletedStatus);

    // Update local state for both task lists
    const updatedTasks = currentTaskList.tasks.map(t =>
      t.id === taskId ? { ...t, completed: newCompletedStatus } : t
    );

    const updatedSideTasks = currentTaskList.sideTasks.map(t =>
      t.id === taskId ? { ...t, completed: newCompletedStatus } : t
    );

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      tasks: updatedTasks,
      sideTasks: updatedSideTasks,
    });

    setCurrentTaskList(updatedList);
    powerList.saveTasksForDate(currentDate, updatedList);
  }, [currentTaskList, isEditing, currentDate]);

  const saveTaskList = useCallback(() => {
    if (!currentTaskList) return;

    const updatedList = updateTaskListStatus(currentTaskList);
    setCurrentTaskList(updatedList);
    powerList.saveTasksForDate(currentDate, updatedList);
    setIsEditing(false);
  }, [currentTaskList, currentDate]);

  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const getStats = useCallback(() => {
    const allHistory = powerList.getAllTaskHistory();
    return calculateAppStats(allHistory);
  }, []);

  const handleKeyDown = useCallback((listType: 'power' | 'side', index: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const powerListLength = 5;
      const sideTaskLength = currentTaskList?.sideTasks.length || 0;
      const totalInputs = powerListLength + sideTaskLength;

      let currentGlobalIndex: number;

      if (listType === 'power') {
        currentGlobalIndex = index;
      } else {
        currentGlobalIndex = powerListLength + index;
      }

      let nextGlobalIndex: number;

      if (e.key === 'ArrowDown') {
        nextGlobalIndex = (currentGlobalIndex + 1) % totalInputs;
      } else {
        nextGlobalIndex = (currentGlobalIndex - 1 + totalInputs) % totalInputs;
      }

      // Focus the next input
      if (nextGlobalIndex < powerListLength) {
        // Focus power list input
        powerListRefs.current[nextGlobalIndex]?.current?.focus();
      } else {
        // Focus side task input
        const sideIndex = nextGlobalIndex - powerListLength;
        sideTaskRefs.current[sideIndex]?.current?.focus();
      }
    }
  }, [currentTaskList?.sideTasks.length]);
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return {
    currentTaskList,
    currentDate,
    isEditing,
    isLoading,
    updateTask,
    updateSideTask,
    addSideTask,
    removeSideTask,
    toggleTaskCompletion,
    saveTaskList,
    toggleEditMode,
    getStats,
    navigateToDate,
    powerListRefs: powerListRefs.current,
    sideTaskRefs: sideTaskRefs.current,
    handleKeyDown,
    canSave: currentTaskList ? isTaskListComplete(currentTaskList) : false,
    isWin: currentTaskList?.isWin || false,
    canNavigateNext,
  };
}
