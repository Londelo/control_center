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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading your PowerList...</div>
      </div>
    );
  }

  if (!currentTaskList) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Error loading PowerList</div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PowerList</h1>
        </header>

        {/* Win Message */}
        {isWin && !isEditing && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">You Won the Day!</span>
            </div>
          </div>
        )}

        {/* Main Task List */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-full max-w-2xl">
            <TaskList
              taskList={currentTaskList}
              isEditing={isEditing}
              onTaskUpdate={updateTask}
              onTaskToggle={toggleTaskCompletion}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            {isEditing ? (
              <button
                onClick={saveTaskList}
                disabled={!canSave}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white hover:bg-gray-700 h-10 px-8"
              >
                Save List
              </button>
            ) : (
              <button
                onClick={toggleEditMode}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 h-10 px-8"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Tasks
              </button>
            )}
          </div>
        </div>

        {/* Stats Panel */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Your Stats</h2>
          <StatsPanel stats={stats} />
        </div>

        {/* Date Display */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </main>
  );
}