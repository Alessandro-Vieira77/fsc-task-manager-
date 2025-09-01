import { useEffect, useState } from "react";
import { useRef } from "react";
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
  const [errors, setErrors] = useState([]);
  const [select, setSelect] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const titleRef = useRef(null);
  const selectRef = useRef(null);
  const descriptionRef = useRef(null);

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

  const handleUpdateTask = async () => {
    setLoadingUpdate(true);
    let newErros = [];

    if (!titleRef.current.value.trim()) {
      newErros.push({
        inputName: "title",
        description: "O campo name é obrigatório",
      });
    }

    if (selectRef.current.value === "selected") {
      newErros.push({
        inputName: "time",
        description: "O campo hórario é obrigatório",
      });
    }

    if (!descriptionRef.current.value.trim()) {
      newErros.push({
        inputName: "description",
        description: "O campo descrição é obrigatório",
      });
    }

    setErrors(newErros);

    if (newErros.length > 0) {
      return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: titleRef.current?.value,
        time: selectRef.current?.value,
        description: descriptionRef.current?.value,
      }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks(newTask);
      toast.success("Tarefa atualizada com sucesso!");
      setLoadingUpdate(false);
    }

    if (!response.ok) {
      setLoadingUpdate(false);
      toast.error("Erro ao atualizar a tarefa!");
      throw new Error("erro ao atualizar a tarefa ");
    }
  };

  const titleErrors = errors.find((erro) => erro.inputName === "title");
  const timeErrors = errors.find((erro) => erro.inputName === "time");
  const descriptionErrors = errors.find(
    (erro) => erro.inputName === "description",
  );

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

        <div className="w-full space-y-6 rounded-md bg-brand-white p-6">
          <Input
            title="Título"
            defaultValue={tasks?.title}
            ref={titleRef}
            error={titleErrors?.description}
          />
          <div onClick={() => setSelect(true)}>
            {select ? (
              <TimeSelect
                label="Hórario"
                defaultValue={tasks?.time}
                ref={selectRef}
                error={timeErrors?.description}
              />
            ) : (
              <TimeSelect
                label="Hórario"
                value={tasks?.time}
                ref={selectRef}
                error={timeErrors?.description}
              />
            )}
          </div>
          <Input
            title="Descrição"
            defaultValue={tasks?.description}
            ref={descriptionRef}
            error={descriptionErrors?.description}
          />
        </div>
        <div className="flex w-full justify-end gap-2">
          <Button
            onClick={handleUpdateTask}
            color={"primary"}
            size={"large"}
            disabled={loadingUpdate}>
            {loadingUpdate && (
              <IconLoader className="animate-spin text-brand-white" />
            )}
            {loadingUpdate ? "Atualizando..." : "Atualizar Tarefa"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsTasks;
