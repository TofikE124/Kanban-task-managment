import { createContext, useState } from "react";

interface ThemeContext {
  darkMode: "" | "dark";
  updateDarkMode: (value: "" | "dark") => void;
}
export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<"" | "dark">("");
  function updateDarkMode(value: "" | "dark") {
    setDarkMode(value);
  }
  return (
    <ThemeContext.Provider value={{ darkMode, updateDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
