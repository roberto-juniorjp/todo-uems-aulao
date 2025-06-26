import React from 'react';
import { Plus } from "lucide-react";

interface TodoFormProps {
  newTitle: string;
  setNewTitle: (title: string) => void;
  handleAdd: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isAdding: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  newTitle,
  setNewTitle,
  handleAdd,
  handleKeyDown,
  isAdding,
}) => {
  return (
    <div className="p-8 border-b border-gray-100 dark:border-zinc-700">
      <div className="flex gap-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a task..."
          disabled={isAdding}
          className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 dark:border-zinc-600 bg-gray-50/50 dark:bg-zinc-800/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-200/50 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleAdd}
          disabled={!newTitle.trim() || isAdding}
          className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-semibold hover:from-violet-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Plus size={22} className={isAdding ? "animate-spin" : ""} />
          {isAdding ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};