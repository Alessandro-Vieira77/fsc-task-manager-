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
  const [tasks, setTasks] = useState([]);
  const [select, setSelect] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm();

  useEffect(() => {
    async function getTask() {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });

      const data = await response.json();
      setTasks(data);
      reset(data);
    }

    getTask();
  }, [taskId, reset]);

  if (!tasks) {
    return <div>Carregando...</div>;
  }

  const handleDeleteTask = async () => {
    setLoadingDelete(true);
    const respoonse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (respoonse.ok) {
      setLoadingDelete(false);
      navigate("/");
      toast.success("Tarefa deletada com sucesso!");
    }
    if (!respoonse.ok) {
      setLoadingDelete(false);
      toast.error("Erro ao deletar a tarefa!");
      throw new Error("erro ao deltar a tarefa ");
    }
  };

  const handleUpdateTask = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data?.title.trim(),
        description: data?.description.trim(),
        time: data?.time?.trim(),
      }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks(newTask);
      toast.success("Tarefa atualizada com sucesso!");
    }

    if (!response.ok) {
      toast.error("Erro ao atualizar a tarefa!");
      throw new Error("erro ao atualizar a tarefa ");
    }
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
              {loadingDelete ? (
                <IconLoader className="animate-spin text-brand-white" />
              ) : (
                <IconTrash />
              )}
              {loadingDelete ? "Deletando..." : "Deletar Tarefa"}
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
              disabled={loadingUpdate}>
              {isSubmitting && (
                <IconLoader className="animate-spin text-brand-white" />
              )}
              {isSubmitting ? "Atualizando..." : "Atualizar Tarefa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsTasks;
