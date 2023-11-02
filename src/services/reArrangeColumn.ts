import ColumnData from "./entities/ColumnData";

const reArrangeColumn = (column: ColumnData): ColumnData => {
  return {
    ...column,
    tasks: column.tasks.map((v, index) => ({ ...v, index })),
  };
};

export default reArrangeColumn;
