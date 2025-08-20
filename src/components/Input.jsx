const Input = ({ title, ...props }) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label
        className="text-sm font-semibold text-[#35383E]"
        htmlFor={props.id}>
        {title}
      </label>
      <input className="rounded-lg py-3 pl-6 outline-[#00ADB5]" {...props} />
    </div>
  );
};

export default Input;
