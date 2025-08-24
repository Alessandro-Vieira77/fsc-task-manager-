import PropTypes from "prop-types";
const DivTask = ({ children }) => {
  return <div className="w-full space-y-3">{children}</div>;
};

DivTask.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DivTask;
