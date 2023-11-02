import { useContext } from "react";
import Button from "../Button";
import { ThemeContext } from "../../providers/ThemeProvider";
import { BoardContext } from "../../providers/BoardProvider";
import removeTask from "../../services/removeTask";
import removeBoard from "../../services/removeBoard";

interface Props {
  taskTitle?: string;
  boardName?: string;
  closeSelf: () => void;
  cancel: () => void;
}

const DeleteForm = ({
  taskTitle,
  boardName,
  closeSelf = () => {},
  cancel = () => {},
}: Props) => {
  if (!taskTitle && !boardName) {
    return;
  }
  const { darkMode } = useContext(ThemeContext);
  const { activeIndex } = useContext(BoardContext);
  const deleteMessage = taskTitle
    ? `Are you sure you want to delete the ‘${taskTitle}’ task and its subtasks? This action cannot be reversed.`
    : `Are you sure you want to delete the ‘${boardName}’ board? This action will remove all columns and tasks and cannot be reversed.`;

  function handleDelete() {
    if (taskTitle) {
      removeTask(activeIndex, taskTitle);
      closeSelf();
    } else {
      removeBoard(activeIndex);
      closeSelf();
    }
  }
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`form ${darkMode} flow`}
      >
        <h2 className="txt-red h-lg">
          Delete this {taskTitle ? "task" : "Board"} ?
        </h2>
        <p className="b-lg txt-medium-grey">{deleteMessage}</p>
        <div className="form-delelte-buttons-container flex">
          <Button onClick={handleDelete} type="destructive" size="sm">
            Delete
          </Button>
          <Button onClick={cancel} type="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default DeleteForm;
