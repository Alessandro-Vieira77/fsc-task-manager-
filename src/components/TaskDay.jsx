const TaskDay = ({ children, title }) => {
  return (
    <div className="flex w-full items-center gap-2 border-b-2 border-[#f4f4f5] p-3 text-sm font-semibold text-[#9A9C9F]">
      {children}
      <p>{title}</p>
    </div>
  );
};

export default TaskDay;
