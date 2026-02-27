import { useEffect, useRef, useState, useCallback } from "react";

export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");
  const editFormRef = useRef(null);

  const handleToggle = () => onToggleComplete(todo.id);

  const handleSave = useCallback(() => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, editDeadline);
    }
    setIsEditing(false);
  }, [editText, editDeadline, todo.id, onUpdate]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editFormRef.current && !editFormRef.current.contains(e.target)) {
        handleSave();
      }
    };
    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing, handleSave]);
  return (
    <div className="group dark:bg-page-dark flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={`cursor-pointer rounded-full border-2 p-1 ${todo.completed ? "border-green-500 bg-green-500" : "border-gray-300 hover:border-gray-400"} transition-colors duration-300`}
        >
          <svg
            className={`h-4 w-4 ${todo.completed ? "text-white" : "text-transparent"}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 13l4 4L19 7" strokeLinejoin="round" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
        {isEditing ? (
          <div className="flex w-full flex-col items-stretch gap-2" ref={editFormRef}>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full rounded border-2 border-blue-500 px-2 py-1 text-sm text-gray-700 dark:text-gray-300"
            />
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <input
                type="datetime-local"
                value={editDeadline}
                onChange={(event) => setEditDeadline(event.target.value)}
                className="w-full rounded border-2 border-blue-500 px-2 py-1 text-sm text-gray-700 sm:flex-1 dark:text-gray-300"
              />
              <button
                onClick={handleSave}
                className="flex cursor-pointer items-center justify-center gap-1 rounded border-2 border-green-500 bg-white px-2 py-1 text-sm text-green-600 transition-colors hover:bg-green-50 hover:text-green-800 sm:px-3 sm:py-1 sm:text-base"
              >
                <svg
                  className="xs:w-5 xs:h-5 h-4 w-4"
                  stroke="currentColor"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10l4 4 8-8"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="sm:hidden">OK</span>
                <span className="hidden sm:inline">Готово</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex cursor-pointer flex-col" onDoubleClick={() => setIsEditing(true)}>
            <span
              className={`text-1 ${todo.completed ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-300"}`}
            >
              {todo.text}
            </span>
            <div>
              <span className="text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {todo.deadline && (
                <span
                  className={`text-xs ${todo.completed ? "text-gray-400" : new Date(todo.deadline) < new Date() ? "text-red-500" : "text-gray-500"}`}
                >
                  {"Сделать до: " +
                    new Date(todo.deadline).toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              )}
            </div>{" "}
          </div>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="cursor-pointer text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:text-red-500"
      >
        <svg
          className="h-5 w-5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
            strokeLinejoin="round"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </button>{" "}
    </div>
  );
};
