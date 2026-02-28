const DeadlineBlock = ({
  showDeadlineInput,
  deadline,
  setDeadline,
  setShowDeadlineInput,
}) => {
  return (
    <>
      {showDeadlineInput && (
        <div className="mt-2 flex items-center gap-2 text-gray-500">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 rounded border border-blue-300 p-2"
          />
          <button
            type="button"
            onClick={() => {
              setDeadline("");
              setShowDeadlineInput(false);
            }}
            className="cursor-pointer p-2 hover:text-gray-700"
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
    </>
  );
};

export default DeadlineBlock;
