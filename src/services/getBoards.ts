import Board from "./entities/Board";

const getBoards = (): Board[] => {
  return JSON.parse(localStorage.getItem("boards") || "[]");
};

export default getBoards;
