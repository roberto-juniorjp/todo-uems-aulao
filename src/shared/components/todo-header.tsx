import React from 'react';

export const TodoHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">✨ My Todo List</h1>
      <p className="text-gray-600 dark:text-gray-400">Organize your tasks with style</p>
    </div>
  );
};