import "./addTaskDailog.css";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";
const AddTaskDailog = ({ isOpen, handleClose, handleAddTasks }) => {
  const [errors, setErrors] = useState([]);
  const nodeRef = useRef(null);
  const titleRef = useRef(null);
  const selectRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleSaveTasks() {
    let newErros = [];

    if (!titleRef.current.value.trim()) {
      newErros.push({
        inputName: "title",
        description: "O campo name é obrigatório",
      });
    }

    if (selectRef.current.value === "Selecione") {
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

    handleAddTasks({
      id: v4(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      time: selectRef.current.value,
      status: "not_starded",
    });

    handleClose();
  }

  const titleErrors = errors.find((erro) => erro.inputName === "title");
  const timeErrors = errors.find((erro) => erro.inputName === "time");
  const descriptionErrors = errors.find(
    (erro) => erro.inputName === "description",
  );
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
            <div className="flex w-[336px] flex-col items-center space-y-1 rounded-xl bg-brand-white p-5 shadow">
              <h1 className="text-brand-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h1>
              <p className="pb-4 text-sm font-light text-brand-text-gray">
                Insira as informaçãoes abaixo
              </p>
              <div className="flex w-full flex-col gap-4">
                <Input
                  title={"Título"}
                  type="text"
                  id="title"
                  placeholder="Digite seu nome"
                  error={titleErrors?.description}
                  ref={titleRef}
                />

                <TimeSelect error={timeErrors?.description} ref={selectRef} />

                <Input
                  title={"Descrição"}
                  type="text"
                  placeholder="Digite a descrição"
                  id="description"
                  error={descriptionErrors?.description}
                  ref={descriptionRef}
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
