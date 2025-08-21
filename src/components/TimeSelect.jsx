import LabelInput from "./LabelInput";

const TimeSelect = () => {
  return (
    <div className="flex w-full flex-col">
      <LabelInput htmlFor="time">Hórario</LabelInput>

      <select
        className="rounded-lg border-2 border-[#ECECEC] py-3 pl-6 outline-[#00ADB5]"
        name="time"
        id="time">
        <option defaultValue={"selected"}>Selecione</option>
        <option value="morning">Manhã</option>
        <option value="affetermoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
    </div>
  );
};

export default TimeSelect;
