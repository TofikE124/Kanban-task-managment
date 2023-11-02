import { useContext, useState } from "react";
import CheckBox from "../CheckBox";
import Dropdown from "../Dropdown/Dropdown";
import DropdownContainer from "../Dropdown/DropdownContainer";
import DropdownOption from "../Dropdown/DropdownOption";
import DropdownTitle from "../Dropdown/DropdownTitle";
import { BoardContext } from "../../providers/BoardProvider";
import Blackoverlay from "../Blackoverlay";
import React from "react";
import setTaskStatus from "../../services/setTaskStatus";
import findTask from "../../services/findTask";
import getColumnName from "../../services/getColumnName";
import getBoards from "../../services/getBoards";
import settings from "../../../public/icon-vertical-ellipsis.svg";
import { ThemeContext } from "../../providers/ThemeProvider";
import toggleSubtask from "../../services/toggleSubtask";
import DeleteForm from "./DeleteForm";

interface Props {
  TaskTitle: string;
  ColumnName: string;
  closeSelf: () => void;
  showEditForm: () => void;
}

const ViewTaskForm = ({ TaskTitle, closeSelf, showEditForm }: Props) => {
  const { activeIndex } = useContext(BoardContext);
  const { darkMode } = useContext(ThemeContext);
  const [showSelf, setShowSelf] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const ColumnName = getColumnName(TaskTitle);
  const TaskData = findTask(activeIndex, TaskTitle);
  const columns = getBoards()[activeIndex].columns;
  const completedTasks = TaskData?.subtasks.reduce(
    (total, current) => total + (current.isCompleted ? 1 : 0),
    0
  );
  function handleFormClick(e: React.MouseEvent) {
    const target = e.target as Element;
    if (
      target.classList.contains("extra-options-container") ||
      target.parentElement?.classList.contains("extra-options")
    ) {
      return;
    }
    setShowExtra(false);
  }

  return (
    <React.Fragment>
      <Blackoverlay onClick={closeSelf} />
      {showDelete ? (
        <DeleteForm
          taskTitle={TaskTitle}
          closeSelf={closeSelf}
          cancel={() => {
            setShowSelf(true);
            setShowDelete(false);
          }}
        />
      ) : null}
      {showSelf ? (
        <>
          <form
            onClick={(e) => handleFormClick(e)}
            className={`form flow ${darkMode}`}
          >
            <div className="view-task-top flex">
              <h2 className="form-title h-lg">{TaskData!.title}</h2>
              <div
                onClick={() => setShowExtra(!showExtra)}
                className="extra-options-container"
              >
                <img src={settings} />
                {showExtra ? (
                  <div className="extra-options flow">
                    <button
                      onClick={() => {
                        showEditForm();
                        closeSelf();
                      }}
                      type="button"
                      className="txt-medium-grey"
                    >
                      Edit Task
                    </button>
                    <button
                      onClick={() => {
                        setShowDelete(true);
                        setShowSelf(false);
                      }}
                      type="button"
                      className="txt-red"
                    >
                      Delete Task
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <p className="txt-medium-grey b-lg">{TaskData!.description}</p>
            <h3 className="h-sm txt-medium-grey">
              Subtask ({completedTasks} of {TaskData!.subtasks.length})
            </h3>
            <div className="flow view-task-subtasks">
              {TaskData!.subtasks.map((s, index) => (
                <CheckBox
                  onChange={() =>
                    toggleSubtask(activeIndex, TaskTitle, s.title)
                  }
                  checked={s.isCompleted}
                  name={index.toString()}
                  key={index}
                >
                  {s.title}
                </CheckBox>
              ))}
            </div>
            <DropdownContainer
              onChange={(value) =>
                setTaskStatus(activeIndex, ColumnName, TaskTitle, value)
              }
            >
              <DropdownTitle>Current Status</DropdownTitle>
              <Dropdown>
                {columns.map((c, index) => (
                  <DropdownOption
                    key={index}
                    defaultOption={c.name === TaskData!.status}
                  >
                    {c.name}
                  </DropdownOption>
                ))}
              </Dropdown>
            </DropdownContainer>
          </form>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ViewTaskForm;
