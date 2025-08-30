import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { IconCheck, IconDetail, IconLoader, IconTrash } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleCheckBox, handleOnDeleteSucess }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const onDeleteClick = async () => {
    setLoadingDelete(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setLoadingDelete(false);
      return toast.error("Erro ao deletar a tarefa");
    }
    handleOnDeleteSucess(task.id);
    setLoadingDelete(false);
  };

  function getStatusClasses() {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary";
    }

    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process";
    }

    if (task.status === "not_started") {
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
          disabled={loadingDelete}
          onClick={() => {
            onDeleteClick(task.id);
          }}>
          {loadingDelete ? (
            <IconLoader className="animate-spin text-brand-process" />
          ) : (
            <IconTrash />
          )}
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  handleCheckBox: PropTypes.func.isRequired,
  handleOnDeleteSucess: PropTypes.func,
};

export default TaskItem;
