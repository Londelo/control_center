"use client";

import { PowerList } from "@/app/_components/PowerList";
import { SideTaskList } from "@/app/_components/SideTaskList";
import { usePowerListService } from "@/app/_hooks/usePowerListService";
import { Edit3, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PowerList as PowerListType } from "@/types/powerList";

const getListStatus = (currentPowerList: PowerListType, currentDate: string, today: string, purpose = 'text') => {
  if (currentPowerList.isWin) {
    return purpose === 'text' ? 'WIN' : 'text-green-600'
  }

  // If it's today and neither win nor loss, it's in progress
  if (currentDate === today) {
    return purpose === 'text' ? 'IN PROGRESS' : 'text-blue-600'
  }

  if (currentPowerList.isLoss) {
    return purpose === 'text' ? 'LOSE' : 'text-red-600'
  }

  // Fallback (shouldn't reach here with proper logic)
  return purpose === 'text' ? 'LOSE' : 'text-red-600'
}

export default function Home() {
  const {
    state,
    updateTask,
    updateSideTask,
    addSideTask,
    removeSideTask,
    toggleTaskCompletion,
    savePowerList,
    toggleEditMode,
    navigateToDate,
    handleKeyDown
  } = usePowerListService();

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
          className="absolute left-8 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded"
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
          <div className="max-w-md mx-auto">
            <h1 className="text-lg font-mono font-bold mb-6 text-center">POWER LIST:</h1>

            <PowerList
              powerList={state.currentPowerList}
              isEditing={state.isEditing}
              showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
              onTaskUpdate={updateTask}
              onTaskToggle={toggleTaskCompletion}
              taskRefs={state.powerListRefs}
              onKeyDown={(index, e) => handleKeyDown('power', index, e)}
            />
          </div>
        </div>

        {/* Right Column - Side Tasks */}
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-mono font-bold mb-6 text-center">STANDARD TASKS:</h2>

            <SideTaskList
              tasks={state.currentPowerList.sideTasks}
              isEditing={state.isEditing}
              showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
              onTaskUpdate={updateSideTask}
              onTaskToggle={toggleTaskCompletion}
              onAddTask={addSideTask}
              onRemoveTask={removeSideTask}
              taskRefs={state.sideTaskRefs}
              onKeyDown={(index, e) => handleKeyDown('side', index, e)}
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
    </div>
  );
}
