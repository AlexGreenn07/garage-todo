const CheckboxButton = ({ handleToggle, todo }) => {
  return (
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
        <path
          d="M5 13l4 4L19 7"
          strokeLinejoin="round"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default CheckboxButton;
