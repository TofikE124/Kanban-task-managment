import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import Switch from "./Switch";
import iconLight from "../../public/icon-light-theme.svg";
import iconDark from "../../public/icon-dark-theme.svg";

const ThemeSwitch = () => {
  const { updateDarkMode } = useContext(ThemeContext);

  return (
    <div className="theme-switch flex">
      <div className="light-icon">
        <img src={iconLight} />
      </div>
      <Switch onChnage={(dark) => updateDarkMode(dark ? "dark" : "")} />
      <div className="dark-icon">
        <img src={iconDark} />
      </div>
    </div>
  );
};

export default ThemeSwitch;
