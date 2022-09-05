import React from "react";

type IconProps = {
  className?: string
}

export const IconCompanyList: React.FC<IconProps> = ({ className }) => {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 6H16V10H14V6H10V4H14V0H16V4H20V6ZM12 0H0V1H12V0ZM0 5H8V4H0V5ZM0 9H8V8H0V9Z" fill="#475569" />
    </svg>
  );
};
