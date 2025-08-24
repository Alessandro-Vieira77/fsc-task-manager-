import PropTypes from "prop-types";

import { IconCheck, IconDetail, IconLoader, IconTrash } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleCheckBox, handleClickDelete }) => {
  function getStatusClasses() {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary";
    }

    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process";
    }

    if (task.status === "not_starded") {
      return "bg-brand-text-gray text-brand-text-gray ";
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
            <IconLoader className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-1 text-brand-text-gray">
        <Button
          color="ghost"
          width={""}
          size={""}
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

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  handleCheckBox: PropTypes.func.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
};

export default TaskItem;
