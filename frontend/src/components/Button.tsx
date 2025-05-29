import React, { type ReactNode } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gray-200 text-black flex gap-1 px-4 py-2 rounded hover:bg-gray-300 hover:cursor-pointer transition ${className}`}
      disabled={disabled}
    >
      {" "}
      {children}
      <span>{label}</span>
    </button>
  );
};

export default Button;
