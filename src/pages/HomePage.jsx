import { useState } from "react";

import AddTaskDailog from "../components/addTaskDailog";
import DashBoardCards from "../components/DashBoardCards";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import useGetTasks from "../hooks/data/use-get-tasks";
function HomePage() {
  const { data: tasks } = useGetTasks();

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
          <DashBoardCards />
        </div>

        <div className="flex w-full gap-8">
          <div className="flex w-full max-w-[648px] flex-col bg-brand-white p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Tarefas
              </h2>
              <h3 className="text-sm text-brand-dark-gray">
                Resumos das tarefas disponíves
              </h3>
            </div>
            <div className="flex w-full flex-col gap-3">
              {tasks?.map((task) => {
                return <TaskItem key={task.id} task={task} />;
              })}
            </div>
          </div>
          <div className="h-[408px] w-full bg-brand-white"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
