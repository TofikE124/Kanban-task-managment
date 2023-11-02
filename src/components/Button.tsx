import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

interface Props {
  size: "sm" | "lg";
  type: "primary" | "secondary" | "destructive";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  submit?: boolean;
}
const Button = ({
  size,
  type,
  className = "",
  children,
  onClick,
  disabled,
  submit = false,
}: Props) => {
  const { darkMode } = useContext(ThemeContext);
  const buttonType = !submit ? "button" : "submit";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} btn btn-${size} btn-${type} ${darkMode} txt-white`}
      type={buttonType}
    >
      {children}
    </button>
  );
};

export default Button;
