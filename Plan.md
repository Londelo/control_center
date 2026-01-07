# Plan: Remove 5-Task Requirement & DRY Refactoring

## Overview

Remove the hardcoded 5-task constraint from PowerList, allowing any number of tasks. A "win" will mean all tasks in the list are completed. Additionally, consolidate shared patterns across PowerList, StandardsList, and ToDoList.

---

## Part 1: Remove 5-Task Requirement

### Step 1: Update `calculateWinLoss`

**File:** `src/logic/powerList/index.ts` (lines 45-60)

**Current Code:**
```typescript
export function calculateWinLoss(powerList: PowerList, isToday: boolean = false): { isWin: boolean; isLoss: boolean } {

  const completedTasks = powerList.tasks.filter(task => task.completed).length;
  const isWin = completedTasks === 5;

  if (!isWin) {
    // Only today can be "in progress", other dates are losses if incomplete
    if (isToday) {
      return { isWin: false, isLoss: false };
    } else {
      return { isWin: false, isLoss: true };
    }
  }

  const isLoss = !isWin;
  return { isWin, isLoss };
}
```

**New Code:**
```typescript
export function calculateWinLoss(powerList: PowerList, isToday: boolean = false): { isWin: boolean; isLoss: boolean } {
  // Filter to only tasks that have text (actual tasks, not empty placeholders)
  const tasksWithText = powerList.tasks.filter(task => task.text.trim() !== '');

  // If no tasks exist, it's a loss (unless it's today, then in progress)
  if (tasksWithText.length === 0) {
    if (isToday) {
      return { isWin: false, isLoss: false };
    }
    return { isWin: false, isLoss: true };
  }

  const completedTasks = tasksWithText.filter(task => task.completed).length;
  const isWin = completedTasks === tasksWithText.length;

  if (!isWin) {
    // Only today can be "in progress", other dates are losses if incomplete
    if (isToday) {
      return { isWin: false, isLoss: false };
    } else {
      return { isWin: false, isLoss: true };
    }
  }

  return { isWin, isLoss: false };
}
```

**Commit:** `git add -A && git commit -m "Update calculateWinLoss to check all tasks instead of hardcoded 5"`

---

### Step 2: Update `createPowerList`

**File:** `src/logic/powerList/index.ts` (line 24)

**Current Code:**
```typescript
//TODO: set up overrides, then reflext the change where this is being called
export function createPowerList(date: string, tasks?: Task[]): PowerList {
  const defaultTasks = tasks || Array.from({ length: 5 }, () => createEmptyTask());
```

**New Code:**
```typescript
//TODO: set up overrides, then reflext the change where this is being called
export function createPowerList(date: string, tasks?: Task[]): PowerList {
  const defaultTasks = tasks || [createEmptyTask()];
```

**Commit:** `git add -A && git commit -m "Update createPowerList to default to 1 empty task instead of 5"`

---

### Step 3: Update `normalizePowerList`

**File:** `src/logic/powerList/index.ts` (lines 6-11)

**Current Code:**
```typescript
export function normalizePowerList(powerList: PowerList): PowerList {
  return {
    ...powerList,
    tasks: powerList.tasks || Array.from({ length: 5 }, () => createEmptyTask()),
  };
}
```

**New Code:**
```typescript
export function normalizePowerList(powerList: PowerList): PowerList {
  return {
    ...powerList,
    tasks: powerList.tasks || [createEmptyTask()],
  };
}
```

**Commit:** `git add -A && git commit -m "Update normalizePowerList to fallback to 1 empty task instead of 5"`

---

### Step 4: Update `getMostRecentTasks`

**File:** `src/logic/powerList/index.ts` (lines 75-86)

**Current Code:**
```typescript
export function getMostRecentTasks(taskHistory: Record<string, PowerList>): Task[] {
  const dates = sortDateDescending(Object.keys(taskHistory));

  for (const date of dates) {
    const powerList = normalizePowerList(taskHistory[date]);
    if (powerList && isPowerListComplete(powerList)) {
      return powerList.tasks;
    }
  }

  return Array.from({ length: 5 }, () => createEmptyTask());
}
```

