import { useState } from "react";

function App() {
  const initialTodos = [
    { id: 1, text: "Изучить React" },
    { id: 2, text: "Сделать TODO app" },
    { id: 3, text: "Сделать деплой" },
  ];
  const [todos, setTodos] = useState(initialTodos);
  return (
    <div>
      <div>
        <h1>My TODO App</h1>
        <div>Здесь будет компонент для добавления задач</div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
