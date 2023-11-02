import getBoards from "./getBoards";

const disableAllRecent = () => {
  let boards = getBoards();
  boards = boards.map((b) => ({
    ...b,
    columns: b.columns.map((c) => ({
      ...c,
      tasks: c.tasks.map((t) => ({ ...t, recent: false })),
    })),
  }));
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
};

export default disableAllRecent;
