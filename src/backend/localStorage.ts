import { TaskList } from '@/types';

const STORAGE_KEY = 'powerlist_data';

export interface StorageData {
  taskLists: Record<string, TaskList>;
  lastAccessDate: string;
}

class LocalStorageBackend {
  private getStorageData(): StorageData {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return { taskLists: {}, lastAccessDate: '' };
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { taskLists: {}, lastAccessDate: '' };
    }
  }

  private saveStorageData(data: StorageData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  getTasksByDate(date: string): TaskList | null {
    const data = this.getStorageData();
    return data.taskLists[date] || null;
  }

  saveTasksForDate(date: string, taskList: TaskList): void {
    const data = this.getStorageData();
    data.taskLists[date] = taskList;
    data.lastAccessDate = date;
    this.saveStorageData(data);
  }

  getAllTaskHistory(): Record<string, TaskList> {
    const data = this.getStorageData();
    return data.taskLists;
  }

  updateTaskStatus(date: string, taskId: string, completed: boolean): void {
    const data = this.getStorageData();
    const taskList = data.taskLists[date];
    
    if (taskList) {
      const task = taskList.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = completed;
        taskList.updatedAt = new Date().toISOString();
        this.saveStorageData(data);
      }
    }
  }

  getLastAccessDate(): string {
    const data = this.getStorageData();
    return data.lastAccessDate;
  }

  clearAllData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const localStorageBackend = new LocalStorageBackend();