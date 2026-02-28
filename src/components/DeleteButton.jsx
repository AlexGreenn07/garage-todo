import SvgForm from "./SvgForm";

const DeleteButton = ({ id, onDelete }) => {
  return (
    <button
      onClick={() => onDelete(id)}
      className="cursor-pointer text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:text-red-500"
    >
      <SvgForm
        classNameSVG={"h-6 w-6 stroke-2"}
        dSVG={
          "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
        }
        viewBoxSVG={"0 0 24 24"}
      />
    </button>
  );
};

export default DeleteButton;
