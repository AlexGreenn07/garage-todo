import SvgForm from "./SvgForm";

const TodoEditForm = ({
  editText,
  setEditText,
  handleSave,
  editDeadline,
  setEditDeadline,
  editFormRef,
}) => {
  return (
    <div
      className="flex w-full flex-col items-stretch gap-2"
      ref={editFormRef}
    >
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
          onChange={(event) =>
            setEditDeadline(event.target.value)
          }
          className="w-full rounded border-2 border-blue-500 px-2 py-1 text-sm text-gray-700 sm:flex-1 dark:text-gray-300"
        />
        <button
          onClick={handleSave}
          className="flex cursor-pointer items-center justify-center gap-3 rounded border-2 border-green-500 bg-white px-2 py-1 text-sm text-green-600 transition-colors hover:bg-green-50 hover:text-green-800 sm:px-3 sm:py-1 sm:text-base"
        >
          <SvgForm
            classNameSVG={"xs:w-5 xs:h-5 h-4 w-4 stroke-2"}
            dSVG={"M5 10l4 4 8-8"}
            viewBoxSVG={"0 0 20 20"}
          />

          <span className="sm:hidden">OK</span>
          <span className="hidden sm:inline">Готово</span>
        </button>
      </div>
    </div>
  );
};

export default TodoEditForm;
