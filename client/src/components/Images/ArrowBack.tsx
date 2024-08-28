import React from "react";

type Props = {
  size: number;
  className?: string;
};

const ArrowBack: React.FC<Props> = ({ size, className }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      stroke-width="3"
      stroke="#000000"
      fill="none"
      className={className}
    >
      <line x1="10.33" y1="32.63" x2="55.78" y2="32.63" />
      <polyline points="27.56 14.63 10.34 32.79 27.56 49.32" />
    </svg>
  );
};

export default ArrowBack;
