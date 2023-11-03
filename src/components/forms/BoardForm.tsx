import { FieldValues, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import Blackoverlay from "../Blackoverlay";
import Button from "../Button";
import TextField from "../TextField";
import getBoards from "../../services/getBoards";
import RemovableField from "../RemovableField";
import addNewBoard, { Column } from "../../services/addNewBoard";
import removeBoard from "../../services/removeBoard";
import { BoardContext } from "../../providers/BoardProvider";

interface Props {
  boardName?: string;
  closeSelf?: () => void;
}

type FormData = {
  title: string;
};

const BoardForm = ({ boardName = "", closeSelf = () => {} }: Props) => {
  const { activeIndex } = useContext(BoardContext);
  const { darkMode } = useContext(ThemeContext);

  const defaultBoardData = getBoards().find((b) => b.name === boardName);
  const [nameError, setNameError] = useState("");

  const defaultColumns: Column[] =
    defaultBoardData?.columns.map((c, x) => {
      return {
        index: x,
        value: c,
        deleteSelf: () => {
          deleteColumn(x);
        },
        onChange: (name: string) => {
          onColumnChange(name, x);
        },
        error: "",
      };
    }) || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FieldValues) {
    const boards = getBoards();

    if (
      boards.find(
        (b) =>
          b.name.toLowerCase() === data.title.toLowerCase() &&
          data.title.toLowerCase() !== boardName.toLowerCase()
      )
    ) {
      setNameError(`A board wit the name "${data.title}" already exists`);
    } else if (columns.find((c) => c.value.name === "")) {
      setColumns((prevColumns) => [
        ...prevColumns.map((c) =>
          c.value.name ? c : { ...c, error: "Can't be empty" }
        ),
      ]);
    } else if (columns.every((c) => c.error === "")) {
      if (boardName) {
        removeBoard(activeIndex);
      }
      addNewBoard({ boardName: data.title, columns });
      closeSelf();
    }
  }

  // Columns
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [z, setZ] = useState(columns.length + 1);
  function addNewColumn() {
    setColumns((prevColumns) => [
      {
        index: z,
        value: { name: "", tasks: [], color: "" },
        deleteSelf: () => {
          deleteColumn(z);
        },
        onChange: (name: string) => {
          onColumnChange(name, z);
        },
      },
      ...prevColumns,
    ]);
    setZ(z + 1);
  }
  function deleteColumn(index: number) {
    setColumns((prevColumns) => {
      const filteredColumns = [...prevColumns.filter((c) => c.index !== index)];
      return filteredColumns.map((c) => ({
        ...c,
        error: c.value
          ? filteredColumns.find(
              (column) => column !== c && column.value === c.value
            )
            ? "Duplicate column names"
            : ""
          : c.error,
      }));
    });
  }

  function onColumnChange(name: string, index: number) {
    setColumns((prevColumns) => {
      const modifiedColumns = [...prevColumns].map((c) =>
        c.index === index ? { ...c, value: { ...c.value, name } } : c
      );

      return [...modifiedColumns].map((c) => ({
        ...c,
        error: c.value.name
          ? modifiedColumns.find(
              (column) =>
                column.index !== c.index && column.value.name === c.value.name
            )
            ? "Duplicate column names"
            : ""
          : "",
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
          {boardName ? "Edit Board" : "Add New Board"}
        </h2>
        <TextField
          placeholder="e.g Web Design"
          defaultValue={boardName}
          {...register("title", { required: true })}
          error={errors.title ? "Can't be empty" : nameError}
        >
          Title
        </TextField>
        <div className="add-subtasks-container flow">
          <p className="add-subtasks-title b-md txt-medium-grey">Columns</p>
          {columns.map((s) => (
            <RemovableField
              key={s.index}
              index={s.index}
              error={s.error || ""}
              deleteSelf={s.deleteSelf}
              onChange={s.onChange}
              value={s.value.name}
              placeholder="e.g. Todo"
            />
          ))}
          <Button
            onClick={() => addNewColumn()}
            className="b-lg"
            size="sm"
            type="secondary"
            submit={false}
          >
            + Add new Column
          </Button>
        </div>

        <Button type="primary" size="sm" submit>
          {boardName ? "Save Changes" : "Create New Board"}
        </Button>
      </form>
    </>
  );
};

export default BoardForm;
