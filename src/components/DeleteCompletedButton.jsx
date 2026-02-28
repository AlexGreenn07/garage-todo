const DeleteCompletedButton = ({
  onClick,
  hasCompletedTodos,
}) => {
  if (!hasCompletedTodos) return null;
  return (
    <button
      onClick={onClick}
      className="mt-4 cursor-pointer rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
    >
      Удалить выполненные
    </button>
  );
};

export default DeleteCompletedButton;
