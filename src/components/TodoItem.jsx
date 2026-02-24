import { useState } from "react";

export const TodoItem = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div className="group dark:bg-page-dark flex h-12 items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`cursor-pointer rounded-full border-2 p-1 ${isCompleted ? "border-green-500 bg-green-500" : "border-gray-300 hover:border-gray-400"} transition-colors duration-300`}
        >
          <svg
            className={`h-4 w-4 ${isCompleted ? "text-white" : "text-transparent"}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinejoin="round"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span
          className={`text-1 ${isCompleted ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-300"}`}
        >
          {todo.text}
        </span>
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