**New Code:**
```typescript
export function getMostRecentTasks(taskHistory: Record<string, PowerList>): Task[] {
  const dates = sortDateDescending(Object.keys(taskHistory));

  for (const date of dates) {
    const powerList = normalizePowerList(taskHistory[date]);
    if (powerList && isPowerListComplete(powerList)) {
      return powerList.tasks;
    }
  }

  return [createEmptyTask()];
}
```

**Commit:** `git add -A && git commit -m "Update getMostRecentTasks to fallback to 1 empty task instead of 5"`

---

### Step 5: Simplify `RemoveTask`

**File:** `src/useCases/powerList/RemoveTask.ts`

**Current Code:**
```typescript
import { updatePowerListStatus, createEmptyTask } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type RemoveTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const RemoveTask = ({ currentPowerList, setCurrentPowerList }: RemoveTaskArgs) =>
  (taskId: string) => {
    if (!currentPowerList) return;

    // Find the index of the task to remove
    const taskIndex = currentPowerList.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    // Create a new empty task to replace the deleted one
    const newEmptyTask = createEmptyTask();

    // Replace the task at the found index with the new empty task
    const updatedTasks = [ ...currentPowerList.tasks, newEmptyTask ].filter(
      task => task.id !== taskId
    );

    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      tasks: updatedTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default RemoveTask;
```

**New Code:**
```typescript
import { updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type RemoveTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const RemoveTask = ({ currentPowerList, setCurrentPowerList }: RemoveTaskArgs) =>
  (taskId: string) => {
    if (!currentPowerList) return;

    const updatedTasks = currentPowerList.tasks.filter(task => task.id !== taskId);

    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      tasks: updatedTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default RemoveTask;
```

**Commit:** `git add -A && git commit -m "Simplify RemoveTask to just filter out task without replacing"`

---

### Step 6: Create `AddTask` Use Case

**File:** `src/useCases/powerList/AddTask.ts` (NEW FILE)

**New Code:**
```typescript
import { createEmptyTask, updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type AddTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const AddTask = ({ currentPowerList, setCurrentPowerList }: AddTaskArgs) => () => {
  if (!currentPowerList) return;

  const newTask = createEmptyTask();
  const updatedTasks = [...currentPowerList.tasks, newTask];

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    tasks: updatedTasks,
  });

  setCurrentPowerList(updatedList);
};

export default AddTask;
```

**Also update:** `src/useCases/powerList/index.ts`

Add this line:
```typescript
export { default as AddTask } from './AddTask';
```

**Commit:** `git add -A && git commit -m "Create AddTask use case for PowerList"`

---

### Step 7: Update `HandleKeyDown`

**File:** `src/useCases/powerList/HandleKeyDown.ts`

**Current Code:**
```typescript
import React from 'react';

type HandleKeyDownArgs = {
  standardTaskLength: number;
  powerListRefs: React.RefObject<HTMLInputElement>[];
  standardTaskRefs: React.RefObject<HTMLInputElement>[];
};

const HandleKeyDown = ({ standardTaskLength, powerListRefs, standardTaskRefs }: HandleKeyDownArgs) =>
  ( listType: 'power' | 'standard', index: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const powerListLength = 5;
      const totalInputs = powerListLength + standardTaskLength;
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
      if (nextGlobalIndex < powerListLength) {
        powerListRefs[nextGlobalIndex]?.current?.focus();
      } else {
        const standardIndex = nextGlobalIndex - powerListLength;
        standardTaskRefs[standardIndex]?.current?.focus();
      }
    }
  };

export default HandleKeyDown;
```

**New Code:**
```typescript
import React from 'react';

type HandleKeyDownArgs = {
  powerListLength: number;
  standardTaskLength: number;
  powerListRefs: React.RefObject<HTMLInputElement>[];
  standardTaskRefs: React.RefObject<HTMLInputElement>[];
};

const HandleKeyDown = ({ powerListLength, standardTaskLength, powerListRefs, standardTaskRefs }: HandleKeyDownArgs) =>
  (listType: 'power' | 'standard', index: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const totalInputs = powerListLength + standardTaskLength;
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
      if (nextGlobalIndex < powerListLength) {
        powerListRefs[nextGlobalIndex]?.current?.focus();
      } else {
        const standardIndex = nextGlobalIndex - powerListLength;
        standardTaskRefs[standardIndex]?.current?.focus();
      }
    }
  };

export default HandleKeyDown;
```

