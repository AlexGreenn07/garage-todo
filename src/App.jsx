import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import ToggleTheme from "./components/ToggleTheme";
import { initialTheme } from "./helpers/initialTheme";
import { toggleTheme } from "./helpers/toggleTheme";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(initialTheme());

  const onAdd = (text, deadline) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order: todos.length + 1,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };
    const updatedTodos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
    setTodos(updatedTodos);
  };

  const onDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
  };

  return (
    <div
      data-theme={theme}
      className="bg-page-light dark:bg-page-dark flex min-h-screen flex-col items-center justify-center p-6"
    >
      <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme}></ToggleTheme>
      <div className="mx-auto flex flex-col gap-3">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 dark:text-white">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            My TODO App
          </span>
        </h1>
        <AddTodo onAdd={onAdd}></AddTodo>
        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggleComplete={toggleComplete}
            ></TodoItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
