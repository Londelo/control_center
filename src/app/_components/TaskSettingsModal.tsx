"use client"

import { Task } from '@/types/powerList';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TaskSettingsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskSettingsModal({ task, isOpen, onClose, onUpdate }: TaskSettingsModalProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [timeNeeded, setTimeNeeded] = useState(30);

  const updateTask = (updates: Partial<Task>) => {
    if (!task) return;
    onUpdate(task.id, updates);
  };

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDescription(task.description || '');
      setReason(task.reason || '');
      setTimeNeeded(task.time.needed);
    }
  }, [task]);

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
              onChange={(e) => {
                const newText = e.target.value;
                setText(newText);
                updateTask({ text: newText });
              }}
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
              onChange={(e) => {
                const newDescription = e.target.value;
                setDescription(newDescription);
                updateTask({ description: newDescription });
              }}
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
              onChange={(e) => {
                const newReason = e.target.value;
                setReason(newReason);
                updateTask({ reason: newReason });
              }}
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
              onChange={(e) => {
                const newTimeNeeded = Math.max(1, parseInt(e.target.value) || 1);
                setTimeNeeded(newTimeNeeded);
                updateTask({ 
                  time: {
                    ...task?.time || { needed: 30, left: 30 },
                    needed: newTimeNeeded
                  }
                });
              }}
              min="1"
              className="w-full p-2 border-2 border-black font-mono text-base"
            />
            <p className="text-xs text-gray-500 mt-1 font-mono">
              Number of days required before this becomes a habit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