**Commit:** `git add -A && git commit -m "Update HandleKeyDown to accept dynamic powerListLength instead of hardcoded 5"`

---

### Step 8: Update PowerList Component

**File:** `src/app/daily/_components/PowerList/index.tsx`

**Current Code:**
```tsx
"use client"

import { PowerList as PowerListType } from '@/types/powerList';
import { TaskCard } from './TaskCard';

interface PowerListProps {
  powerList: PowerListType;
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  onTaskSettings?: (taskId: string) => void;
  onTaskClick?: (taskId: string) => void;
}

function PowerList({ powerList, isEditing, showCheckboxes, onTaskUpdate, onTaskToggle, onTaskSettings, onTaskClick }: PowerListProps) {
  return (
    <div className="flex-1 p-8 border-r border-ui">
      <div className="mx-auto">
        <div className="relative mb-6">
          <h1 className="text-lg font-mono font-bold text-center">POWER LIST:</h1>
        </div>

          <div className="space-y-3 max-w-md mx-auto">
            {powerList.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                date={powerList.date}
                isEditing={isEditing}
                showCheckbox={showCheckboxes}
                onTextChange={(text:string ) => onTaskUpdate(task.id, text)}
                onToggleComplete={() => onTaskToggle(task.id)}
                onSettingsClick={() => onTaskSettings?.(task.id)}
                onTaskClick={() => onTaskClick?.(task.id)}
              />
            ))}
          </div>

      </div>
    </div>
  );
}

export default PowerList
export * from './TaskDetailsModal'
export * from './TaskSettingsModal'
```

**New Code:**
```tsx
"use client"

import { PowerList as PowerListType } from '@/types/powerList';
import { TaskCard } from './TaskCard';
import { Plus, X } from 'lucide-react';

interface PowerListProps {
  powerList: PowerListType;
  isEditing: boolean;
  showCheckboxes: boolean;
  onTaskUpdate: (taskId: string, text: string) => void;
  onTaskToggle: (taskId: string) => void;
  onTaskSettings?: (taskId: string) => void;
  onTaskClick?: (taskId: string) => void;
  onAddTask?: () => void;
  onRemoveTask?: (taskId: string) => void;
}

function PowerList({
  powerList,
  isEditing,
  showCheckboxes,
  onTaskUpdate,
  onTaskToggle,
  onTaskSettings,
  onTaskClick,
  onAddTask,
  onRemoveTask
}: PowerListProps) {
  return (
    <div className="flex-1 p-8 border-r border-ui">
      <div className="mx-auto">
        <div className="relative mb-6">
          <h1 className="text-lg font-mono font-bold text-center">POWER LIST:</h1>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          {powerList.tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2">
              <TaskCard
                task={task}
                date={powerList.date}
                isEditing={isEditing}
                showCheckbox={showCheckboxes}
                onTextChange={(text: string) => onTaskUpdate(task.id, text)}
                onToggleComplete={() => onTaskToggle(task.id)}
                onSettingsClick={() => onTaskSettings?.(task.id)}
                onTaskClick={() => onTaskClick?.(task.id)}
              />
              {isEditing && onRemoveTask && (
                <button
                  onClick={() => onRemoveTask(task.id)}
                  className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 flex-shrink-0 mt-2"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          {isEditing && onAddTask && (
            <button
              onClick={onAddTask}
              className="flex items-center gap-2 text-gray-500 hover:text-black font-mono text-sm"
            >
              <Plus size={16} />
              Add task
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default PowerList
export * from './TaskDetailsModal'
export * from './TaskSettingsModal'
```

**Commit:** `git add -A && git commit -m "Add Add/Remove task buttons to PowerList component"`

---

### Step 9: Wire Up New Handlers in useDaily

**File:** `src/app/daily/_hooks/useDaily.ts`

**Changes needed:**

1. Import `AddTask` from useCases:
```typescript
import {
  NavigateToDate,
  RemoveTask,
  UpdateTask,
  ToggleTaskCompletion,
  SavePowerList,
  ToggleEditMode,
  OnInit as PowerListOnInit,
  AddTask,  // ADD THIS
} from '@/useCases/powerList';
```

