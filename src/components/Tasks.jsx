import Button from "./BUtton";
import IconAdd from "../assets/icons/add.svg?react";
import IconTrash from "../assets/icons/trash.svg?react";
import IconSun from "../assets/icons/sun.svg?react";
import IconClodSun from "../assets/icons/cloud-sun.svg?react";
import IconMoon from "../assets/icons/moon.svg?react";
import TaskDay from "../components/TaskDay";
import { useState } from "react";
import { TASK } from "../constants/task";
import TaskItem from "./TaskItem";
import DivTask from "./DivTask";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASK);

  const taskMorning = tasks.filter((task) => task.time === "morning");
  const taskAfftermoon = tasks.filter((task) => task.time === "afftermoon");
  const taskNight = tasks.filter((task) => task.time === "night");

  function handleCheckBox(i) {
    if (tasks[i].status === "not_starded") {
      return setTasks([...tasks, (tasks[i].status = "in_progress")]);
    }

    if (tasks[i].status === "in_progress") {
      return setTasks([...tasks, (tasks[i].status = "done")]);
    }

    if (tasks[i].status === "done") {
      return setTasks([...tasks, (tasks[i].status = "not_starded")]);
    }
  }

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
        <DivTask>
          <TaskDay title="Manhã">
            <IconSun />
          </TaskDay>
          {taskMorning.map((taskM) => (
            <TaskItem
              key={taskM.id}
              task={taskM}
              handleCheckBox={handleCheckBox}
            />
          ))}
        </DivTask>
        {/* Tarde */}
        <DivTask>
          <TaskDay title={"Tarde"}>
            <IconClodSun />
          </TaskDay>
          {taskAfftermoon.map((taskM, i) => (
            <TaskItem
              key={taskM.id}
              task={taskM}
              handleCheckBox={handleCheckBox}
            />
          ))}
        </DivTask>
        {/* Noite */}
        <DivTask>
          <TaskDay title={"Noite"}>
            <IconMoon />
          </TaskDay>
          {taskNight.map((taskM) => (
            <TaskItem
              key={taskM.id}
              task={taskM}
              handleCheckBox={handleCheckBox}
            />
          ))}
        </DivTask>
      </div>
    </div>
  );
};

export default Tasks;
