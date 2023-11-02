import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { SidebarContext } from "../providers/SidebarProvider";
import Button from "../components/Button";
import ThreeDots from "../../public/icon-vertical-ellipsis.svg";
import logoMobile from "../../public/logo-mobile.svg";
import arrowIcon from "../../public/icon-chevron-down.svg";
import Blackoverlay from "../components/Blackoverlay";
import TaskForm from "../components/forms/TaskForm";
import { BoardContext } from "../providers/BoardProvider";
import getBoards from "../services/getBoards";
import DeleteForm from "../components/forms/DeleteForm";
import BoardForm from "../components/forms/BoardForm";
const Header = () => {
  const { darkMode } = useContext(ThemeContext);
  const { activeIndex } = useContext(BoardContext);
  const [boardName, setBoardName] = useState("");
  const [addDisbaled, setAddDisabled] = useState(false);
  const { showMobileSidebar, toggleMobileSidebar } = useContext(SidebarContext);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [showDeleteBoard, setShowDeleteBoard] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);

  useEffect(() => {
    const handleBoardsChange = () => {
      const boards = getBoards();
      if (boards.length) {
        setBoardName(boards[activeIndex].name);
        setAddDisabled(!Boolean(boards[activeIndex].columns.length));
      } else {
        setBoardName("");
      }
    };
    handleBoardsChange();
    window.addEventListener("boards", handleBoardsChange);
    return () => window.removeEventListener("boards", handleBoardsChange);
  }, [activeIndex]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("extra-options-container") ||
        target.parentElement?.classList.contains("extra-options-container")
      ) {
        return;
      }
      setShowExtra(false);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (!boardName) {
    return <></>;
  }

  return (
    <>
      {showMobileSidebar ? (
        <Blackoverlay
          className="sidebar-overlay"
          onClick={toggleMobileSidebar}
        />
      ) : showAddTask ? (
        <TaskForm closeSelf={() => setShowAddTask(false)} />
      ) : null}

      <header className={`primary-header  ${darkMode}`}>
        {showDeleteBoard ? (
          <>
            <Blackoverlay onClick={() => setShowDeleteBoard(false)} />
            <DeleteForm
              boardName={getBoards()[activeIndex].name}
              cancel={() => {
                setShowDeleteBoard(false);
              }}
              closeSelf={() => {
                setShowDeleteBoard(false);
              }}
            />
          </>
        ) : showEditBoard ? (
          <BoardForm
            boardName={getBoards()[activeIndex].name}
            closeSelf={() => setShowEditBoard(false)}
          />
        ) : null}
        <div className="header-container flex">
          <div className="header-left flex">
            <picture>
              <source srcSet={logoMobile} media="(max-width:45em)" />
              <img />
            </picture>
            <p className="header-title h-xlg">{boardName}</p>
            <div
              onClick={toggleMobileSidebar}
              className="header-clickable flex"
            >
              <p className="h-xlg  ">{boardName}</p>
              <div className="header-arrow">
                <img src={arrowIcon} />
              </div>
            </div>
          </div>
          <div className="header-right flex">
            <Button
              onClick={() => setShowAddTask(true)}
              className="new-task-btn h-md"
              size={"lg"}
              type={"primary"}
              disabled={addDisbaled}
            >
              + <span>Add New Task</span>
            </Button>
            <div
              onClick={() => setShowExtra(!showExtra)}
              className="header-options-container extra-options-container"
            >
              <img src={ThreeDots} />
              {showExtra ? (
                <div className="header-options extra-options flow">
                  <button
                    onClick={() => setShowEditBoard(true)}
                    type="button"
                    className="txt-medium-grey"
                  >
                    Edit Board
                  </button>
                  <button
                    onClick={() => setShowDeleteBoard(true)}
                    type="button"
                    className="txt-red"
                  >
                    Delete Board
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
