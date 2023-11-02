import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { SidebarContext } from "../providers/SidebarProvider";
import { BoardContext } from "../providers/BoardProvider";
import ThemeSwitch from "../components/ThemeSwitch";
import logoDark from "../../public/logo-dark.svg";
import logoLight from "../../public/logo-light.svg";
import hideSidebarIcon from "../../public/icon-hide-sidebar.svg";
import ShowSidebar from "../components/ShowSidebar";
import BoardItem from "../components/Board";
import Board from "../services/entities/Board";
import getBoards from "../services/getBoards";
import BoardForm from "../components/forms/BoardForm";

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext);
  const { showSidebar, toggleSidebar, showMobileSidebar } =
    useContext(SidebarContext);
  const { activeIndex, updateActiveIndex } = useContext(BoardContext);

  const [boards, setBoards] = useState<Board[]>([]);
  const [showBoardForm, setShowBoardForm] = useState(false);
  useEffect(() => {
    setBoards(getBoards());
    const handleBoardsChange = () => {
      setBoards(getBoards());
    };

    window.addEventListener("boards", handleBoardsChange);
    return () => window.removeEventListener("boards", handleBoardsChange);
  }, []);

  return (
    <>
      {showBoardForm ? (
        <BoardForm closeSelf={() => setShowBoardForm(false)} />
      ) : null}
      <div
        className={`sidebar-grid grid ${showSidebar ? "" : "hidden"}
        ${showMobileSidebar ? "mobile-toggled" : ""} ${darkMode}`}
      >
        <div className="logo">
          <img src={darkMode === "dark" ? logoDark : logoLight} />
        </div>
        <div className="boards-container">
          <p className="boards-title txt-medium-grey h-sm">
            All Boards ({boards.length})
          </p>
          <div className="boards grid">
            {boards.map((b, index) => (
              <BoardItem
                key={index}
                onClick={() => updateActiveIndex(index)}
                active={index === activeIndex}
              >
                {b.name}
              </BoardItem>
            ))}
            <BoardItem
              onClick={() => setShowBoardForm(true)}
              color="hsl(var(--clr-main-purple))"
            >
              + Create New Board
            </BoardItem>
          </div>
        </div>
        <div className="sidebar-options">
          <ThemeSwitch />
          <div className="hide-sidebar flex" onClick={() => toggleSidebar()}>
            <img src={hideSidebarIcon} />
            <p>Hide Sidebar</p>
          </div>
        </div>
      </div>
      <ShowSidebar />
    </>
  );
};

export default Sidebar;
