import getBoards from "./getBoards";
import findTask from "./findTask";

const toggleSubtask = (
  activeIndex: number,
  taskTitle: string,
  subtaskTitle: string
) => {
  const boards = getBoards();
  const task = findTask(activeIndex, taskTitle, boards);
  const subtask = task?.subtasks.find((subT) => subT.title === subtaskTitle);
  if (!subtask) return;
  subtask.isCompleted = !subtask?.isCompleted;
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
};

export default toggleSubtask;
