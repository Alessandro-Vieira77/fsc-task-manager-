const TaskItem = ({ task }) => {
  function getStatusClass() {
    if (task.status === "done") {
      return "bg-[#00ADB5] bg-opacity-10 text-[#00ADB5]";
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA04] bg-opacity-10 text-[#FFAA04]";
    }

    if (task.status === "not_starded") {
      return "bg-[#9A9C9F] bg-opacity-10 text-[#9A9C9F]";
    }
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-md p-3 text-sm font-semibold ${getStatusClass()}`}>
      {task.title}
    </div>
  );
};

export default TaskItem;
