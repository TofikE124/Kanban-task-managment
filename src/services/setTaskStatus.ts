import getBoards from "./getBoards";

const setTaskStatus = (
  boardIndex: number,
  columnName: string,
  TaskTitle: string,
  status: string
) => {
  const boards = getBoards();
  const board = boards[boardIndex];
  const column = board.columns.find((c) => c.name === columnName);
  const targetColumn = board.columns.find((c) => c.name === status);
  let tasks = column?.tasks;
  const task = tasks?.find((t) => t.title === TaskTitle);
  if (!tasks || !task || !column) {
    return;
  }
  if (task?.status === status) {
    return;
  }

  targetColumn?.tasks.unshift({ ...task, status });
  let tempTasks = [...tasks];
  tempTasks = tempTasks.filter((t) => t.title !== task.title);
  column.tasks = tempTasks;
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
};

export default setTaskStatus;
