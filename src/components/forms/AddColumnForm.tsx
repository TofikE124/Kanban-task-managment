import { FieldValues, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import Blackoverlay from "../Blackoverlay";
import Button from "../Button";
import TextField from "../TextField";
import getBoards from "../../services/getBoards";
import { BoardContext } from "../../providers/BoardProvider";
import addNewColumn from "../../services/addNewColumn";

interface Props {
  closeSelf?: () => void;
}

type FormData = {
  name: string;
};

const TaskForm = ({ closeSelf = () => {} }: Props) => {
  const { darkMode } = useContext(ThemeContext);
  const { activeIndex } = useContext(BoardContext);

  const [nameError, setNameError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FieldValues) {
    const columns = getBoards()[activeIndex].columns;
    if (columns.find((c) => c.name.toLowerCase() === data.name.toLowerCase())) {
      setNameError(
        `A column with the name "${data.name} already exists in this board`
      );
    } else {
      addNewColumn(activeIndex, data.name);
      closeSelf();
    }
  }

  return (
    <>
      <Blackoverlay onClick={closeSelf} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form form-task ${darkMode} flow`}
      >
        <h2 className="h-lg form-title">Add New Column</h2>
        <TextField
          placeholder="e.g Web Design"
          {...register("name", { required: true })}
          error={errors.name ? "Can't be empty" : nameError}
        >
          Name
        </TextField>

        <Button type="primary" size="sm" submit>
          Create New Column
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
