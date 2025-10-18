"use client";

import { PowerList } from "@/app/_components/powerList/PowerList";
import { StandardTaskList } from "@/app/_components/powerList/StandardTaskList";
import { TaskSettingsModal } from "@/app/_components/powerList/TaskSettingsModal";
import { TaskDetailsModal } from "@/app/_components/powerList/TaskDetailsModal";
import { HeaderBar } from "@/app/_components/powerList/HeaderBar";
import { NavBar } from "@/app/_components/powerList/NavBar";
import { usePowerListService } from "@/app/_hooks/usePowerListService";
import { CreditCard as Edit3, Download } from "lucide-react";
import ExportService from "@/backend/export";
import { PowerList as PowerListType } from "@/types/powerList";

const getListStatus = (currentPowerList: PowerListType, currentDate: string, today: string, purpose = 'text') => {
  if (currentPowerList.isWin) {
    return purpose === 'text' ? 'WIN' : 'status-success'
  }

  // If it's today and neither win nor loss, it's in progress
  if (currentDate === today) {
    return purpose === 'text' ? 'IN PROGRESS' : 'status-info'
  }

  // Fallback (shouldn't reach here with proper logic)
  return purpose === 'text' ? 'LOSE' : 'status-error'
}

const getDayOfWeek = (currentDate: string): string => {
  const date = new Date(currentDate);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

export default function Home() {
  const {
    state,
    updateTask,
    updateStandardTask,
    addStandardTask,
    removeStandardTask,
    removeTask,
    convertToStandard,
    toggleTaskCompletion,
    toggleStandardTaskCompletion,
    savePowerList,
    toggleEditMode,
    navigateToDate,
    handleDetailsModalClose,
    handleEditFromDetails,
    handleModalClose,
    handleTaskClick,
    handleTaskSettings
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

  const dayOfWeek = getDayOfWeek(state.currentDate);
  const statusColor = getListStatus(state.currentPowerList, state.currentDate, state.today, 'color')
  const status = getListStatus(state.currentPowerList, state.currentDate, state.today)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderBar/>

      <NavBar
        dayOfWeek={dayOfWeek}
        status={status}
        statusColor={statusColor}
        currentDate={state.currentDate}
        canNavigateBackward={state.canNavigateBackward}
        canNavigateForward={state.canNavigateForward}
        onNavigateToDate={navigateToDate}
      />

      {/* Main Content - Two Columns */}
      <main className="flex-1 flex">
        {/* Left Column - PowerList */}
        <div className="flex-1 p-8 border-r border-ui">
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
              onTaskClick={handleTaskClick}
            />
          </div>
        </div>

        {/* Right Column - Standard Tasks */}
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-mono font-bold mb-6 text-center">STANDARD TASKS:</h2>

            <StandardTaskList
              tasks={state.currentStandardTasks}
              isEditing={state.isEditing}
              showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
              onTaskUpdate={updateStandardTask}
              onTaskToggle={toggleStandardTaskCompletion}
              onAddTask={addStandardTask}
              onRemoveTask={removeStandardTask}
            />
          </div>
        </div>
      </main>

      {/* Footer - Action Buttons */}
      <footer className="text-center py-8 border-t border-ui space-y-4">
        <div className="flex justify-center gap-4">
          {state.isEditing ? (
            <button
              onClick={savePowerList}
              disabled={!state.canSave}
              className="btn-primary"
            >
              Save Lists
            </button>
          ) : (
            <button
              onClick={toggleEditMode}
              className="btn-outline"
            >
              <Edit3 size={16} />
              Edit Tasks
            </button>
          )}

          {/* Export Button */}
          <button
            onClick={() => ExportService.exportToJSON()}
            className="btn-outline"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </footer>

      {/* Task Settings Modal */}
      <TaskSettingsModal
        task={state.selectedTask}
        isOpen={state.isSettingsModalOpen}
        onClose={handleModalClose}
        onUpdate={updateTask}
        onMakeStandard={(taskId) => {
          const task = state.currentPowerList?.tasks.find(t => t.id === taskId);
          if (task) {
            convertToStandard(task);
            removeTask(taskId);
          }
          handleModalClose();
        }}
        onDelete={(taskId) => {
          removeTask(taskId);
          handleModalClose();
        }}
      />

      {/* Task Details Modal */}
      <TaskDetailsModal
        task={state.selectedTaskForDetails}
        isOpen={state.isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
}
