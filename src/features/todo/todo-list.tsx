import { useEffect, useState, useCallback } from "react";
import { addTodo, deleteTodo, getTodos } from "../../infrastructure/firebase/todo-service";
import type { Todo } from "../../core/types/todo";
import TodoItem from "./components/todo-item";
import { Plus } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await getTodos();
      const valid = list.filter(t => t?.id && t?.title && t?.createdAt);
      valid.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
      setTodos(valid);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAdd = useCallback(async () => {
    if (!newTitle.trim() || isAdding) return;
    setIsAdding(true);

    const tempTodo: Todo = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      createdAt: Timestamp.fromDate(new Date()),
    };

    setTodos(prev => [tempTodo, ...prev]);
    setNewTitle("");

    try {
      await addTodo(newTitle.trim());
    } finally {
      await loadTodos();
      setIsAdding(false);
    }
  }, [newTitle, isAdding, loadTodos]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteTodo(id);
    await loadTodos();
  }, [loadTodos]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }, [handleAdd]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-zinc-900 dark:to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">✨ My Todo List</h1>
          <p className="text-gray-600 dark:text-gray-400">Organize your tasks with style</p>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-700/50 overflow-hidden">
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

          <div className="p-8">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 mx-auto mb-4 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No tasks yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Add your first task above</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id)} />
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          <p className="text-sm">Made with 💜 to organize your life</p>
        </div>
      </div>
    </div>
  );
}