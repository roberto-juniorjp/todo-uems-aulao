import { useTodoLogic } from "./hooks/use-todo-logic";
import { TodoHeader } from "../../shared/components/todo-header";
import { TodoForm } from "./components/todo-form/todo-form";
import { TodoFooter } from "../../shared/components/todo-footer";
import { TodoListDisplay } from "./components/todo-list-display/todo-list-display";
import { TodoStatusMessage } from "./components/todo-status-message/todo-status-message";

export default function TodoList() {
  const todoData = useTodoLogic();

  return (
    <div className="flex h-full flex-grow flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-zinc-900 dark:to-slate-900 p-4 overflow-hidden">
      <div className="max-w-2xl w-full flex flex-col flex-grow items-center justify-center">
        <TodoHeader />

        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-700/50 overflow-hidden">
          <TodoForm
            newTitle={todoData.newTitle}
            setNewTitle={todoData.setNewTitle}
            handleAdd={todoData.handleAdd}
            handleKeyDown={todoData.handleKeyDown}
            isAdding={todoData.isAdding}
          />

          <div className="p-8">
            <TodoStatusMessage isLoading={todoData.isLoading} todosCount={todoData.todos.length} />

            {!todoData.isLoading && todoData.todos.length > 0 && (
              <TodoListDisplay todos={todoData.todos} onDelete={todoData.handleDelete} />
            )}
          </div>
        </div>

        <TodoFooter />
      </div>
    </div>
  );
}