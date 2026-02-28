import { useState } from "react";
import DeadlineBlock from "./DeadlineBlock";
import SvgForm from "./SvgForm";

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] =
    useState(false);

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
          <SvgForm
            classNameSVG={"h-6 w-6 stroke-2"}
            dSVG={"M12 4v16m8-8H4"}
            viewBoxSVG={"0 0 24 24"}
          />
        </button>
      </div>
      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />
    </form>
  );
}
