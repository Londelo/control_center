"use client";

import PowerList, { TaskSettingsModal, TaskDetailsModal } from "@/app/daily/_components/PowerList";
import StandardsList from "@/app/daily/_components/StandardsList";
import ToDoList from "@/app/daily/_components/ToDoList";
import { HeaderBar } from "@/app/daily/_components/HeaderBar";
import { NavBar } from "@/app/daily/_components/NavBar";
import { Footer } from "@/app/daily/_components/Footer";
import { useDaily } from "@/app/daily/_hooks/useDaily";
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

export default function DailyPage() {
  const {
    state,
    updateTask,
    updateStandardTask,
    addStandardTask,
    removeStandardTask,
    removeTask,
    addTask,
    convertToStandard,
    toggleTaskCompletion,
    toggleStandardTaskCompletion,
    updateToDoTask,
    addToDoTask,
    removeToDoTask,
    toggleToDoTaskCompletion,
    savePowerList,
    toggleEditMode,
    navigateToDate,
    handleDetailsModalClose,
    handleEditFromDetails,
    handleModalClose,
    handleTaskClick,
    handleTaskSettings,
    handleAddToDoList
  } = useDaily();

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
      <main className="flex-1 flex flex-col">
        <div className="flex flex-1">
          {/* Left Column - PowerList */}
          <PowerList
            powerList={state.currentPowerList}
            isEditing={state.isEditing}
            showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
            onTaskUpdate={updateTask}
            onTaskToggle={toggleTaskCompletion}
            onTaskSettings={handleTaskSettings}
            onTaskClick={handleTaskClick}
            onAddTask={addTask}
            onRemoveTask={removeTask}
          />

          {/* Right Column - Standard Tasks */}
          <StandardsList
            tasks={state.currentStandardTasks.tasks || []}
            isEditing={state.isEditing}
            showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
            onTaskUpdate={updateStandardTask}
            onTaskToggle={toggleStandardTaskCompletion}
            onAddTask={addStandardTask}
            onRemoveTask={removeStandardTask}
          />
        </div>

        {/* Full Width - ToDo List */}
        {state.showToDoSection && (
          <ToDoList
            tasks={state.currentToDoTasks.tasks || []}
            isEditing={state.isEditing}
            showCheckboxes={!state.isEditing && state.currentPowerList.isComplete}
            onTaskUpdate={updateToDoTask}
            onTaskToggle={toggleToDoTaskCompletion}
            onAddTask={addToDoTask}
            onRemoveTask={removeToDoTask}
          />
        )}
      </main>

      <Footer
        isEditing={state.isEditing}
        canSave={state.canSave}
        onSave={savePowerList}
        onToggleEdit={toggleEditMode}
        showAddToDoButton={!state.showToDoSection && state.currentDate === state.today}
        onAddToDoList={handleAddToDoList}
      />

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
