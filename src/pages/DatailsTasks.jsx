import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

import { IconArrowLeft, IconChevronRight, IconTrash } from "../assets/icons";
import { IconLoader } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import useDeleteTask from "../hooks/data/use-delete-task";
import useGetTaskId from "../hooks/data/use-get-taskId";
import useUpdateTask from "../hooks/data/use-update-task";

const DetailsTasks = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [select, setSelect] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  // get
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTaskId(taskId);

  useEffect(() => {
    reset(tasks);
  }, [tasks, reset]);

  // delete
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(
    tasks?.id,
  );

  // update
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(taskId);

  const handleDeleteTask = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        navigate("/tasks");
        toast.success("Tarefa deletada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao deletar a tarefa!");
      },
    });
  };

  const handleUpdateTask = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!");
        queryClient.refetchQueries({ queryKey: ["tasks", taskId] });
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa!");
      },
    });
  };

  return (
    <div className="flex w-full">
      <div className="hidden lg:flex"></div>
      <div className="mx-8 my-8 flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-3">
          <div
            onClick={() => navigate(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary">
            <IconArrowLeft />
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-text-gray">
            <Link to={"/"} className="flex cursor-pointer items-center gap-2">
              Minhas tarefas <IconChevronRight />{" "}
            </Link>
            <p className="font-semibold text-brand-primary">{tasks?.title}</p>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
            <h1 className="text-xl font-bold text-brand-dark-blue">
              {tasks?.title}
            </h1>
            <Button onClick={handleDeleteTask} color="danger">
              {isDeleting ? (
                <IconLoader className="animate-spin text-brand-white" />
              ) : (
                <IconTrash />
              )}
              {isDeleting ? "Deletando..." : "Deletar Tarefa"}
            </Button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateTask)}
          className="w-full space-y-6 rounded-md bg-brand-white p-6">
          <Input
            title="Título"
            {...register("title", {
              validate: (value) => {
                if (!value.trim()) {
                  return "Campo não pode está vazio";
                }
                return true;
              },
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
              required: {
                value: true,
                message: "Campo obrigatório",
              },
            })}
            error={formErrors?.title?.message}
          />

          <div onClick={() => setSelect(true)}>
            {select ? (
              <TimeSelect
                label="Horário"
                {...register("time", {
                  validate: (value) => {
                    if (value === "selected") {
                      return "Campo obrigatório";
                    }
                  },
                })}
                error={formErrors?.time?.message}
              />
            ) : (
              <TimeSelect
                label="Horário"
                {...register("time", {
                  validate: (value) => {
                    if (value === "selected") {
                      return "Campo obrigatório";
                    }
                    if (!value.trim()) {
                      return "Campo não pode está vazio";
                    }
                    return true;
                  },
                })}
                error={formErrors?.time?.message}
              />
            )}
          </div>

          <Input
            title="Descrição"
            {...register("description", {
              validate: (value) => {
                if (!value.trim()) {
                  return "Campo não pode está vazio";
                }
                return true;
              },
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
              required: {
                value: true,
                message: "Campo obrigatório",
              },
            })}
            error={formErrors?.description?.message}
          />

          <div className="flex w-full justify-end gap-2">
            <Button
              color="primary"
              size="large"
              type="submit"
              disabled={isUpdating}>
              {isUpdating && (
                <IconLoader className="animate-spin text-brand-white" />
              )}
              {isUpdating ? "Atualizando..." : "Atualizar Tarefa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsTasks;
