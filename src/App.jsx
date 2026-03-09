import { lazy, Suspense, useState } from "react";
import ToggleTheme from "./components/ToggleTheme";
import { initialTheme } from "./helpers/initialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import DeleteCompletedButton from "./components/DeleteCompletedButton";
import Loader from "./components/Loader";

const MainContent = lazy(() => import("./components/MainContent"));
function App() {
  const [theme, setTheme] = useState(initialTheme());

  const {
    todos,
    setTodos,
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
    onReorder,
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
      <Suspense fallback={<Loader />}>
        <MainContent
          onAdd={onAdd}
          todos={todos}
          setTodos={setTodos}
          handleUpdate={handleUpdate}
          toggleComplete={toggleComplete}
          setDeletingId={setDeletingId}
          onReorder={onReorder}
        />
      </Suspense>

      <DeleteConfirmModal
        deletingId={deletingId}
        onConfirm={() => {
          handleDelete(deletingId);
          setDeletingId(null);
        }}
        onCancel={() => setDeletingId(null)}
        message={"Вы уверены, что хотите удалить эту задачу?"}
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
