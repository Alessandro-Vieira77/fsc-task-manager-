import LabelInput from "./LabelInput";

const Input = ({ title, error, ...props }) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <LabelInput htmlFor={props.id}>{title}</LabelInput>
      <input
        className="rounded-lg border-2 border-[#ECECEC] py-3 pl-6 outline-[#00ADB5]"
        {...props}
      />
      {
        <span className="w-full pt-1 text-left text-xs text-red-500">
          {error}
        </span>
      }
    </div>
  );
};

export default Input;
