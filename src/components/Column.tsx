import { useState } from "react";
import ColumnData from "../services/entities/ColumnData";
import Subtask from "../services/entities/Subtask";
import ViewTaskForm from "./forms/ViewTaskForm";
import TaskForm from "./forms/TaskForm";
import Button from "./Button";

import Task from "./Task";
import TaskSpace from "./TaskSpace";

interface Props {
  columnData: ColumnData;
}
const Column = ({ columnData }: Props) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState("");
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  function getColpleted(subtasks: Subtask[]) {
    return subtasks.reduce(
      (total, current) => total + (current.isCompleted ? 1 : 0),
      0
    );
  }

  return (
    <>
      <div className="column-single">
        <div className="column-title-container flex">
          <span
            className="column-color"
            style={{ background: columnData.color }}
          ></span>
          <p className="column-title txt-medium-grey h-sm uppercase letter-spacing-2">
            {`${columnData.name} (${columnData.tasks.length})`}
          </p>
        </div>

        <div className="column-tasks-container flex">
          {columnData.tasks.length ? null : (
            <>
              <TaskSpace
                index={0}
                columnName={columnData.name}
                isDragging={false}
              />
              <Button
                onClick={() => setShowAddTask(true)}
                className="new-task-btn h-md"
                size={"lg"}
                type={"primary"}
              >
                + <span>Add New Task</span>
              </Button>
            </>
          )}
          {columnData.tasks.map((taskData, index) => (
            <Task
              key={index}
              taskData={taskData}
              completedSubtasks={getColpleted(taskData.subtasks)}
              columnName={columnData.name}
              onClcik={() => setSelectedTaskTitle(taskData.title)}
            />
          ))}
          <TaskSpace
            index={columnData.tasks.length}
            columnName={columnData.name}
            isDragging={false}
            fill
          />
        </div>
      </div>

      {selectedTaskTitle ? (
        <ViewTaskForm
          closeSelf={() => setSelectedTaskTitle("")}
          showEditForm={() => setEditedTaskTitle(selectedTaskTitle)}
          TaskTitle={selectedTaskTitle}
          ColumnName={columnData.name}
        />
      ) : editedTaskTitle ? (
        <TaskForm
          taskTitle={editedTaskTitle}
          closeSelf={() => setEditedTaskTitle("")}
        />
      ) : showAddTask ? (
        <TaskForm
          closeSelf={() => setShowAddTask(false)}
          defaultStatus={columnData.name}
        />
      ) : null}
    </>
  );
};

export default Column;
