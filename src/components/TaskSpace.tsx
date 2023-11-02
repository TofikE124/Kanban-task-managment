import React, { useContext } from "react";
import { BoardContext } from "../providers/BoardProvider";
import reOrderTask from "../services/reOrderTask";
import findTask from "../services/findTask";

interface Props {
  index: number;
  columnName: string;
  isDragging: boolean;
  fill?: boolean;
}

const TaskSpace = ({ index, isDragging, columnName, fill = false }: Props) => {
  const { activeIndex } = useContext(BoardContext);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDragEnter(e: React.DragEvent) {
    const target = e.target as HTMLElement;
    if (!isDragging) {
      target.classList.add("task-space-hover");
    }
  }

  function handleDragLeave(e: React.DragEvent) {
    const target = e.target as HTMLElement;
    if (!isDragging) {
      target.classList.remove("task-space-hover");
    }
  }

  function handleDrop(e: React.DragEvent) {
    const target = e.target as HTMLElement;
    target.classList.remove("task-space-hover");

    const title = e.dataTransfer.getData("title");
    const targetTaskData = findTask(activeIndex, title)!;
    const prevColumnName = e.dataTransfer.getData("columnName");
    if (target.classList.contains("task-space")) {
      const newIndex = parseInt(target.getAttribute("data-index") || "0");
      reOrderTask(
        activeIndex,
        { ...targetTaskData, status: columnName },
        prevColumnName,
        columnName,
        newIndex
      );
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`task-space ${fill ? "task-space-fill" : ""}`}
      data-index={index}
    />
  );
};

export default TaskSpace;
