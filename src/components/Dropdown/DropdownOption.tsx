import { useContext, useEffect } from "react";
import { dropdownContext } from "./DropdownContainer";

interface Props {
  children: React.ReactNode;
  defaultOption?: boolean;
}

const DropdownOption = ({ children, defaultOption }: Props) => {
  const { updateSelectedOption, selectedOption, toggleDropdown } =
    useContext(dropdownContext);
  const handleClick = () => {
    updateSelectedOption(children?.toString()!);
    toggleDropdown();
  };
  useEffect(() => {
    if (defaultOption && !selectedOption) {
      updateSelectedOption(children?.toString()!);
    }
  }, []);

  return (
    <p onClick={handleClick} className="dropdown-option b-lg">
      {children}
    </p>
  );
};

export default DropdownOption;
