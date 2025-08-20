import { createPortal } from "react-dom";

import Button from "./Button";
import Input from "./Input";
const AddTaskDailog = ({ isOpen, handleClose }) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="flex w-[336px] flex-col items-center space-y-1 rounded-xl bg-white p-5 shadow">
        <h1 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h1>
        <p className="pb-4 text-sm font-light text-[#9A9C9F]">
          Insira as informaçãoes abaixo
        </p>
        <div className="flex w-full flex-col gap-4">
          <Input
            title={"Título"}
            type="text"
            id="titulo"
            placeholder="Digite seu nome"
          />
          <Input title={"Hórario"} type="text" placeholder="Horario" />
          <Input
            title={"Descrição"}
            type="text"
            placeholder="Digite a descrição"
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
  );
};

export default AddTaskDailog;
