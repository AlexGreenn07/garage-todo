import SvgForm from "./SvgForm";

const CheckboxButton = ({ handleToggle, todo }) => {
  return (
    <button
      onClick={handleToggle}
      className={`cursor-pointer rounded-full border-2 p-1 ${todo.completed ? "border-green-500 bg-green-500" : "border-gray-300 hover:border-gray-400"} transition-colors duration-300`}
    >
      <SvgForm
        classNameSVG={`h-4 w-4 stroke-3 ${todo.completed ? "text-white" : "text-transparent"}`}
        dSVG={"M5 13l4 4L19 7"}
        viewBoxSVG={"0 0 24 24"}
      />
    </button>
  );
};

export default CheckboxButton;
