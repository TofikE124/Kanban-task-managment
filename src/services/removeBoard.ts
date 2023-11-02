import getBoards from "./getBoards";

const removeBoard = (activeIndex: number) => {
  let boards = getBoards();
  const name = boards[activeIndex].name;
  boards = boards.filter((b) => b.name !== name);
  localStorage.setItem("boards", JSON.stringify(boards));
  dispatchEvent(new Event("boards"));
};

export default removeBoard;
