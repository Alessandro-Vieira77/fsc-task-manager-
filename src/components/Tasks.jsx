import Button from "./BUtton";
import IconAdd from "../assets/icons/add.svg?react";
import IconTrash from "../assets/icons/trash.svg?react";

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="Ghost">
            Limpar tarefas
            <IconTrash />
          </Button>
          <Button>
            Nova Tarefa
            <IconAdd />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
