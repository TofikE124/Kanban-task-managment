import getBoards from "./getBoards";
import reArrangeColumn from "./reArrangeColumn";

const removeTask = (activeIndex: number, taskTitle: string) => {
  const boards = getBoards();
  const columns = boards[activeIndex].columns;
  let targetColumn;
  for (let c of columns) {
    const temp = c.tasks.find((t) => {
      return t.title === taskTitle;
    });
    if (temp) {
      targetColumn = c;
    }
  }
  if (!targetColumn) return;
  targetColumn.tasks = targetColumn.tasks.filter((t) => t.title !== taskTitle);
  targetColumn.tasks = reArrangeColumn(targetColumn).tasks;
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
};

export default removeTask;
