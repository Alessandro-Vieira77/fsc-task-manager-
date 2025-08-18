import Button from "./BUtton";
import IconAdd from "../assets/icons/add.svg?react";
import IconTrash from "../assets/icons/trash.svg?react";
import IconSun from "../assets/icons/sun.svg?react";
import IconClodSun from "../assets/icons/cloud-sun.svg?react";
import IconMoon from "../assets/icons/moon.svg?react";
import TaskDay from "../components/TaskDay";

const Tasks = () => {
  return (
    <div className="mx-8 w-full space-y-6 py-16">
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
      <div className="w-full space-y-6 rounded-md bg-white p-6">
        {/* Tasks */}
        {/* Manhã */}
        <div className="w-full">
          <TaskDay>
            <IconSun />
            <h3>Manhã</h3>
          </TaskDay>
        </div>
        {/* Tarde */}
        <div className="w-full">
          <TaskDay>
            <IconClodSun />
            <h3>Tarde</h3>
          </TaskDay>
        </div>
        {/* Noite */}
        <div className="w-full">
          <TaskDay>
            <IconMoon />
            <h3>Tarde</h3>
          </TaskDay>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
