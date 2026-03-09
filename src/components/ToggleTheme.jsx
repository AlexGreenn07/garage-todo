import React from "react";
import Notification from "./Notification";
import NetworkProvider from "../providers/NetworkProvider";
import { FaSun, FaMoon } from "react-icons/fa";

function ToggleTheme({ toggleTheme, theme }) {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="relative cursor-pointer"
          aria-label={theme === "light" ? "Светлая тема" : "Темная тема"}
        >
          <div className="dark:bg-btn-dark h-7 w-14 rounded-full bg-gray-300 shadow-inner transition-colors duration-300"></div>
          <div className="absolute top-0.5 left-0.5 flex h-6 w-6 translate-x-0 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 dark:translate-x-7">
            {theme === "light" ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-blue-700" />
            )}
          </div>
        </button>
      </div>
      <NetworkProvider>
        <Notification />
      </NetworkProvider>
    </div>
  );
}

export default ToggleTheme;
