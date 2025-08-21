const LabelInput = ({ children, ...props }) => {
  return (
    <label
      className="text-left text-sm font-semibold text-[#35383E]"
      {...props}>
      {children}
    </label>
  );
};

export default LabelInput;
