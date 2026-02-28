const TodoFilter = ({ filter, setFilter }) => {
  const buttonClasses = (currentFilter) =>
    `px-4 py-2 rounded transition-color cursor-pointer flex-grow
    ${
      filter === currentFilter
        ? "bg-blue-500 text-white"
        : "bg-blue-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`;
  return (
    <div className="mb-4 flex gap-2">
      <button
        onClick={() => setFilter("all")}
        className={buttonClasses("all")}
      >
        Все
      </button>
      <button
        onClick={() => setFilter("activ")}
        className={buttonClasses("activ")}
      >
        Не выполненные
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={buttonClasses("completed")}
      >
        Выполненные
      </button>
    </div>
  );
};

export default TodoFilter;
