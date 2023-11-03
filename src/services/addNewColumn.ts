import getRandomColor from "./colors";
import getBoards from "./getBoards";

const addNewColumn = (activeIndex: number, columnName: string) => {
  const boards = getBoards();
  const columns = boards[activeIndex].columns;
  columns.push({ name: columnName, tasks: [], color: getRandomColor() });
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
};

export default addNewColumn;
