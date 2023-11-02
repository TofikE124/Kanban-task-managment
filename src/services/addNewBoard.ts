import ColumnData from "./entities/ColumnData";
import getBoards from "./getBoards";

export interface Column {
  index: number;
  value: ColumnData;
  deleteSelf?: () => void;
  onChange?: (value: string) => void;
  error?: string;
}

interface Board {
  boardName: string;
  columns: Column[];
}
const addNewBoard = ({ boardName, columns }: Board) => {
  const boards = getBoards();
  const boardColumns: ColumnData[] = columns.map((c) => ({
    name: c.value.name,
    tasks: c.value.tasks,
  }));
  console.log(columns);
  boards.unshift({ name: boardName, columns: boardColumns });
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
};

export default addNewBoard;
