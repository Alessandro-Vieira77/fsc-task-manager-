import PropTypes from "prop-types";

const TaskDay = ({ children, title }) => {
  return (
    <div className="flex w-full items-center gap-2 border-b-2 border-brand-border p-3 text-sm font-semibold text-brand-text-gray">
      {children}
      <p>{title}</p>
    </div>
  );
};

TaskDay.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default TaskDay;
