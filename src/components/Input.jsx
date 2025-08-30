import PropTypes from "prop-types";
import { forwardRef } from "react";

import ErrorMenssage from "./ErrrorMenssage";
import LabelInput from "./LabelInput";

const Input = forwardRef(({ title, error, ...props }, ref) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <LabelInput htmlFor={props.id}>{title}</LabelInput>
      <input
        className="rounded-lg border-2 border-brand-border py-3 pl-6 outline-brand-primary"
        ref={ref}
        {...props}
      />
      <ErrorMenssage>{error}</ErrorMenssage>
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
