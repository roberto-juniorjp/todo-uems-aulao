import type { Todo } from "../../../core/types/todo";

export interface TodoListDisplayProps {
  todos: Todo[];
  onDelete: (id: string) => void;
}