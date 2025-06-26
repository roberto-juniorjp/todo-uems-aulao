import { useState, useEffect } from "react";
import { addTodo, deleteTodo, getTodos } from "../../../infrastructure/firebase/todo-service";
import type { Todo } from "../../../core/types/todo";

interface UseTodoLogicReturn {
  todos: Todo[];
  newTitle: string;
  setNewTitle: (title: string) => void;
  isLoading: boolean;
  isAdding: boolean;
  handleAdd: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function useTodoLogic(): UseTodoLogicReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  async function loadTodos() {
    setIsLoading(true);
    const list = await getTodos();
    const validTodos = list.filter(t => t.id && t.title && t.createdAt);
    validTodos.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    setTodos(validTodos);
    setIsLoading(false);
  }

  async function handleAdd(): Promise<void> {
    if (!newTitle.trim() || isAdding) return;
    setIsAdding(true);
    setNewTitle("");

    await addTodo(newTitle.trim());
    await loadTodos();
    setIsAdding(false);
  }

  async function handleDelete(id: string): Promise<void> {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    newTitle,
    setNewTitle,
    isLoading,
    isAdding,
    handleAdd,
    handleDelete,
    handleKeyDown,
  };
}