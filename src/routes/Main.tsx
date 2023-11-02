import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import Button from "../components/Button";
import Column from "../components/Column";
import ColumnData from "../services/entities/ColumnData";
import getBoards from "../services/getBoards";
import { BoardContext } from "../providers/BoardProvider";
import ColumnForm from "../components/forms/AddColumnForm";
import Board from "../services/entities/Board";
import BoardForm from "../components/forms/BoardForm";

const Main = () => {
  const { darkMode } = useContext(ThemeContext);
  const [boards, setBoards] = useState<Board[]>();
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const { activeIndex } = useContext(BoardContext);
  const [showColumnForm, setShowColumnForm] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);

  useEffect(() => {
    const handleBoardsChange = () => {
      const boards = getBoards();
      setBoards(boards);
      setColumns(boards[activeIndex].columns);
    };
    handleBoardsChange();
    window.addEventListener("boards", handleBoardsChange);
    return () => window.removeEventListener("boards", handleBoardsChange);
  }, [activeIndex]);

  if (!boards?.length)
    return (
      <>
        {showBoardForm ? (
          <BoardForm closeSelf={() => setShowBoardForm(false)} />
        ) : null}
        <main className={`main  ${darkMode}`}>
          <div className="columns-container grid">
            <div className="empty-columns flow">
              <p className="h-lg txt-medium-grey">
                You don't have any Boards yet. Create one to get started
              </p>
              <Button
                onClick={() => setShowBoardForm(true)}
                size={"lg"}
                type={"primary"}
                className="h-md"
              >
                + Add New Borad
              </Button>
            </div>
          </div>
        </main>
      </>
    );

  if (!columns.length)
    return (
      <>
        {showColumnForm ? (
          <ColumnForm closeSelf={() => setShowColumnForm(false)} />
        ) : null}
        <main className={`main  ${darkMode}`}>
          <div className="columns-container grid">
            <div className="empty-columns flow">
              <p className="h-lg txt-medium-grey">
                This board is empty. Create a new column to get started.
              </p>
              <Button
                onClick={() => setShowColumnForm(true)}
                size={"lg"}
                type={"primary"}
                className="h-md"
              >
                + Add New Column
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  else
    return (
      <>
        {showColumnForm ? (
          <ColumnForm closeSelf={() => setShowColumnForm(false)} />
        ) : null}
        <main className={`main  ${darkMode}`}>
          <div className="columns-container flex">
            {columns.map((c, index) => {
              return <Column key={index} columnData={c} />;
            })}
            <div
              onClick={() => setShowColumnForm(true)}
              className="new-column-container grid"
            >
              <p className="txt-medium-grey h-xlg">+ New Column</p>
            </div>
          </div>
        </main>
      </>
    );
};

export default Main;
