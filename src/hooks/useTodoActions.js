export const useTodoActions = ({
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
}) => {
  const onAdd = async (text, deadline) => {
    const newTodo = createNewTodo(text, deadline, todos.length + 1);
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    try {
      const createdTodo = await createTodo(newTodo);
      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo,
      );
      setTodos(syncedTodos);
      saveToLocalStorage(syncedTodos);
    } catch (error) {
      console.error("Ошибка добавления", error);
      setTodos(todos);
    }
  };

  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedTodo = updateTodoData(todoToUpdate, newText, newDeadline);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);
    try {
      await updateTodo(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка обновления: ", error);
      setTodos(todos);
    }
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedTodo = toggleTodoCompletion(todoToUpdate);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);
    try {
      await updateTodo(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка обновления: ", error);
      setTodos(todos);
    }
  };

  const handleDelete = async (id) => {
    const previosTodos = todos;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    try {
      await deleteTodo(id);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка удаления: ", error);
      setTodos(previosTodos);
    }
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const handleDeleteCompleted = () => {
    if (!todos.some((todo) => todo.completed)) return;
    setIsDeletingCompleted(true);
  };

  const confirmDeleteCompleted = async () => {
    const originalTodos = [...todos];
    const completedIds = originalTodos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    setTodos(originalTodos.filter((todo) => !todo.completed));
    const failedDeleteIds = [];
    for (const id of completedIds) {
      try {
        await deleteTodo(id);
      } catch (error) {
        console.error(`Ошибка удаления задасчи id: ${id}: `, error);
        failedDeleteIds.push(id);
      }
    }
    if (failedDeleteIds.length > 0) {
      setTodos(
        originalTodos.filter(
          (todo) => !todo.completed || failedDeleteIds.includes(todo.id),
        ),
      );
    }
    saveToLocalStorage(todos);
    setIsDeletingCompleted(false);
  };
  const onReorder = async (activeId, overId) => {
    if (!overId) return;
    try {
      const activeIndex = todos.findIndex((todo) => todo.id === activeId);
      const overIndex = todos.findIndex((todo) => todo.id === overId);
      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
        return;
      const newTodos = [...todos];
      const [movedTodo] = newTodos.splice(activeIndex, 1);
      newTodos.splice(overIndex, 0, movedTodo);
      const updatedTodos = newTodos.map((todo, index) => ({
        ...todo,
        order: index + 1,
      }));

      setTodos(updatedTodos);
      await Promise.all(
        updatedTodos.map((todo) => {
          updateTodo(todo.id, { order: todo.order });
        }),
      );
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка изменения порядка", error);
      setTodos(todos);
    }
  };

  return {
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    handleDeleteCompleted,
    confirmDeleteCompleted,
    onReorder,
    hasCompletedTodos,
  };
};
