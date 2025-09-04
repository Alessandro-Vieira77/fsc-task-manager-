import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  IconAdd,
  IconClodSun,
  IconMoon,
  IconSun,
  IconTrash,
} from "../assets/icons";
import TaskDay from "../components/TaskDay";
import AddTaskDailog from "./addTaskDailog";
import Button from "./Button";
import DivTask from "./DivTask";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const [addDailogTaksOpen, setaddDailogTaksOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const queryClient = useQueryClient();
  const {
    data: tasks,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const task = await response.json();
      return task;
    },
  });

  const taskMorning = tasks?.filter((task) => task?.time === "morning");
  const taskAfftermoon = tasks?.filter((task) => task?.time === "afternoon");
  const taskNight = tasks?.filter((task) => task?.time === "night");

  function handleCheckBox(taskId) {
    tasks?.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === "done") {
        toast.success("Task reniciada!");
        queryClient.setQueryData(["tasks"], (currentValues) => {
          return currentValues.map((task) => {
            if (task.id !== taskId) {
              return task;
            }
            return { ...task, status: "not_started" };
          });
        });
      }

      if (task.status === "not_started") {
        toast.success("Task em progresso!");

        queryClient.setQueryData(["tasks"], (currentValues) => {
          return currentValues.map((task) => {
            if (task.id !== taskId) {
              return task;
            }
            return { ...task, status: "in_progress" };
          });
        });
      }

      if (task.status === "in_progress") {
        toast.success("Task concluída!");

        queryClient.setQueryData(["tasks"], (currentValues) => {
          return currentValues.map((task) => {
            if (task.id !== taskId) {
              return task;
            }
            return { ...task, status: "done" };
          });
        });
      }
    });
  }

  return (
    <div className="mx-8 w-full space-y-6 py-16">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold text-brand-dark-blue">
            Minhas Tarefas
          </h2>
        </div>
        <div className="flex gap-2">
          <Button color="ghost">
            Limpar tarefas
            <IconTrash />
          </Button>
          <Button
            color={"primary"}
            onClick={() => {
              setaddDailogTaksOpen(true);
            }}>
            Nova Tarefa
            <IconAdd />
          </Button>
          <AddTaskDailog
            isOpen={addDailogTaksOpen}
            handleClose={() => setaddDailogTaksOpen(false)}
            tasks={tasks}
          />
        </div>
      </div>
      <div className="w-full space-y-6 rounded-md bg-brand-white p-6">
        {/* Manhã */}
        <DivTask>
          <TaskDay title="Manhã">
            <IconSun />
          </TaskDay>
          {taskMorning?.length > 0 ? (
            taskMorning?.map((taskM) => (
              <TaskItem
                key={taskM.id}
                task={taskM}
                handleCheckBox={handleCheckBox}
              />
            ))
          ) : (
            <p className="text-sm text-brand-text-gray">
              Não há tarefas para este período
            </p>
          )}
        </DivTask>
        {/* Tarde */}
        <DivTask>
          <TaskDay title={"Tarde"}>
            <IconClodSun />
          </TaskDay>
          {taskAfftermoon?.length > 0 ? (
            taskAfftermoon?.map((taskM) => (
              <TaskItem
                key={taskM.id}
                task={taskM}
                handleCheckBox={handleCheckBox}
              />
            ))
          ) : (
            <p className="text-sm text-brand-text-gray">
              Não há tarefas para este período
            </p>
          )}
        </DivTask>
        {/* Noite */}
        <DivTask>
          <TaskDay title={"Noite"}>
            <IconMoon />
          </TaskDay>
          {taskNight?.length > 0 ? (
            taskNight?.map((taskM) => (
              <TaskItem
                key={taskM.id}
                task={taskM}
                handleCheckBox={handleCheckBox}
              />
            ))
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
