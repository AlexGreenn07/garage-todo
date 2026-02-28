import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";

export const TodoItem = ({
  todo,
  onDelete,
  onToggleComplete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(
    todo.deadline || "",
  );
  const editFormRef = useRef(null);

  const handleToggle = () => onToggleComplete(todo.id);

  const handleSave = useCallback(() => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, editDeadline);
    }
    setIsEditing(false);
  }, [editText, editDeadline, todo.id, onUpdate]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        editFormRef.current &&
        !editFormRef.current.contains(e.target)
      ) {
        handleSave();
      }
    };
    if (isEditing) {
      document.addEventListener(
        "click",
        handleClickOutside,
      );
    }
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
      );
    };
  }, [isEditing, handleSave]);
  return (
    <div className="group dark:bg-page-dark flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center gap-3">
        <CheckboxButton
          handleToggle={handleToggle}
          todo={todo}
        />
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
          <TodoTextDisplay
            todo={todo}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
      <DeleteButton id={todo.id} onDelete={onDelete} />{" "}
    </div>
  );
};
