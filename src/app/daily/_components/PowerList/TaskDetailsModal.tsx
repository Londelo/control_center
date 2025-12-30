"use client"

import { WARNING_RESETTING_SOON_NUM } from '@/enums/powerList';
import { Task } from '@/types/powerList';
import { X } from 'lucide-react';

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export function TaskDetailsModal({ task, isOpen, onClose, onEdit }: TaskDetailsModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div
      className="fixed inset-0 bg-stone-400/60 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-mono font-bold">TASK DETAILS</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            >
            <X size={20} />
          </button>
        </div>

        {/* RESET WARNING */}
        {
          task.time.losingStreak === WARNING_RESETTING_SOON_NUM && task.time.left !== task.time.needed &&
          <h3  className="mb-5 text-orange-600 text-m font-mono font-bold;" >RESETTING IF YOU FAIL AGAIN</h3>
        }

        {/* Content */}
        <div className="space-y-4">
          {/* Task Text */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              TASK:
            </label>
            <div className="w-full p-2 border-2 border-gray-300 font-mono text-base bg-gray-50">
              {task.text || 'No task text'}
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div>
              <label className="block text-sm font-mono font-bold mb-2">
                DESCRIPTION:
              </label>
              <div className="w-full p-2 border-2 border-gray-300 font-mono text-base bg-gray-50 min-h-[80px]">
                {task.description}
              </div>
            </div>
          )}

          {/* Reason */}
          {task.reason && (
            <div>
              <label className="block text-sm font-mono font-bold mb-2">
                WHY?:
              </label>
              <div className="w-full p-2 border-2 border-gray-300 font-mono text-base bg-gray-50 min-h-[80px]">
                {task.reason}
              </div>
            </div>
          )}

          {/* Time Info */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              PROGRESS:
            </label>
            <div className="w-full p-2 border-2 border-gray-300 font-mono text-base bg-gray-50">
              {task.time.needed - task.time.left} / {task.time.needed} days completed
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onEdit}
            className="px-6 py-2 bg-black text-white font-mono hover:bg-gray-800 transition-colors"
          >
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}
