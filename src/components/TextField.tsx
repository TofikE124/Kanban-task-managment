import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import React from "react";

interface Props {
  children?: React.ReactNode;
  placeholder?: string;
  defaultValue?: string;
  name?: string;
  error?: string;
  multiLine?: boolean;
  onValueChange?: (value: string) => void;
  rest?: any[];
}

const TextField = React.forwardRef(
  (
    {
      children,
      placeholder = "",
      defaultValue = "",
      name = "",
      error = "",
      multiLine = false,
      onValueChange = () => {},
      ...rest
    }: Props,
    ref: any
  ) => {
    const { darkMode } = useContext(ThemeContext);
    return (
      <div
        className={`text-field-container ${error ? "error" : ""}  ${darkMode}`}
      >
        {children ? (
          <label className="text-field-label h-sm">{children}</label>
        ) : null}
        <div className="text-field flex">
          {multiLine ? (
            <textarea
              className="text-field-input b-lg"
              placeholder={placeholder}
              name={name}
              defaultValue={defaultValue}
              onChange={(e) => onValueChange(e.target.value)}
              ref={ref}
              {...rest}
            />
          ) : (
            <input
              className="text-field-input b-lg"
              placeholder={placeholder}
              name={name}
              defaultValue={defaultValue}
              onChange={(e) => onValueChange(e.target.value)}
              {...rest}
              ref={ref}
            />
          )}

          <p className="text-field-error txt-red b-lg">{error}</p>
        </div>
      </div>
    );
  }
);

export default TextField;
