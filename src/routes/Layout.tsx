import { useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { SidebarContext } from "../providers/SidebarProvider";
import Main from "./Main";
import { ThemeContext } from "../providers/ThemeProvider";

const Layout = () => {
  const { showSidebar } = useContext(SidebarContext);
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`layout-grid grid ${darkMode} ${
        showSidebar ? "" : "no-sidebar"
      }`}
    >
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
};

export default Layout;
