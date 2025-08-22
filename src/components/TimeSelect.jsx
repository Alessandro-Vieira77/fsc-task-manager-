import LabelInput from "./LabelInput";

const TimeSelect = ({ error, ...props }) => {
  return (
    <div className="flex w-full flex-col">
      <LabelInput htmlFor="time">Hórario</LabelInput>

      <select
        {...props}
        className="rounded-lg border-2 border-[#ECECEC] py-3 pl-6 outline-[#00ADB5]"
        name="time"
        id="time">
        <option defaultValue={"selected"}>Selecione</option>
        <option value="morning">Manhã</option>
        <option value="afftermoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {
        <span className="w-full pt-1 text-left text-xs text-red-500">
          {error}
        </span>
      }
    </div>
  );
};

export default TimeSelect;
