import { useState } from "react";

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, deadline);
      setText("");
      setDeadline("");
      setShowDeadlineInput(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавление задачи ..."
          className="dark:bg-page-dark dark:text-txt-dark flex-1 p-3 text-gray-700 placeholder-gray-400 outline-none"
        />

        <button
          type="submit"
          className="hover:bg-btn-light-hv bg-btn-light dark:bg-btn-dark hover:dark:bg-btn-dark-hv cursor-pointer p-3 text-white transition-colors duration-300"
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 4v16m8-8H4" strokeLinejoin="round" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {showDeadlineInput && (
        <div className="mt-2 flex items-center gap-2 text-gray-500">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 rounded border p-2"
          />
          <button
            type="button"
            onClick={() => {
              setDeadline("");
              setShowDeadlineInput(false);
            }}
            className="p-2 hover:text-gray-700"
          >
            Отмена
          </button>
        </div>
      )}

      {!showDeadlineInput && (
        <button
          type="button"
          onClick={() => {
            setShowDeadlineInput(true);
          }}
          className="p-2 text-blue-500 hover:text-blue-700"
        >
          + Добавить дедлайн
        </button>
      )}
    </form>
  );
}
