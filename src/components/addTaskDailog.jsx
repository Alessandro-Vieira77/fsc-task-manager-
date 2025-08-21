import "./addTaskDailog.css";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Button from "./Button";
import Input from "./Input";
import LabelInput from "./LabelInput";
const AddTaskDailog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef(null);

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
                />
                <div className="flex w-full flex-col">
                  <LabelInput htmlFor="time">Hórario</LabelInput>

                  <select
                    className="rounded-lg border-2 border-[#ECECEC] py-3 pl-6 outline-[#00ADB5]"
                    name="time"
                    id="time">
                    <option defaultValue={"selected"}>Selecione</option>
                    <option value="morning">Manhã</option>
                    <option value="affetermoon">Tarde</option>
                    <option value="night">Noite</option>
                  </select>
                </div>

                <Input
                  title={"Descrição"}
                  type="text"
                  placeholder="Digite a descrição"
                  id="description"
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
                <Button size="large" className={"w-full"}>
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
