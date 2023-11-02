import { useContext } from "react";
import { dropdownContext } from "./DropdownContainer";
import arrowDown from "../../../public/icon-chevron-down.svg";
interface Props {
  children: React.ReactNode;
}
const DropdownTitle = ({ children }: Props) => {
  const { selectedOption, toggleDropdown } = useContext(dropdownContext);

  return (
    <>
      <p className="dropdown-title h-sm fw-bold">{children}</p>
      <div
        onClick={() => toggleDropdown()}
        className="dropdown-selected b-lg fw-medium flex"
      >
        {selectedOption}
        <div className="dropdown-arrow-container grid">
          <img src={arrowDown} />
        </div>
      </div>
    </>
  );
};

export default DropdownTitle;
