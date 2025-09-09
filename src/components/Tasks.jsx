import "./Menu/MenuStyle.css";

import { useState } from "react";

import { IconClodSun, IconMoon, IconSun } from "../assets/icons";
import TaskDay from "../components/TaskDay";
import useGetTasks from "../hooks/data/use-get-tasks";
import AddTaskDailog from "./addTaskDailog";
import DivTask from "./DivTask";
import Header from "./Header";
import SidebarMenu from "./Menu/ButtonMenu";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const [addDailogTaksOpen, setaddDailogTaksOpen] = useState(false);

  const { data: tasks } = useGetTasks();

  const taskMorning = tasks?.filter((task) => task?.time === "morning");
  const taskAfftermoon = tasks?.filter((task) => task?.time === "afternoon");
  const taskNight = tasks?.filter((task) => task?.time === "night");

  return (
    <div className="w-full space-y-6 px-8 py-4 lg:py-16">
      <SidebarMenu />

      <Header
        title="Minhas tarefas"
        subTitle="Minhas Tarefas"
        addDailog={setaddDailogTaksOpen}
      />
      <AddTaskDailog
        isOpen={addDailogTaksOpen}
        handleClose={() => setaddDailogTaksOpen(false)}
        tasks={tasks}
      />
      <div className="w-full space-y-6 rounded-md bg-brand-white p-6">
        <DivTask>
          <TaskDay title="Manhã">
            <IconSun />
          </TaskDay>
          {taskMorning?.length > 0 ? (
            taskMorning?.map((taskM) => (
              <TaskItem key={taskM.id} task={taskM} />
            ))
          ) : (
            <p className="text-sm text-brand-text-gray">
              Não há tarefas para este período
            </p>
          )}
        </DivTask>

        <DivTask>
          <TaskDay title={"Tarde"}>
            <IconClodSun />
          </TaskDay>
          {taskAfftermoon?.length > 0 ? (
            taskAfftermoon?.map((taskM) => (
              <TaskItem key={taskM.id} task={taskM} />
            ))
          ) : (
            <p className="text-sm text-brand-text-gray">
              Não há tarefas para este período
            </p>
          )}
        </DivTask>

        <DivTask>
          <TaskDay title={"Noite"}>
            <IconMoon />
          </TaskDay>
          {taskNight?.length > 0 ? (
            taskNight?.map((taskM) => <TaskItem key={taskM.id} task={taskM} />)
          ) : (
            <p className="text-sm text-brand-text-gray">
              Não há tarefas para este período
            </p>
          )}
        </DivTask>
      </div>
    </div>
  );
};

export default Tasks;
