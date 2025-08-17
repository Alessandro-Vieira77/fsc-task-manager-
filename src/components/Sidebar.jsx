import SidebarButton from "./SidebarButton";

import IconHome from "../assets/icons/home.svg?react";
import IconTask from "../assets/icons/tasks.svg?react";

const SideBar = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="space-y-4 px-8 pt-6">
        <h1 className="text-xl font-semibold text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unSelected">
          <IconHome />
          Inicio
        </SidebarButton>
        <SidebarButton variant="selected">
          <IconTask />
          Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default SideBar;
