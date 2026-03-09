const SvgForm = ({ classNameSVG, dSVG, viewBoxSVG, dSVG2 }) => {
  return (
    <svg
      className={classNameSVG}
      stroke="currentColor"
      viewBox={viewBoxSVG}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={dSVG} strokeLinejoin="round" strokeLinecap="round" />
      {dSVG2} ? (<path d={dSVG2} strokeLinejoin="round" strokeLinecap="round" />
      ) : {""}
    </svg>
  );
};

export default SvgForm;
