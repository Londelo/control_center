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
    <main>
      <div>
        {/* Header */}
        <header>
          <h1>PowerList</h1>
        </header>

        {/* Win Message */}
        {isWin && !isEditing && (
          <div>
            <div>
              <Trophy />
              <span>You Won the Day!</span>
            </div>
          </div>
        )}

        {/* Main Task List */}
        <div>
          <div>
            <TaskList
              taskList={currentTaskList}
              isEditing={isEditing}
              onTaskUpdate={updateTask}
              onTaskToggle={toggleTaskCompletion}
            />
            
            {/* Action Buttons */}
            <div>
              {isEditing ? (
                <button
                  onClick={saveTaskList}
                  disabled={!canSave}
                >
                  Save List
                </button>
              ) : (
                <button
                  onClick={toggleEditMode}
                >
                  <Edit3 />
                  Edit Tasks
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div>
          <h2>Your Stats</h2>
          <StatsPanel stats={stats} />
        </div>

        {/* Date Display */}
        <div>
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