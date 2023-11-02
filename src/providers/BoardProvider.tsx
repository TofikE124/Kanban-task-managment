import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface BoardContext {
  activeIndex: number;
  updateActiveIndex: (value: number) => void;
}

export const BoardContext = createContext<BoardContext>({} as BoardContext);

const BoardProvider = ({ children }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  function updateActiveIndex(value: number) {
    setActiveIndex(value);
  }
  return (
    <BoardContext.Provider value={{ activeIndex, updateActiveIndex }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