2. Add the `addTask` callback (after `removeTask` definition around line 200):
```typescript
const addTask = useCallback(
  AddTask({
    currentPowerList,
    setCurrentPowerList
  }),
  [currentPowerList, setCurrentPowerList]
);
```

3. Add `addTask` to the return object (in the return statement):
```typescript
return {
  // ... existing properties
  addTask,  // ADD THIS
  // ... rest of properties
};
```

**Commit:** `git add -A && git commit -m "Wire up addTask handler in useDaily hook"`

---

### Step 10: Update Daily Page to Pass New Props

**File:** `src/app/daily/page.tsx`

**Changes needed:**

1. Destructure `addTask` from `useDaily()`:
```typescript
const {
  state,
  updateTask,
  addTask,  // ADD THIS
  // ... rest
} = useDaily();
```

2. Pass new props to PowerList component:
```tsx
<PowerList
  powerList={state.currentPowerList}
  isEditing={state.isEditing}
  showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
  onTaskUpdate={updateTask}
  onTaskToggle={toggleTaskCompletion}
  onTaskSettings={handleTaskSettings}
  onTaskClick={handleTaskClick}
  onAddTask={addTask}        // ADD THIS
  onRemoveTask={removeTask}  // ADD THIS
/>
```

**Commit:** `git add -A && git commit -m "Pass addTask and removeTask props to PowerList component"`

---

### Step 11: Update Mock Data (Optional)

**File:** `src/tools/createMockPowerLists.ts` (line 13)

**Current Code:**
```typescript
const createMockTasks = (): Task[] => {
  return Array.from({ length: 5 }, () => {
```

**New Code:**
```typescript
const createMockTasks = (): Task[] => {
  return Array.from({ length: 3 }, () => {
```

**Commit:** `git add -A && git commit -m "Update mock data to create 3 tasks instead of 5"`

---

## Part 2: DRY Refactoring

### Step 12: Create Shared BaseTask Type

**File:** `src/types/shared.ts` (NEW FILE)

**New Code:**
```typescript
export interface BaseTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface BaseTaskList<T extends BaseTask> {
  id: string;
  date: string;
  tasks: T[];
}
```

**Commit:** `git add -A && git commit -m "DRY: Create shared BaseTask and BaseTaskList types"`

---

### Step 13: Update Type Files to Extend BaseTask

**File:** `src/types/standards.ts`

**Current Code:**
```typescript
export interface StandardTask {
  id: string;
  text: string;
  completed: boolean;
}

export type Standard = {
  id: string;
  date: string;
  tasks: StandardTask[]
}
```

**New Code:**
```typescript
import { BaseTask, BaseTaskList } from './shared';

export interface StandardTask extends BaseTask {}

export interface Standard extends BaseTaskList<StandardTask> {}

export type Standards = {
  [date: string]: Standard
}
```

**File:** `src/types/todoToday.ts`

**Current Code:**
```typescript
export interface ToDoTask {
  id: string;
  text: string;
  completed: boolean;
}

export type ToDoList = {
  id: string;
  date: string;
  tasks: ToDoTask[]
}
```

**New Code:**
```typescript
import { BaseTask, BaseTaskList } from './shared';

export interface ToDoTask extends BaseTask {}

export interface ToDoList extends BaseTaskList<ToDoTask> {}

export type ToDoLists = {
  [date: string]: ToDoList
}
```

**File:** `src/types/powerList.ts`

**Current Code:**
```typescript
export interface Task {
  id: string;
  text: string;
  description?: string;
  reason?: string;
  time: { needed: number, left: number, resetDates?: string[], losingStreak?: number }
  completed: boolean;
}

export interface PowerList {
  id: string;
  date: string;
  tasks: Task[];
  isWin: boolean;
  isLoss: boolean;
  isComplete: boolean;
  createdAt?: string;
  updatedAt?: string;
  standardTasks?: import('@/types/standards').StandardTask[];
}
```

