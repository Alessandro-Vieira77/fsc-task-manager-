import PropTypes from "prop-types";
const LabelInput = ({ children, ...props }) => {
  return (
    <label
      className="text-brand-brand-dark-blue text-left text-sm font-semibold"
      {...props}>
      {children}
    </label>
  );
};

LabelInput.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LabelInput;
