"use client";

import { TaskList } from "@/components/TaskList";
import { StatsPanel } from "@/components/StatsPanel";
import { usePowerListService } from "@/hooks/usePowerListService";
import { Trophy, Edit3 } from "lucide-react";

export default function Home() {
  const {
    currentTaskList,
    isEditing,
    isLoading,
    updateTask,
    toggleTaskCompletion,
    saveTaskList,
    toggleEditMode,
    getStats,
    canSave,
    isWin,
  } = usePowerListService();

  if (isLoading) {
    return (
      <div>
        <div>Loading your PowerList...</div>
      </div>
    );
  }

  if (!currentTaskList) {
    return (
      <div>
        <div>Error loading PowerList</div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="text-lg font-mono mb-2">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).toUpperCase()} - {isWin ? 'WIN' : 'WORKING'} (just for starting)
          </div>
          <h1 className="text-lg font-mono font-bold">POWER LIST:</h1>
        </header>

        {/* Win Message */}
        {isWin && !isEditing && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-green-600 font-mono">
              <Trophy />
              <span>You Won the Day!</span>
            </div>
          </div>
        )}

        {/* Main Task List */}
        <div className="mb-12">
          <div>
            <TaskList
              taskList={currentTaskList}
              isEditing={isEditing}
              onTaskUpdate={updateTask}
              onTaskToggle={toggleTaskCompletion}
            />

            {/* Action Buttons */}
            <div className="text-center mt-8">
              {isEditing ? (
                <button
                  onClick={saveTaskList}
                  disabled={!canSave}
                  className="px-6 py-2 bg-black text-white font-mono disabled:bg-gray-400"
                >
                  Save List
                </button>
              ) : (
                <button
                  onClick={toggleEditMode}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white font-mono"
                >
                  <Edit3 />
                  Edit Tasks
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="text-center">
          <h2 className="text-lg font-mono font-bold mb-4">STANDARDS:</h2>
          <StatsPanel stats={stats} />
        </div>
      </div>
    </main>
  );
}
