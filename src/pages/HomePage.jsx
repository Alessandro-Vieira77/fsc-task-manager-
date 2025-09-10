import "../components/Menu/MenuStyle.css";

import { useState } from "react";

import AddTaskDailog from "../components/addTaskDailog";
import DashBoardCards from "../components/DashBoardCards";
import Header from "../components/Header";
import ItemWater from "../components/ItemWater";
import SidebarMenu from "../components/Menu/ButtonMenu";
import SideBar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import useGetTasks from "../hooks/data/use-get-tasks";
import useGetWaterTask from "../hooks/data/use-get-waterTask";

function HomePage() {
  const { data: tasks } = useGetTasks();
  const { data: waterTasks } = useGetWaterTask();

  function calculeWater() {
    return waterTasks?.reduce((accumulator, currentValue) => {
      if (currentValue?.status === "done") {
        return accumulator + currentValue?.value;
      }
      return accumulator;
    }, 0);
  }

  const [addDailogTaksOpen, setaddDailogTaksOpen] = useState(false);

  return (
    <div className="relative flex w-full">
      <div className="hidden lg:flex">
        <SideBar />
      </div>

      <div className="flex w-full flex-col space-y-6 px-8 py-4 lg:py-16">
        <SidebarMenu />

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
          <DashBoardCards />
        </div>

        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <div className="flex w-full flex-col bg-brand-white p-6 lg:max-w-[648px]">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Tarefas
              </h2>
              <h3 className="text-sm text-brand-dark-gray">
                Resumos das tarefas disponíves
              </h3>
            </div>
            <div className="flex w-full flex-col gap-3">
              {tasks?.length > 0 ? (
                tasks?.map((task) => {
                  return <TaskItem key={task.id} task={task} />;
                })
              ) : (
                <div>
                  <p className="text-sm text-brand-text-gray">
                    Nenhuma tarefa disponível
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="min-h-[408px] w-full bg-brand-white p-6">
            <div className="flex flex-col gap-6">
              {/* text */}
              <div>
                <h2 className="text-xl font-semibold text-brand-dark-blue">
                  Água
                </h2>
                <h3 className="text-sm text-brand-dark-gray">
                  Beba sua meta diária de água
                </h3>
              </div>
              {/* ml/L */}
              <div className="flex w-full justify-between">
                <div className="flex w-[130px] flex-col gap-3">
                  {waterTasks?.map((waterTask) => {
                    return (
                      <ItemWater key={waterTask.id} waterTask={waterTask} />
                    );
                  })}
                </div>
                <div className="flex items-end">
                  <span className="flex items-center text-xl font-semibold text-brand-primary">
                    {calculeWater() === 0.5 ? `${500}ml` : `${calculeWater()}L`}
                    <span className="text-xs font-normal text-brand-dark-gray">
                      /7,5L
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
