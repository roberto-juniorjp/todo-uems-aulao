import { useState, useEffect } from "react";
import type { Todo } from "../../../../core/types/todo";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onDelete: () => void;
}

function TodoItem({ todo, onDelete }: TodoItemProps) {
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (removing) {
      const timer = setTimeout(() => onDelete(), 400);
      return () => clearTimeout(timer);
    }
  }, [removing, onDelete]);

  if (!todo) return null;

  function handleRemoveClick(e: React.MouseEvent) {
    e.stopPropagation();
    setRemoving(true);
  }

  return (
    <li
      className={`bg-gradient-to-r from-white via-violet-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 px-6 py-4 rounded-2xl flex justify-between items-center cursor-pointer border border-violet-200/50 hover:border-violet-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out ${removing ? 'opacity-50 scale-95 pointer-events-none' : ''}`}
      title="Your Todo"
      role="button"
      tabIndex={0}
    >
      <span className="text-lg font-medium text-gray-800 dark:text-white select-none">
        {todo.title}
      </span>
      <button
        onClick={handleRemoveClick}
        disabled={removing}
        className="p-2 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label="Delete task"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}

export default TodoItem;