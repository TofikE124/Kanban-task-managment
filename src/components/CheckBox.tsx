import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

interface Props {
  children: React.ReactNode;
  name: string;
  checked?: boolean;
  onChange?: (name: string, checked: boolean) => void;
}

const CheckBox = ({ children, name, checked, onChange = () => {} }: Props) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`primary-checkbox-container ${darkMode}`}>
      <label className="flex">
        <input
          name={name}
          className="primary-checkbox flex txt-main-purple"
          type="checkbox"
          value={children?.toString()}
          checked={checked}
          onChange={(e) => onChange(name, e.target.checked)}
        />
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
