import React from 'react';
import TodoItem from '../todo-item/todo-item';
import type { TodoListDisplayProps } from '../../interfaces/todo-list-display-props';

export const TodoListDisplay: React.FC<TodoListDisplayProps> = ({ todos, onDelete }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={() => onDelete(todo.id)} />
      ))}
    </ul>
  );
};