import { useState, useEffect, useCallback } from 'react';
import { TaskList, Task } from '@/types';
import { localStorageBackend } from '@/backend/localStorage';
import {
  createTaskList,
  updateTaskListStatus,
  generateMissedDays,
  getMostRecentTasks,
  isTaskListComplete,
  calculateAppStats,
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
      let todaysList = localStorageBackend.getTasksByDate(today);
      
      if (!todaysList) {
        // Check for missed days
        const lastAccessDate = localStorageBackend.getLastAccessDate();
        const allHistory = localStorageBackend.getAllTaskHistory();
        
        if (lastAccessDate && lastAccessDate !== today) {
          // Generate missed days as losses
          const missedDays = generateMissedDays(lastAccessDate, today);
          
          for (const missedDay of missedDays) {
            const missedList = createTaskList(missedDay);
            missedList.isLoss = true;
            missedList.isComplete = false;
            localStorageBackend.saveTasksForDate(missedDay, missedList);
          }
        }
        
        // Create today's list from most recent tasks
        const recentTasks = getMostRecentTasks(allHistory);
        todaysList = createTaskList(today, recentTasks);
        localStorageBackend.saveTasksForDate(today, todaysList);
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

  const toggleTaskCompletion = useCallback((taskId: string) => {
    if (!currentTaskList || isEditing) return;

    const task = currentTaskList.tasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompletedStatus = !task.completed;
    
    // Update in backend
    localStorageBackend.updateTaskStatus(today, taskId, newCompletedStatus);
    
    // Update local state
    const updatedTasks = currentTaskList.tasks.map(t =>
      t.id === taskId ? { ...t, completed: newCompletedStatus } : t
    );

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      tasks: updatedTasks,
    });

    setCurrentTaskList(updatedList);
    localStorageBackend.saveTasksForDate(today, updatedList);
  }, [currentTaskList, isEditing, today]);

  const saveTaskList = useCallback(() => {
    if (!currentTaskList) return;

    const updatedList = updateTaskListStatus(currentTaskList);
    setCurrentTaskList(updatedList);
    localStorageBackend.saveTasksForDate(today, updatedList);
    setIsEditing(false);
  }, [currentTaskList, today]);

  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const getStats = useCallback(() => {
    const allHistory = localStorageBackend.getAllTaskHistory();
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
    toggleTaskCompletion,
    saveTaskList,
    toggleEditMode,
    getStats,
    canSave: currentTaskList ? isTaskListComplete(currentTaskList) : false,
    isWin: currentTaskList?.isWin || false,
  };
}