**New Code:**
```typescript
import { BaseTask, BaseTaskList } from './shared';

export interface Task extends BaseTask {
  description?: string;
  reason?: string;
  time: { needed: number, left: number, resetDates?: string[], losingStreak?: number }
}

export interface PowerList extends BaseTaskList<Task> {
  isWin: boolean;
  isLoss: boolean;
  isComplete: boolean;
  createdAt?: string;
  updatedAt?: string;
  standardTasks?: import('@/types/standards').StandardTask[];
}

export type PowerLists = {
  [date: string]: PowerList
}

export interface PowerListStats {
  totalWins: number;
  totalLosses: number;
  currentStreak: number;
  longestStreak: number;
  winRate: number;
}
```

**Commit:** `git add -A && git commit -m "DRY: Update type files to extend shared BaseTask and BaseTaskList"`

---

### Step 14: Create Shared Use Case Factories

**File:** `src/useCases/shared/createAddTaskUseCase.ts` (NEW FILE)

**New Code:**
```typescript
import { BaseTask, BaseTaskList } from '@/types/shared';

type AddTaskArgs<C extends BaseTaskList<any>> = {
  currentList: C | null;
  setCurrentList: (list: C) => void;
};

export function createAddTaskUseCase<T extends BaseTask, C extends BaseTaskList<T>>(
  createEmptyTask: () => T,
  postProcess?: (list: C) => C
) {
  return ({ currentList, setCurrentList }: AddTaskArgs<C>) => () => {
    if (!currentList) return;

    const newTask = createEmptyTask();
    let updatedList = {
      ...currentList,
      tasks: [...currentList.tasks, newTask],
    } as C;

    if (postProcess) {
      updatedList = postProcess(updatedList);
    }

    setCurrentList(updatedList);
  };
}
```

**File:** `src/useCases/shared/createRemoveTaskUseCase.ts` (NEW FILE)

**New Code:**
```typescript
import { BaseTask, BaseTaskList } from '@/types/shared';

type RemoveTaskArgs<C extends BaseTaskList<any>> = {
  currentList: C | null;
  setCurrentList: (list: C) => void;
};

export function createRemoveTaskUseCase<T extends BaseTask, C extends BaseTaskList<T>>(
  postProcess?: (list: C) => C
) {
  return ({ currentList, setCurrentList }: RemoveTaskArgs<C>) => (taskId: string) => {
    if (!currentList) return;

    let updatedList = {
      ...currentList,
      tasks: currentList.tasks.filter(task => task.id !== taskId),
    } as C;

    if (postProcess) {
      updatedList = postProcess(updatedList);
    }

    setCurrentList(updatedList);
  };
}
```

**File:** `src/useCases/shared/createUpdateTaskUseCase.ts` (NEW FILE)

**New Code:**
```typescript
import { BaseTask, BaseTaskList } from '@/types/shared';

type UpdateTaskArgs<C extends BaseTaskList<any>> = {
  currentList: C | null;
  setCurrentList: (list: C) => void;
};

export function createUpdateTaskUseCase<T extends BaseTask, C extends BaseTaskList<T>>(
  postProcess?: (list: C) => C
) {
  return ({ currentList, setCurrentList }: UpdateTaskArgs<C>) =>
    (taskId: string, updates: string | Partial<T>) => {
      if (!currentList) return;

      const taskUpdates = typeof updates === 'string' ? { text: updates } : updates;

      let updatedList = {
        ...currentList,
        tasks: currentList.tasks.map(task =>
          task.id === taskId ? { ...task, ...taskUpdates } : task
        ),
      } as C;

      if (postProcess) {
        updatedList = postProcess(updatedList);
      }

      setCurrentList(updatedList);
    };
}
```

**File:** `src/useCases/shared/index.ts` (NEW FILE)

**New Code:**
```typescript
export { createAddTaskUseCase } from './createAddTaskUseCase';
export { createRemoveTaskUseCase } from './createRemoveTaskUseCase';
export { createUpdateTaskUseCase } from './createUpdateTaskUseCase';
```

**Commit:** `git add -A && git commit -m "DRY: Create shared use case factories for add/remove/update task"`

---

### Step 15: Create Shared UI Components

**File:** `src/app/daily/_components/shared/AddTaskButton.tsx` (NEW FILE)

