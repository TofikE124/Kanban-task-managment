import Board from "./entities/Board";
import getBoards from "./getBoards";

const findTask = (activeIndex: number, taskTitle: string, boards?: Board[]) => {
  if (!boards) boards = getBoards();
  const columns = boards[activeIndex].columns;
  let task;
  for (let c of columns) {
    const temp = c.tasks.find((t) => t.title === taskTitle);
    temp ? (task = temp) : null;
  }
  return task;
};

export default findTask;
