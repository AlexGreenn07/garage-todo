import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "todos";
const API_URL =
  "https://69a04c083188b0b1d538546d.mockapi.io/api/v1/todos";
export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] =
    useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      );
      setTodos(savedTodos);
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const serverTodos = await response.json();
          setTodos(serverTodos);
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(serverTodos),
          );
        }
      } catch (error) {
        console.error("Ошибка загрузки данных: ", error);
      }
    };
    loadInitialData();
  }, []);

  const onAdd = async (text, deadline) => {
    const newTodo = {
      id: `temp_${Date.now()}`,
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order: todos.length + 1,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const createdTodo = await response.json();
      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo,
      );
      setTodos(syncedTodos);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(syncedTodos),
      );
    } catch (error) {
      console.error("Ошибка добавления", error);
      setTodos(todos);
    }
  };

  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find(
      (todo) => todo.id === id,
    );
    if (!todoToUpdate) return;
    const updatedTodo = {
      ...todoToUpdate,
      text: newText,
      deadline: newDeadline,
    };
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedTodos),
      );
    } catch (error) {
      console.error("Ошибка обновления: ", error);
      setTodos(todos);
    }
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find(
      (todo) => todo.id === id,
    );
    if (!todoToUpdate) return;
    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedTodos),
      );
    } catch (error) {
      console.error("Ошибка обновления: ", error);
      setTodos(todos);
    }
  };

  const handleDelete = async (id) => {
    const previosTodos = todos;
    const updatedTodos = todos.filter(
      (todo) => todo.id !== id,
    );
    setTodos(updatedTodos);
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedTodos),
      );
    } catch (error) {
      console.error("Ошибка удаления: ", error);
      setTodos(previosTodos);
    }
  };

  const hasCompletedTodos = todos.some(
    (todo) => todo.completed,
  );

  const handleDeleteCompleted = () => {
    if (!hasCompletedTodos) return;
    setIsDeletingCompleted(true);
  };

  const confirmDeleteCompleted = async () => {
    const originalTodos = [...todos];
    const completedIds = originalTodos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    setTodos(
      originalTodos.filter((todo) => !todo.completed),
    );
    const failedDeleteIds = [];
    for (const id of completedIds) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error(
          `Ошибка удаления задасчи id: ${id}: `,
          error,
        );
        failedDeleteIds.push(id);
      }
    }
    if (failedDeleteIds.length > 0) {
      setTodos(
        originalTodos.filter(
          (todo) =>
            !todo.completed ||
            failedDeleteIds.includes(todo.id),
        ),
      );
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(todos),
    );
    setIsDeletingCompleted(false);
  };

  return {
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
  };
};
