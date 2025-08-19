import { IconCheck, IconLoader, IconDetail, IconTrash } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleCheckBox, handleClickDelete }) => {
  function getStatusClasses() {
    if (task.status === "done") {
      return "bg-[#00ADB5] text-[#00ADB5]";
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA04] text-[#FFAA04]";
    }

    if (task.status === "not_starded") {
      return "bg-[#9A9C9F] text-[#9A9C9F] ";
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-md bg-opacity-10 p-3 text-sm font-semibold transition ${getStatusClasses()}`}>
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}>
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            readOnly
            onClick={() => {
              handleCheckBox(task.id);
            }}
          />
          {task.status === "done" && <IconCheck />}
          {task.status === "in_progress" && (
            <IconLoader className="animate-spin text-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-1 text-[#9A9C9F]">
        <Button
          variant="Ghost"
          onClick={() => {
            handleClickDelete(task.id);
          }}>
          <IconTrash />
        </Button>
        <a href="#">
          <IconDetail className="transition hover:opacity-75" />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
