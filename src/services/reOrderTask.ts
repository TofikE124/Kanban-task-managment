import addNewTask from "./addNewTask";
import Task from "./entities/Task";
import getBoards from "./getBoards";
import removeTask from "./removeTask";

const reOrderTask = (
  activeIndex: number,
  taskData: Task,
  prevColumnName: string,
  prevIndex: number,
  newColumnName: string,
  newIndex: number
) => {
  const boards = getBoards();
  const columns = boards[activeIndex].columns;
  const newColumn = columns.find((c) => c.name === newColumnName);
  const prevColumn = columns.find((c) => c.name === prevColumnName);
  let taskDataCopy: Task = { ...taskData, status: newColumnName };
  if (!newColumn || !prevColumn) return;
  removeTask(activeIndex, taskData.title);
  addNewTask(activeIndex, taskDataCopy, newIndex);
};

export default reOrderTask;
