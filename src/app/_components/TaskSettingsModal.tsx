"use client"

import { Task } from '@/types/powerList';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TaskSettingsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskSettingsModal({ task, isOpen, onClose, onSave }: TaskSettingsModalProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [timeNeeded, setTimeNeeded] = useState(30);

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDescription(task.description || '');
      setReason(task.reason || '');
      setTimeNeeded(task.time.needed);
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;

    onSave(task.id, {
      text,
      description,
      reason,
      time: {
        ...task.time,
        needed: timeNeeded
      }
    });
    onClose();
  };

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-mono font-bold">TASK SETTINGS</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Task Text */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              TASK:
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border-2 border-black font-mono text-base"
              placeholder="Enter task text"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              DESCRIPTION:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2 border-2 border-black font-mono text-base resize-none"
              placeholder="Enter task description (optional)"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              WHY?:
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full p-2 border-2 border-black font-mono text-base resize-none"
              placeholder="Enter reason for this task (optional)"
            />
          </div>

          {/* Time Needed */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              DAYS NEEDED:
            </label>
            <input
              type="number"
              value={timeNeeded}
              onChange={(e) => setTimeNeeded(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full p-2 border-2 border-black font-mono text-base"
            />
            <p className="text-xs text-gray-500 mt-1 font-mono">
              Number of days required before this becomes a habit
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border-2 border-black text-black font-mono hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-black text-white font-mono hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
