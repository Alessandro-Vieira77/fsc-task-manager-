import PropTypes from "prop-types";
import { forwardRef } from "react";

import ErrorMenssage from "./ErrrorMenssage";
import LabelInput from "./LabelInput";
const TimeSelect = forwardRef(({ error, loading, ...props }, ref) => {
  return (
    <div className="flex w-full flex-col">
      <LabelInput htmlFor="time">Hórario</LabelInput>

      <select
        ref={ref}
        {...props}
        className="rounded-lg border-2 border-brand-border py-3 pl-6 outline-brand-primary"
        name="time"
        id="time"
        disabled={loading}>
        <option value={"selected"}>Selecione</option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      <ErrorMenssage>{error}</ErrorMenssage>
    </div>
  );
});

TimeSelect.displayName = "TimeSelect";

TimeSelect.propTypes = {
  error: PropTypes.string,
};

export default TimeSelect;
