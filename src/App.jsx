import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import ToggleTheme from "./components/ToggleTheme";
import { initialTheme } from "./helpers/initialTheme";
import { toggleTheme } from "./helpers/toggleTheme";

function App() {
  const initialTodos = [
    { id: 1, text: "Изучить React" },
    { id: 2, text: "Сделать TODO app" },
    { id: 3, text: "Сделать деплой" },
  ];
  const [todos, setTodos] = useState(initialTodos);
  const [theme, setTheme] = useState(initialTheme());

  const onDelete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id != id),
    );
  };
  const onAdd = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      complited: false,
      deadline: new Date().toISOString(),
      order: todos.length + 1,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div
      data-theme={theme}
      className="bg-page-light dark:bg-page-dark flex min-h-screen flex-col items-center justify-center p-6"
    >
      <ToggleTheme
        toggleTheme={() => toggleTheme(setTheme)}
        theme={theme}
      ></ToggleTheme>
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
            ></TodoItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
