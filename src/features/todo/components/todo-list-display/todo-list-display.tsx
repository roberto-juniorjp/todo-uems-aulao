import React from 'react';
import type { Todo } from '../../../../core/types/todo';
import TodoItem from '../todo-item/todo-item';

interface TodoListDisplayProps {
  todos: Todo[];
  onDelete: (id: string) => void;
}

export const TodoListDisplay: React.FC<TodoListDisplayProps> = ({ todos, onDelete }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={() => onDelete(todo.id)} />
      ))}
    </ul>
  );
};