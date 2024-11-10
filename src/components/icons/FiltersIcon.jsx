import * as React from "react";
const FiltersIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={22}
    height={22}
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M19 4v6m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v6M12 4v12m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5 8v12M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </svg>
);
export default FiltersIcon;
