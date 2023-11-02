import { useContext } from "react";
import { BoardContext } from "../providers/BoardProvider";
import getBoards from "./getBoards";
const getColumnName = (taskTitle: string) => {
  const { activeIndex } = useContext(BoardContext);
  const board = getBoards()[activeIndex];
  for (let c of board.columns) {
    if (c.tasks.find((t) => t.title === taskTitle)) {
      return c.name;
    }
  }
  return "";
};

export default getColumnName;
