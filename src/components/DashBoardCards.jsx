import {
  IconGlassWater,
  IconLoader,
  IconTask,
  IconTasks2,
} from "../assets/icons/index";
import useGetTasks from "../hooks/data/use-get-tasks";
import DashBoardCard from "./DashboardCard";

function DashBoardCards() {
  const { data: tasks } = useGetTasks();

  const allTasks = tasks?.length;
  const completedTasks = tasks?.filter((task) => task.status === "done").length;
  const pendingTasks = tasks?.filter(
    (task) => task.status === "in_progress",
  ).length;
  return (
    <div className="grid w-full grid-cols-4 gap-6">
      <DashBoardCard
        icon={<IconTasks2 />}
        title={allTasks}
        subTitle="Tarefas disponivéis"
      />
      <DashBoardCard
        icon={<IconTask />}
        title={completedTasks}
        subTitle="Tarefas concluídas"
      />
      <DashBoardCard
        icon={<IconLoader />}
        title={pendingTasks}
        subTitle="Tarefas em andamento"
      />
      <DashBoardCard icon={<IconGlassWater />} title={0} subTitle="Água" />
    </div>
  );
}

export default DashBoardCards;
