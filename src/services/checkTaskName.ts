import getBoards from "./getBoards";

const checkTaskName = (activeIndex: number, title: string) => {
  const columns = getBoards()[activeIndex].columns;
  return columns.every((c) => c.tasks.every((t) => t.title !== title));
};
export default checkTaskName;
