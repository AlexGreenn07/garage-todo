import { useEffect, useRef, useState, useCallback } from "react";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";
import { useSortable } from "@dnd-kit/sortable";
export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");
  const editFormRef = useRef(null);
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: todo.id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    zIndex: isDragging ? 1 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggle = () => onToggleComplete(todo.id);

  const handleSave = useCallback(() => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, editDeadline);
    }
    setIsEditing(false);
  }, [editText, editDeadline, todo.id, onUpdate]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editFormRef.current && !editFormRef.current.contains(e.target)) {
        handleSave();
      }
    };
    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing, handleSave]);
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="group dark:bg-page-dark flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div
        {...listeners}
        className="handle cursor-grab p-2 text-gray-400 hover:rounded-2xl hover:bg-gray-200 hover:text-gray-600 active:cursor-grabbing"
      >
        ⠿
      </div>
      <div className="flex flex-1 items-center gap-3">
        <CheckboxButton handleToggle={handleToggle} todo={todo} />
        {isEditing ? (
          <TodoEditForm
            editText={editText}
            setEditText={setEditText}
            handleSave={handleSave}
            editDeadline={editDeadline}
            setEditDeadline={setEditDeadline}
            editFormRef={editFormRef}
          />
        ) : (
          <TodoTextDisplay todo={todo} setIsEditing={setIsEditing} />
        )}
      </div>
      <DeleteButton id={todo.id} onDelete={onDelete} />{" "}
    </div>
  );
};
