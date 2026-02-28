import React from "react";

const DeleteConfirmModal = ({
  onCancel,
  onConfirm,
  message,
  deletingId,
  isDeletingCompleted,
}) => {
  const showModal = isDeletingCompleted || deletingId;
  if (!showModal) return null;
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 z-4 bg-black/50 backdrop-blur-xs"></div>
      <div className="relative z-5 flex h-full items-center justify-center p-4">
        <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 text-gray-800 shadow-xl dark:bg-gray-800 dark:text-white">
          <h3 className="mb-4 text-xl font-bold">
            Подтверждение удаления
          </h3>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="cursor-pointer rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              Отмена
            </button>
            <button
              onClick={onConfirm}
              className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
