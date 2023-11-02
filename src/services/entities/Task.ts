import Subtask from "./Subtask";

export default interface Task {
  title: string;
  description: string;
  status: string;
  index: number;
  subtasks: Subtask[];
  recent: boolean;
}
