import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { IconCheck, IconDetail, IconLoader, IconTrash } from "../assets/icons";
import useDeleteTask from "../hooks/data/use-delete-task";
import useUpdateTask from "../hooks/data/use-update-task";
import querykeys from "../keys/querys";
import Button from "./Button";
const TaskItem = ({ task }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);
  const { mutate: updatedTask } = useUpdateTask(task.id);

  const onDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(querykeys.getTasks(), (currentValues) => {
          return currentValues.filter((taskValue) => taskValue.id !== task.id);
        });
        toast.success("Tarefa deletada com sucesso");
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa");
      },
    });
  };

  function getStatus() {
    let status;
    if (task.status === "not_started") {
      status = "in_progress";
    }
    if (task.status === "in_progress") {
      status = "done";
    }
    if (task.status === "done") {
      status = "not_started";
    }

    updatedTask(
      {
        status: status,
      },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso");
        },
        onError: () => {
          toast.error("Erro ao atualizar tarefa");
        },
      },
    );
  }

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
      <div className="flex items-center gap-2 truncate text-xs sm:text-base">
        <label
          className={`relative flex min-h-7 min-w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}>
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            readOnly
            onClick={() => {
              getStatus();
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
          disabled={isPending}
          onClick={() => {
            onDeleteClick(task.id);
          }}>
          {isPending ? (
            <IconLoader className="animate-spin text-brand-process" />
          ) : (
            <IconTrash />
          )}
        </Button>
        <Link to={`/details/${task.id}`}>
          <IconDetail className="transition hover:opacity-75" />
        </Link>
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
  handleOnDeleteSucess: PropTypes.func,
};

export default TaskItem;
