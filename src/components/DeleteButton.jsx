const DeleteButton = ({ id, onDelete }) => {
  return (
    <button
      onClick={() => onDelete(id)}
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
    </button>
  );
};

export default DeleteButton;
