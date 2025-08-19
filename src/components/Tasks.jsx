import Button from "./Button";
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

  function handleCheckBox(taskId) {
    const checkBox = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === "done") {
        return { ...task, status: "not_starded" };
      }

      if (task.status === "not_starded") {
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        return { ...task, status: "done" };
      }

      setTasks(handleCheckBox);
    });

    setTasks(checkBox);
  }

  function handleClickDelete(taskId) {
    const deliteTask = tasks.filter((task) => {
      return taskId !== task.id;
    });

    setTasks(deliteTask);
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
              handleClickDelete={handleClickDelete}
            />
          ))}
        </DivTask>
        {/* Tarde */}
        <DivTask>
          <TaskDay title={"Tarde"}>
            <IconClodSun />
          </TaskDay>
          {taskAfftermoon.map((taskM) => (
            <TaskItem
              key={taskM.id}
              task={taskM}
              handleCheckBox={handleCheckBox}
              handleClickDelete={handleClickDelete}
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
              handleClickDelete={handleClickDelete}
            />
          ))}
        </DivTask>
      </div>
    </div>
  );
};

export default Tasks;
