const LabelInput = ({ children, ...props }) => {
  return (
    <label
      className="text-brand-brand-dark-blue text-left text-sm font-semibold"
      {...props}>
      {children}
    </label>
  );
};

export default LabelInput;
