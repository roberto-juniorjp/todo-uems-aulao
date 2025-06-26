import React from 'react';

interface TodoStatusMessageProps {
  isLoading: boolean;
  todosCount: number;
}

export const TodoStatusMessage: React.FC<TodoStatusMessageProps> = ({ isLoading, todosCount }) => {
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="w-8 h-8 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  if (todosCount === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No tasks yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Add your first task above</p>
      </div>
    );
  }

  return null;
};