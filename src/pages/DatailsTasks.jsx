import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { IconArrowLeft, IconChevronRight, IconTrash } from "../assets/icons";
import { IconLoader } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const DetailsTasks = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [select, setSelect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  // get
  const queryClient = useQueryClient();
  const { data: tasksDatail } = useQuery({
    queryKey: ["tasksId", taskId],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks");

      return await response.json();
    },
  });

  const tasks = tasksDatail?.find((task) => {
    return task.id === taskId;
  });

  // update
  const updateTask = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data?.title.trim(),
          description: data?.description.trim(),
          time: data?.time?.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    },
  });
  // delete
  const deleteTask = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      return response;
    },
  });

  const handleDeleteTask = async () => {
    deleteTask.mutate(undefined, {
      onSuccess: () => {
        navigate("/");
        toast.success("Tarefa deletada com sucesso!");
        // queryClient.invalidateQueries({ queryKey: ["tasksId", taskId] });
        queryClient.setQueryData(["tasks"], (oldValue) => {
          return oldValue.filter((task) => task.id !== taskId);
        });
      },
      onError: (err) => {
        toast.error("Erro ao deletar a tarefa!");
        throw new Error("Erro ao deletar a tarefa!", err);
      },
    });
  };

  const handleUpdateTask = async (data) => {
    updateTask.mutate(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["tasksId", taskId] });
        queryClient.setQueryData(["tasks"], (oldValue) => {
          return oldValue.map((task) => {
            if (task.id !== taskId) {
              return task;
            }
            return { ...task, ...data };
          });
        });
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa!");
        throw new Error("Erro ao atualizar a tarefa!");
      },
    });
  };

  return (
    <div className="flex w-full">
      <Sidebar />
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

          <div className="flex w-full items-center justify-between">
            <h1 className="text-xl font-bold text-brand-dark-blue">
              {tasks?.title}
            </h1>
            <Button onClick={handleDeleteTask} color="danger">
              {deleteTask.isPending ? (
                <IconLoader className="animate-spin text-brand-white" />
              ) : (
                <IconTrash />
              )}
              {deleteTask.isPending ? "Deletando..." : "Deletar Tarefa"}
            </Button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateTask)}
          className="w-full space-y-6 rounded-md bg-brand-white p-6">
          <Input
            title="Título"
            defaultValue={tasks?.title}
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
                defaultValue={tasks?.time}
                label="Hórario"
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
                value={tasks?.time}
                label="Hórario"
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
            defaultValue={tasks?.description}
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
                validate: (value) => {
                  if (!value.trim()) {
                    return "Campo não pode está vazio";
                  }

                  return true;
                },
              },
            })}
            error={formErrors?.description?.message}
          />
          <div className="flex w-full justify-end gap-2">
            <Button
              color={"primary"}
              size={"large"}
              type="submit"
              disabled={updateTask.isPending}>
              {updateTask.isPending && (
                <IconLoader className="animate-spin text-brand-white" />
              )}
              {updateTask.isPending ? "Atualizando..." : "Atualizar Tarefa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsTasks;
