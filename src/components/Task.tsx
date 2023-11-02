import React, { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import TaskSpace from "./TaskSpace";
import TaskType from "../services/entities/Task";

interface Props {
  taskData: TaskType;
  completedSubtasks: number;
  columnName: string;
  onClcik?: () => void;
}

const Task = ({ taskData, completedSubtasks, columnName, onClcik }: Props) => {
  const { darkMode } = useContext(ThemeContext);
  const [isDragging, setIsDragging] = useState(false);
  const { title, subtasks } = taskData;

  function handleDragStart(e: React.DragEvent) {
    setIsDragging(true);
    const target = e.target as HTMLElement;
    setTimeout(() => {
      target.classList.add("hide-task");
    }, 1);
    e.dataTransfer.setData("title", title);
    e.dataTransfer.setData("columnName", taskData.status);
    e.dataTransfer.setData("index", taskData.index.toString());
  }

  function handleDragEnd(e: React.DragEvent) {
    setIsDragging(false);
    const target = e.target as HTMLElement;
    setTimeout(() => {
      target.classList.remove("hide-task");
    }, 1);
  }

  return (
    <div className="task-container" data-title={taskData?.title}>
      <TaskSpace
        index={taskData.index}
        columnName={columnName}
        isDragging={isDragging}
      />
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={onClcik}
        className={`column-task ${darkMode} ${
          taskData.recent ? "show-task" : ""
        }`}
        data-index={taskData?.index}
      >
        <p className="task-title h-md">{title}</p>
        <p className="subtask-number txt-medium-grey h-sm">
          {completedSubtasks} of {subtasks.length} subtasks
        </p>
      </div>
    </div>
  );
};

export default Task;
