import React from "react";

function ToggleTheme({ toggleTheme, theme }) {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="relative cursor-pointer"
        >
          <div className="dark:bg-btn-dark h-7 w-14 rounded-full bg-gray-300 shadow-inner transition-colors duration-300"></div>
          <div className="absolute top-0.5 left-0.5 h-6 w-6 translate-x-0 transform rounded-full bg-white shadow-md transition-transform duration-300 dark:translate-x-7"></div>
        </button>
        <span className="ml-3 font-medium text-gray-700 dark:text-gray-300">
          {theme === "light" ? "Светлая" : "Темная"}
        </span>
      </div>
    </div>
  );
}

export default ToggleTheme;
