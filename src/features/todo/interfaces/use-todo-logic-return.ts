import type { Todo } from "../../../core/types/todo";

export interface UseTodoLogicReturn {
  todos: Todo[];
  newTitle: string;
  setNewTitle: (title: string) => void;
  isLoading: boolean;
  isAdding: boolean;
  handleAdd: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}