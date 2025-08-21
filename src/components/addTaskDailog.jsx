import "./addTaskDailog.css";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";
const AddTaskDailog = ({ isOpen, handleClose, handleAddTasks }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("morning");
  const [description, setDescription] = useState("");
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setTime("morning");
      setDescription("");
    }
  }, [isOpen]);

  function handleSaveTasks() {
    if (!title.trim() || !time.trim() || !description.trim()) {
      return alert("Preencha todos os campos dos formulários do input!");
    }

    handleAddTasks({
      id: v4(),
      title: title,
      description: description,
      time: time,
      status: "not_starded",
    });

    handleClose();
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames={"add-task-dialog"}
      nodeRef={nodeRef}
      unmountOnExit>
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
            <div className="flex w-[336px] flex-col items-center space-y-1 rounded-xl bg-white p-5 shadow">
              <h1 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h1>
              <p className="pb-4 text-sm font-light text-[#9A9C9F]">
                Insira as informaçãoes abaixo
              </p>
              <div className="flex w-full flex-col gap-4">
                <Input
                  title={"Título"}
                  type="text"
                  id="title"
                  placeholder="Digite seu nome"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <Input
                  title={"Descrição"}
                  type="text"
                  placeholder="Digite a descrição"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex w-full items-center gap-4 pt-4">
                <Button
                  variant={"secundary"}
                  size="large"
                  className={"w-full"}
                  onClick={() => handleClose()}>
                  Cancelar
                </Button>
                <Button
                  size="large"
                  className={"w-full"}
                  onClick={() => handleSaveTasks()}>
                  Salvar
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDailog;
