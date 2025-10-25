"use client"

import { CreditCard as Edit3, Download, ListTodo } from "lucide-react";
import ExportService from "@/backend/export";

interface FooterProps {
  isEditing: boolean;
  canSave: boolean;
  onSave: () => void;
  onToggleEdit: () => void;
  showAddToDoButton?: boolean;
  onAddToDoList?: () => void;
}

export function Footer({ isEditing, canSave, onSave, onToggleEdit, showAddToDoButton, onAddToDoList }: FooterProps) {
  return (
    <footer className="text-center py-8 border-t border-ui space-y-4">
      <div className="flex justify-center gap-4">
        {isEditing ? (
          <button
            onClick={onSave}
            disabled={!canSave}
            className="btn-primary"
          >
            Save Lists
          </button>
        ) : (
          <>
            <button
              onClick={onToggleEdit}
              className="btn-outline"
            >
              <Edit3 size={16} />
              Edit Tasks
            </button>

            {showAddToDoButton && onAddToDoList && (
              <button
                onClick={onAddToDoList}
                className="btn-outline"
              >
                <ListTodo size={16} />
                Add Todo List
              </button>
            )}
          </>
        )}

        <button
          onClick={() => ExportService.exportToJSON()}
          className="btn-outline"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </footer>
  );
}
