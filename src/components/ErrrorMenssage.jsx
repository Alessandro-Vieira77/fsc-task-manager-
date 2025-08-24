import PropTypes from "prop-types";

const ErrorMenssage = ({ children }) => {
  return (
    <span className="w-full pt-1 text-left text-xs text-brand-danger">
      {children}
    </span>
  );
};

ErrorMenssage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMenssage;
