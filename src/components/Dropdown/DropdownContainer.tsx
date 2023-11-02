import { createContext, useContext, useRef, useState } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";

interface Props {
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

interface DropdownContext {
  toggleDropdown: () => void;
  selectedOption: string;
  updateSelectedOption: (value: string) => void;
}
export const dropdownContext = createContext<DropdownContext>(
  {} as DropdownContext
);

const DropdownContainer = ({ children, onChange = () => {} }: Props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { darkMode } = useContext(ThemeContext);
  const ref = useRef<HTMLDivElement>(null);
  function toggleDropdown() {
    ref.current?.classList.toggle("toggled");
  }

  function updateSelectedOption(value: string) {
    onChange(value);
    setSelectedOption(value);
  }

  return (
    <dropdownContext.Provider
      value={{ toggleDropdown, selectedOption, updateSelectedOption }}
    >
      <div ref={ref} className={`dropdown-container ${darkMode}`}>
        {children}
      </div>
    </dropdownContext.Provider>
  );
};

export default DropdownContainer;
