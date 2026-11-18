import React from "react";

interface BrandMarkProps {
  className?: string;
  size?: number;
}

export function BrandMark({ className = "", size = 36 }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
        stroke="#A3191F"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 13L48 22.5V41.5L32 51L16 41.5V22.5L32 13Z"
        stroke="#A3191F"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 28L32 20L46 28M18 36L32 44L46 36"
        stroke="#1E1E1E"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark-stroke"
      />
      <path
        d="M24 32H40"
        stroke="#A3191F"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
