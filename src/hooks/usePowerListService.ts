import { useState, useEffect, useCallback } from 'react';
import { TaskList, Task } from '@/types/powerList';
import powerList from '@/middleware/powerList';
import {
  createTaskList,
  updateTaskListStatus,
  generateMissedDays,
  getMostRecentTasks,
  isTaskListComplete,
  calculateAppStats,
  normalizeTaskList,
} from '@/logic/powerListLogic';

export function usePowerListService() {
  const [currentTaskList, setCurrentTaskList] = useState<TaskList | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  const initializeApp = useCallback(async () => {
    setIsLoading(true);

    try {
      // Get today's task list
      let todaysList = powerList.getTasksByDate(today);

      if (!todaysList) {
        // Check for missed days
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
        todaysList = createTaskList(today, recentTasks, recentSideTasks);
        powerList.saveTasksForDate(today, todaysList);
      } else {
        // Normalize existing task list to ensure sideTasks exists
        todaysList = normalizeTaskList(todaysList);
      }

      setCurrentTaskList(todaysList);
      setIsEditing(!isTaskListComplete(todaysList));
    } catch (error) {
      console.error('Error initializing app:', error);
      // Fallback: create empty list
      const fallbackList = createTaskList(today);
      setCurrentTaskList(fallbackList);
      setIsEditing(true);
    } finally {
      setIsLoading(false);
    }
  }, [today]);

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
    powerList.updateTaskStatus(today, taskId, newCompletedStatus);

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
    powerList.saveTasksForDate(today, updatedList);
  }, [currentTaskList, isEditing, today]);

  const saveTaskList = useCallback(() => {
    if (!currentTaskList) return;

    const updatedList = updateTaskListStatus(currentTaskList);
    setCurrentTaskList(updatedList);
    powerList.saveTasksForDate(today, updatedList);
    setIsEditing(false);
  }, [currentTaskList, today]);

  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const getStats = useCallback(() => {
    const allHistory = powerList.getAllTaskHistory();
    return calculateAppStats(allHistory);
  }, []);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return {
    currentTaskList,
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
    canSave: currentTaskList ? isTaskListComplete(currentTaskList) : false,
    isWin: currentTaskList?.isWin || false,
  };
}
