import { IconHome, IconTask } from "../assets/icons";
import SidebarButton from "./SidebarButton";

const SideBar = () => {
  return (
    <div className="h-screen w-64 min-w-64 bg-brand-white">
      <div className="space-y-4 px-8 pt-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p className="text-xs">
          Um simples{" "}
          <span className="text-brand-primary">organizador de tarefas</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2 p-2">
        <SidebarButton to={"/"}>
          <IconHome />
          Inicio
        </SidebarButton>
        <SidebarButton to={"/tasks"}>
          <IconTask />
          Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default SideBar;
