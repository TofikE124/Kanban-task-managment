import { FieldValues, useForm } from "react-hook-form";
import addNewTask from "../../services/addNewTask";
import { useContext, useState } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import { BoardContext } from "../../providers/BoardProvider";
import Blackoverlay from "../Blackoverlay";
import Button from "../Button";
import TextField from "../TextField";
import DropdownContainer from "../Dropdown/DropdownContainer";
import DropdownTitle from "../Dropdown/DropdownTitle";
import Dropdown from "../Dropdown/Dropdown";
import DropdownOption from "../Dropdown/DropdownOption";
import getBoards from "../../services/getBoards";
import checkTaskName from "../../services/checkTaskName";
import findTask from "../../services/findTask";
import removeTask from "../../services/removeTask";
import Subtask from "../RemovableField";
import RemovableField from "../RemovableField";

interface Props {
  taskTitle?: string;
  closeSelf?: () => void;
  defaultStatus?: string;
}
interface Subtask {
  index: number;
  value: string;
  deleteSelf?: (index: number) => void;
  onChange?: (value: string) => void;
  error?: string;
}

type FormData = {
  title: string;
  description: string;
};

const TaskForm = ({
  taskTitle = "",
  defaultStatus,
  closeSelf = () => {},
}: Props) => {
  const { activeIndex } = useContext(BoardContext);
  const { darkMode } = useContext(ThemeContext);
  const columns = getBoards()[activeIndex].columns;

  const defaultTaskData = findTask(activeIndex, taskTitle);

  const [titleError, setTitleError] = useState("");
  const [status, setStatus] = useState("");
  const defaultSubtasks: Subtask[] =
    defaultTaskData?.subtasks.map((s, index) => ({
      index,
      value: s.title,
      deleteSelf: () => {
        deleteSubtask(index);
      },
      error: "",
      onChange: (value: string) => onSubtaskChange(value, z),
    })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FieldValues) {
    if (!subtasks.every((s) => s.value)) {
      setSubtasks((prevSubtasks) => [
        ...prevSubtasks.map((s) =>
          s.value ? s : { ...s, error: "Can't be empty" }
        ),
      ]);
    } else if (
      taskTitle.toLowerCase() !== data.title.toLowerCase() &&
      !checkTaskName(activeIndex, data.title)
    ) {
      setTitleError(
        `A task with the name "${data.title}" exists in this board`
      );
    } else {
      setTitleError("");
      if (defaultTaskData) {
        removeTask(activeIndex, defaultTaskData.title);
      }
      if (subtasks.every((s) => !s.error)) {
        const index =
          getBoards()[activeIndex].columns.find((c) => c.name === status)?.tasks
            .length || 0;
        addNewTask(activeIndex, {
          title: data.title,
          description: data.description,
          status,
          index,
          recent: true,
          subtasks: subtasks.map((s) => ({
            title: s.value,
            isCompleted: false,
          })),
        });
        closeSelf();
      }
    }
  }

  // Subtasks
  const [subtasks, setSubtasks] = useState<Subtask[]>(defaultSubtasks);
  const [z, setZ] = useState(subtasks.length);
  function addNewSubtask() {
    setSubtasks((prevSubtasks) => [
      {
        index: z,
        value: "",
        deleteSelf: (index: number) => {
          deleteSubtask(index);
        },
        error: "",
        onChange: (value: string) => onSubtaskChange(value, z),
      },
      ...prevSubtasks,
    ]);
    setZ(z + 1);
  }
  function deleteSubtask(index: number) {
    setSubtasks((prevSubtasks) => {
      const filteredArray = [
        ...prevSubtasks.filter((s) => {
          return s.index !== index;
        }),
      ];
      return filteredArray.map((s) => ({
        ...s,
        error: filteredArray.find(
          (t) => t.index != s.index && t.index != index && t.value === s.value
        )
          ? "Duplicate subtask names"
          : "",
      }));
    });
  }

  function onSubtaskChange(value: string, index: number) {
    setSubtasks((prevSubtasks) => {
      const modifiedSubtasks = [
        ...prevSubtasks.map((s) => {
          return s.index === index
            ? {
                ...s,
                value,
                error: value
                  ? prevSubtasks.find((s) => s.value === value)
                    ? "Duplicate subtask names"
                    : ""
                  : "Can't be empty",
              }
            : s;
        }),
      ];
      return modifiedSubtasks.map((s) => ({
        ...s,
        error: s.value
          ? modifiedSubtasks.find(
              (t) => t.index !== s.index && t.value === s.value
            )
            ? "Duplicate subtask names"
            : ""
          : s.error,
      }));
    });
  }

  return (
    <>
      <Blackoverlay onClick={closeSelf} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form form-task ${darkMode} flow`}
      >
        <h2 className="h-lg form-title">
          {taskTitle ? "Edit Task" : "Add New Task"}
        </h2>
        <TextField
          placeholder="e.g Take coffe break"
          defaultValue={taskTitle}
          {...register("title", { required: true })}
          error={errors.title ? "Can't be empty" : titleError}
        >
          Title
        </TextField>
        <TextField
          multiLine
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          {...register("description")}
          defaultValue={defaultTaskData?.description || ""}
        >
          Description
        </TextField>
        <div className="add-subtasks-container flow">
          <p className="add-subtasks-title b-md txt-medium-grey">Subtaks</p>
          {subtasks.map((s) => (
            <RemovableField
              key={s.index}
              index={s.index}
              error={s.error || ""}
              deleteSelf={s.deleteSelf}
              onChange={s.onChange}
              value={s.value}
              placeholder="e.g. Make coffee"
            />
          ))}
          <Button
            onClick={() => addNewSubtask()}
            className="b-lg"
            size="sm"
            type="secondary"
            submit={false}
          >
            + Add new Subtask
          </Button>
        </div>
        <DropdownContainer onChange={(value) => setStatus(value)}>
          <DropdownTitle>Current Status</DropdownTitle>
          <Dropdown>
            {columns.map((c, index) => (
              <DropdownOption
                key={index}
                defaultOption={
                  defaultStatus ? c.name === defaultStatus : !index
                }
              >
                {c.name}
              </DropdownOption>
            ))}
          </Dropdown>
        </DropdownContainer>

        <Button type="primary" size="sm" submit>
          {taskTitle ? "Save Changes" : "Create Task"}
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
