"use client";

import { PowerList } from "@/app/_components/PowerList";
import { StandardTaskList } from "@/app/_components/StandardTaskList";
import { TaskSettingsModal } from "@/app/_components/TaskSettingsModal";
import { usePowerListService } from "@/app/_hooks/usePowerListService";
import { CreditCard as Edit3, ChartBar as BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PowerList as PowerListType, Task } from "@/types/powerList";
import { useState } from "react";

const getListStatus = (currentPowerList: PowerListType, currentDate: string, today: string, purpose = 'text') => {
  if (currentPowerList.isWin) {
    return purpose === 'text' ? 'WIN' : 'text-green-600'
  }

  // If it's today and neither win nor loss, it's in progress
  if (currentDate === today) {
    return purpose === 'text' ? 'IN PROGRESS' : 'text-blue-600'
  }

  // Fallback (shouldn't reach here with proper logic)
  return purpose === 'text' ? 'LOSE' : 'text-red-600'
}

export default function Home() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    state,
    updateTask,
    updateStandardTask,
    addStandardTask,
    removeStandardTask,
    toggleTaskCompletion,
    savePowerList,
    toggleEditMode,
    navigateToDate,
    handleKeyDown
  } = usePowerListService();

  const handleTaskSettings = (taskId: string) => {
    const task = state.currentPowerList?.tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    if (!state.currentPowerList) return;

    const updatedTask = { ...state.currentPowerList.tasks.find(t => t.id === taskId), ...updates } as Task;
    updateTask(taskId, updatedTask.text);

    // Update other properties if they exist
    if (updates.description !== undefined || updates.time !== undefined) {
      // We need to update the full task object, not just the text
      // This will require updating the updateTask function or creating a new one
      console.log('Full task update needed:', updates);
    }
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-mono">Loading your PowerList...</div>
      </div>
    );
  }

  if (!state.currentPowerList) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-mono">Error loading PowerList</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="relative text-center py-8 border-b border-gray-200">
        {/* Left Arrow */}
        <button
          onClick={() => navigateToDate('prev')}
          disabled={!state.canNavigateBackward}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-lg font-mono mb-2 flex items-center justify-center gap-2">
          <span>{state.currentDate} -</span>
          <span className={getListStatus(state.currentPowerList, state.currentDate, state.today, 'color')}>
            {getListStatus(state.currentPowerList, state.currentDate, state.today)}
          </span>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => navigateToDate('next')}
          disabled={!state.canNavigateForward}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronRight size={24} />
        </button>

      </header>

      {/* Main Content - Two Columns */}
      <main className="flex-1 flex">
        {/* Left Column - PowerList */}
        <div className="flex-1 p-8 border-r border-gray-200">
          <div className="mx-auto">
            <div className="relative mb-6">
              <h1 className="text-lg font-mono font-bold text-center">POWER LIST:</h1>
            </div>

            <PowerList
              powerList={state.currentPowerList}
              isEditing={state.isEditing}
              showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
              onTaskUpdate={updateTask}
              onTaskToggle={toggleTaskCompletion}
              onTaskSettings={handleTaskSettings}
              taskRefs={state.powerListRefs}
              onKeyDown={(index, e) => handleKeyDown('power', index, e)}
            />
          </div>
        </div>

        {/* Right Column - Standard Tasks */}
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-mono font-bold mb-6 text-center">STANDARD TASKS:</h2>

            <StandardTaskList
              tasks={state.currentPowerList.standardTasks}
              isEditing={state.isEditing}
              showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
              onTaskUpdate={updateStandardTask}
              onTaskToggle={toggleTaskCompletion}
              onAddTask={addStandardTask}
              onRemoveTask={removeStandardTask}
              taskRefs={state.standardTaskRefs}
              onKeyDown={(index, e) => handleKeyDown('standard', index, e)}
            />
          </div>
        </div>
      </main>

      {/* Footer - Action Buttons */}
      <footer className="text-center py-8 border-t border-gray-200 space-y-4">
        <div className="flex justify-center gap-4">
          {state.isEditing ? (
            <button
              onClick={savePowerList}
              disabled={!state.canSave}
              className="px-6 py-2 bg-black text-white font-mono disabled:bg-gray-400"
            >
              Save Lists
            </button>
          ) : (
            <button
              onClick={toggleEditMode}
              className="inline-flex items-center gap-2 px-6 py-2 border-2 border-black text-black font-mono hover:bg-black hover:text-white transition-colors"
            >
              <Edit3 size={16} />
              Edit Tasks
            </button>
          )}

          {/* Stats Button */}
          <Link href="/stats">
            <button className="inline-flex items-center gap-2 px-6 py-2 border-2 border-black text-black font-mono hover:bg-black hover:text-white transition-colors">
              <BarChart3 size={16} />
              View Stats
            </button>
          </Link>
        </div>
      </footer>

      {/* Task Settings Modal */}
      <TaskSettingsModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleTaskUpdate}
      />
    </div>
  );
}
