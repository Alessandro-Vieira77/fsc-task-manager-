/* eslint-disable react/jsx-no-undef */
import { func } from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { IconArrowLeft, IconChevronRight, IconTrash } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const DetailsTasks = () => {
  const navigate = useNavigate();

  const { taskId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTask() {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });

      const data = await response.json();
      setTasks(data);
    }

    getTask();
  }, [taskId]);

  if (!tasks) {
    return <div>Carregando...</div>;
  }

  const handleDeleteTask = async () => {
    const respoonse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!respoonse.ok) {
      toast.error("Erro ao deletar a tarefa!");
      throw new Error("erro ao deltar a tarefa ");
    } else {
      navigate("/");
      toast.success("Tarefa deletada com sucesso!");
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
            <span
              onClick={() => navigate(-1)}
              className="flex cursor-pointer items-center gap-2">
              Minhas tarefas <IconChevronRight />{" "}
            </span>
            <p className="font-semibold text-brand-primary">{tasks?.title}</p>
          </div>

          <div className="flex w-full items-center justify-between">
            <h1 className="text-xl font-bold text-brand-dark-blue">
              {tasks?.title}
            </h1>
            <Button onClick={handleDeleteTask} color="danger">
              <IconTrash /> Deletar Tarefa
            </Button>
          </div>
        </div>

        <div className="w-full space-y-6 rounded-md bg-brand-white p-6">
          <Input title="Título" defaultValue={tasks?.title} />
          <div>
            <TimeSelect label="Hórario" value={tasks?.time} />
          </div>
          <Input title="Descrição" defaultValue={tasks?.description} />
        </div>
        <div className="flex w-full justify-end gap-2">
          <Button color="secundary" size={"large"}>
            Cancelar
          </Button>
          <Button color={"primary"} size={"large"}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsTasks;
