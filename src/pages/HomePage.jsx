import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  IconGlassWater,
  IconLoader,
  IconTask,
  IconTasks2,
} from "../assets/icons/index";
import AddTaskDailog from "../components/addTaskDailog";
import DashBoardCard from "../components/DashboardCard";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import useGetTasks from "../hooks/data/use-get-tasks";
function HomePage() {
  const { data: tasks } = useGetTasks();

  const allTasks = tasks?.length;
  const completedTasks = tasks?.filter((task) => task.status === "done").length;
  const pendingTasks = tasks?.filter(
    (task) => task.status === "in_progress",
  ).length;

  const [addDailogTaksOpen, setaddDailogTaksOpen] = useState(false);

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="mx-8 flex w-full flex-col space-y-6 py-16">
        <Header
          title="Dashboard"
          subTitle="Dashboard"
          addDailog={setaddDailogTaksOpen}
        />
        <AddTaskDailog
          isOpen={addDailogTaksOpen}
          handleClose={() => setaddDailogTaksOpen(false)}
          tasks={tasks}
        />

        <div className="w-full">
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
            <DashBoardCard
              icon={<IconGlassWater />}
              title={0}
              subTitle="Água"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
