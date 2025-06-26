import type { Todo } from "../../../core/types/todo";

export interface TodoItemProps {
  todo: Todo;
  onDelete: () => void;
}