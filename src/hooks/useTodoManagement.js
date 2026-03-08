import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {
  createNewTodo,
  sortedSavedTodos,
  toggleTodoCompletion,
  updateTodoData,
} from "../helpers/todoHelpers";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../api/todoApi";
import { useTodoActions } from "./useTodoActions";
export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
  const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = sortedSavedTodos(loadFromLocalStorage());

      setTodos(savedTodos);
      try {
        const serverTodos = await fetchTodos();
        const sortedServerTodos = sortedSavedTodos(serverTodos);
        setTodos(sortedServerTodos);
        saveToLocalStorage(sortedServerTodos);
      } catch (error) {
        console.error("Ошибка загрузки данных: ", error);
      }
    };
    loadInitialData();
  }, []);

  const actions = useTodoActions({
    todos,
    setTodos,
    createNewTodo,
    createTodo,
    saveToLocalStorage,
    updateTodoData,
    updateTodo,
    toggleTodoCompletion,
    deleteTodo,
    setIsDeletingCompleted,
  });

  return {
    todos,
    setTodos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    ...actions,
  };
};
