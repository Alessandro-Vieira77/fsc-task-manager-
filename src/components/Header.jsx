import { toast } from "react-hot-toast";

import { IconAdd, IconTrash } from "../assets/icons";
import useDeleteTask from "../hooks/data/use-delete-task";
import useGetTasks from "../hooks/data/use-get-tasks";
import Button from "./Button";

function Header({ title, subTitle, addDailog }) {
  const { data: tasks } = useGetTasks();
  const { mutate: deleteTask } = useDeleteTask();

  const handleDeleteTask = async () => {
    tasks?.map(async (task) => {
      deleteTask(task.id, {});
    });

    toast.success("Tarefas deletadas com sucesso");
  };

  return (
    <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-brand-primary">
          {title}
        </span>
        <h2 className="text-xl font-semibold text-brand-dark-blue">
          {subTitle}
        </h2>
      </div>
      <div className="flex sm:hidden"></div>
      <div className="flex items-end gap-2">
        <Button onClick={() => handleDeleteTask()} color="ghost">
          Limpar tarefas
          <IconTrash />
        </Button>
        <Button
          color={"primary"}
          onClick={() => {
            addDailog(true);
          }}>
          Nova Tarefa
          <IconAdd />
        </Button>
      </div>
    </div>
  );
}
export default Header;
