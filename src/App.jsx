import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import ToggleTheme from "./components/ToggleTheme";
import { initialTheme } from "./helpers/initialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import DeleteCompletedButton from "./components/DeleteCompletedButton";
import MainContent from "./components/MainContent";

const LOCAL_STORAGE_KEY = "todos";
const API_URL =
  "https://69a04c083188b0b1d538546d.mockapi.io/api/v1/todos";
function App() {
  const [theme, setTheme] = useState(initialTheme());

  const {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    handleDeleteCompleted,
    confirmDeleteCompleted,
    hasCompletedTodos,
  } = useTodoManagement();

  return (
    <div
      data-theme={theme}
      className="bg-page-light dark:bg-page-dark flex min-h-screen flex-col items-center justify-center p-6"
    >
      <ToggleTheme
        toggleTheme={() => toggleTheme(setTheme)}
        theme={theme}
      ></ToggleTheme>
      <MainContent
        onAdd={onAdd}
        todos={todos}
        handleUpdate={handleUpdate}
        toggleComplete={toggleComplete}
        setDeletingId={setDeletingId}
      />
      <DeleteConfirmModal
        deletingId={deletingId}
        onConfirm={() => {
          handleDelete(deletingId);
          setDeletingId(null);
        }}
        onCancel={() => setDeletingId(null)}
        message={
          "Вы уверены, что хотите удалить эту задачу?"
        }
      />
      {isDeletingCompleted && (
        <DeleteConfirmModal
          isDeletingCompleted={isDeletingCompleted}
          onConfirm={confirmDeleteCompleted}
          onCancel={() => setIsDeletingCompleted(false)}
          message={`Вы уверены, что хотите удалить все выполненные задачи (${todos.filter((todo) => todo.completed).length})?`}
        />
      )}
      <DeleteCompletedButton
        onClick={handleDeleteCompleted}
        hasCompletedTodos={hasCompletedTodos}
      />
    </div>
  );
}

export default App;