**New Code:**
```tsx
"use client"

import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onClick: () => void;
  label?: string;
}

export function AddTaskButton({ onClick, label = 'Add task' }: AddTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-gray-500 hover:text-black font-mono text-sm"
    >
      <Plus size={16} />
      {label}
    </button>
  );
}
```

**File:** `src/app/daily/_components/shared/RemoveTaskButton.tsx` (NEW FILE)

**New Code:**
```tsx
"use client"

import { X } from 'lucide-react';

interface RemoveTaskButtonProps {
  onClick: () => void;
}

export function RemoveTaskButton({ onClick }: RemoveTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 flex-shrink-0 mt-2"
    >
      <X size={14} />
    </button>
  );
}
```

**File:** `src/app/daily/_components/shared/index.ts` (NEW FILE)

**New Code:**
```typescript
export { AddTaskButton } from './AddTaskButton';
export { RemoveTaskButton } from './RemoveTaskButton';
```

**Commit:** `git add -A && git commit -m "DRY: Create shared AddTaskButton and RemoveTaskButton components"`

---

### Step 16: Update List Components to Use Shared UI

**File:** `src/app/daily/_components/StandardsList/index.tsx`

Replace the Plus/X button code with shared components:
```tsx
import { AddTaskButton, RemoveTaskButton } from '../shared';

// Replace inline X button with:
{isEditing && <RemoveTaskButton onClick={() => onRemoveTask(task.id)} />}

// Replace inline Plus button with:
{isEditing && <AddTaskButton onClick={onAddTask} />}
```

**File:** `src/app/daily/_components/ToDoList/index.tsx`

Same changes as StandardsList.

**File:** `src/app/daily/_components/PowerList/index.tsx`

Same changes as StandardsList.

**Commit:** `git add -A && git commit -m "DRY: Update list components to use shared AddTaskButton and RemoveTaskButton"`

---

## Summary of All Commits

### Part 1: Remove 5-Task Requirement
1. `Update calculateWinLoss to check all tasks instead of hardcoded 5`
2. `Update createPowerList to default to 1 empty task instead of 5`
3. `Update normalizePowerList to fallback to 1 empty task instead of 5`
4. `Update getMostRecentTasks to fallback to 1 empty task instead of 5`
5. `Simplify RemoveTask to just filter out task without replacing`
6. `Create AddTask use case for PowerList`
7. `Update HandleKeyDown to accept dynamic powerListLength instead of hardcoded 5`
8. `Add Add/Remove task buttons to PowerList component`
9. `Wire up addTask handler in useDaily hook`
10. `Pass addTask and removeTask props to PowerList component`
11. `Update mock data to create 3 tasks instead of 5`

### Part 2: DRY Refactoring
12. `DRY: Create shared BaseTask and BaseTaskList types`
13. `DRY: Update type files to extend shared BaseTask and BaseTaskList`
14. `DRY: Create shared use case factories for add/remove/update task`
15. `DRY: Create shared AddTaskButton and RemoveTaskButton components`
16. `DRY: Update list components to use shared AddTaskButton and RemoveTaskButton`

---

## Files Modified/Created

### Modified Files
- `src/logic/powerList/index.ts`
- `src/useCases/powerList/RemoveTask.ts`
- `src/useCases/powerList/HandleKeyDown.ts`
- `src/useCases/powerList/index.ts`
- `src/app/daily/_components/PowerList/index.tsx`
- `src/app/daily/_hooks/useDaily.ts`
- `src/app/daily/page.tsx`
- `src/tools/createMockPowerLists.ts`
- `src/types/powerList.ts`
- `src/types/standards.ts`
- `src/types/todoToday.ts`
- `src/app/daily/_components/StandardsList/index.tsx`
- `src/app/daily/_components/ToDoList/index.tsx`

### New Files
- `src/useCases/powerList/AddTask.ts`
- `src/types/shared.ts`
- `src/useCases/shared/createAddTaskUseCase.ts`
- `src/useCases/shared/createRemoveTaskUseCase.ts`
- `src/useCases/shared/createUpdateTaskUseCase.ts`
- `src/useCases/shared/index.ts`
- `src/app/daily/_components/shared/AddTaskButton.tsx`
- `src/app/daily/_components/shared/RemoveTaskButton.tsx`
- `src/app/daily/_components/shared/index.ts`
