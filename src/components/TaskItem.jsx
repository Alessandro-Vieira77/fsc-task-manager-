import CheckIcon from "../assets/icons/check.svg?react";
import LoaderIcon from "../assets/icons/loader.svg?react";
import DetailsIcon from "../assets/icons/details.svg?react";
import { useState } from "react";

const TaskItem = ({ task, handleCheckBox, index }) => {
  function getStatusClasses() {
    if (task.status === "done") {
      return "bg-[#00ADB5] text-[#00ADB5]";
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA04] text-[#FFAA04]";
    }

    if (task.status === "not_starded") {
      return "bg-[#9A9C9F] text-[#9A9C9F] ";
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-md bg-opacity-10 p-3 text-sm font-semibold transition ${getStatusClasses()}`}>
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}>
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            readOnly
            onClick={() => {
              handleCheckBox(task.id - 1);
              console.log(task.id - 1);
            }}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        {task.title}
      </div>
      <a href="#">
        <DetailsIcon className="transition hover:opacity-75" />
      </a>
    </div>
  );
};

export default TaskItem;
