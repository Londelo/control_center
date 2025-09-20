"use client";

import { TaskList } from "@/components/TaskList";
import { usePowerListService } from "@/hooks/usePowerListService";
import { Trophy, Edit3, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const {
    currentTaskList,
    isEditing,
    isLoading,
    updateTask,
    toggleTaskCompletion,
    saveTaskList,
    toggleEditMode,
    canSave,
    isWin,
  } = usePowerListService();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-mono">Loading your PowerList...</div>
      </div>
    );
  }

  if (!currentTaskList) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-mono">Error loading PowerList</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        {/* Header */}
        <header className="mb-8">
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
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-green-600 font-mono">
              <Trophy />
              <span>You Won the Day!</span>
            </div>
          </div>
        )}

        {/* Main Task List */}
        <div className="mb-12">
          <TaskList
            taskList={currentTaskList}
            isEditing={isEditing}
            onTaskUpdate={updateTask}
            onTaskToggle={toggleTaskCompletion}
          />

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
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
                <Edit3 size={16} />
                Edit Tasks
              </button>
            )}
            
            {/* Stats Button */}
            <div>
              <Link href="/stats">
                <button className="inline-flex items-center gap-2 px-6 py-2 border-2 border-black text-black font-mono hover:bg-black hover:text-white transition-colors">
                  <BarChart3 size={16} />
                  View Standards
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}