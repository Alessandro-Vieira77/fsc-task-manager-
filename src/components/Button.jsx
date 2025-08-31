import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Button = ({ children, color, size, width, ...props }) => {
  const button = tv({
    base: "flex h-6 items-center justify-center gap-1 rounded-md border-brand-primary font-semibold transition hover:bg-opacity-75",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        secundary: "text--brand-dark-blue bg-brand-light-gray",
        ghost: "text-brand-dark-gray",
        danger: "bg-brand-danger text-white",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:opacity-50",
      },

      size: {
        small: "px-3 py-1 text-xs font-semibold",
        large: "px-3 py-4 text-sm  ",
      },
      width: {
        full: "w-full",
      },
    },
    defaultVariants: {
      color: "ghost",
      size: "small",
    },
  });

  return (
    <button
      className={button({
        size: size,
        color: color,
        disabled: props.disabled,
        width: width,
      })}
      {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
};

export default Button;
