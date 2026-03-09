import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";

const TodoFilter = ({ filter, setFilter }) => {
  const buttonClasses = (currentFilter) =>
    `flex items-center px-4 py-2 rounded transition-colors cursor-pointer
    ${
      filter === currentFilter
        ? "bg-blue-500 text-white"
        : "bg-blue-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`;
  return (
    <div className="mb-4 flex flex-row justify-center gap-2">
      <button
        onClick={() => setFilter("all")}
        className={buttonClasses("all")}
        aria-label="Все задачи"
      >
        <MdOutlineFilterList size={18} />
      </button>
      <button
        onClick={() => setFilter("activ")}
        className={buttonClasses("activ")}
        aria-label="Не выполненные задачи"
      >
        <FaRegCircle size={16} />
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={buttonClasses("completed")}
        aria-label="Выполненные задачи"
      >
        <FaCheckCircle size={16} />
      </button>
    </div>
  );
};

export default TodoFilter;
