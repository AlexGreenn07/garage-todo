import { TodoItem } from "./TodoItem";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";

const TodoList = ({
  todos,
  handleUpdate,
  toggleComplete,
  setDeletingId,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => setDeletingId(todo.id)}
          onToggleComplete={toggleComplete}
          onUpdate={handleUpdate}
        ></TodoItem>
      ))}
    </div>
  );
};

export default TodoList;
