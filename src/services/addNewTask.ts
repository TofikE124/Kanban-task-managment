import disableAllRecent from "./disableAllRecent";
import Task from "./entities/Task";
import getBoards from "./getBoards";
import reArrangeColumn from "./reArrangeColumn";
const addNewTask = (
  activeIndex: number,
  taskData: Task,
  index: number = -1
) => {
  taskData = { ...taskData, recent: true };
  const boards = getBoards();
  const columns = boards[activeIndex].columns;
  const targetColumn = columns.find((c) => c.name === taskData.status);
  if (!targetColumn) return;
  if (index == -1) {
    targetColumn?.tasks.push(taskData);
  } else {
    const tasks = targetColumn?.tasks;
    if (!tasks) return;
    if (tasks.length === 0) {
      tasks.push(taskData);
    } else {
      const temp = [];
      while (tasks.length !== 0 && tasks[0].index !== index) {
        temp.push(tasks.shift()!);
      }
      tasks.unshift(taskData);
      if (temp) tasks.unshift(...temp);
      targetColumn!.tasks = tasks;
    }
  }
  targetColumn.tasks = reArrangeColumn(targetColumn).tasks;
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
  setTimeout(() => {
    disableAllRecent();
  }, 500);
};

export default addNewTask;
