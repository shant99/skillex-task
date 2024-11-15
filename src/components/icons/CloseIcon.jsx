import * as React from "react";
const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={25}
    height={25}
    {...props}
  >
    <g stroke="#1C274C" strokeLinecap="round" strokeWidth={1.5}>
      <path d="m14.5 9.5-5 5m0-5 5 5M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
    </g>
  </svg>
);
export default CloseIcon;
