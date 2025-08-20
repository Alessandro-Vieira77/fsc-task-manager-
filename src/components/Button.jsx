const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...props
}) => {
  function getVariantClass() {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "Ghost") {
      return "text-[#818181]";
    }

    if (variant === "secundary") {
      return "text-[#35383E] bg-[#EEEEEE]";
    }
  }

  function getSizeClass() {
    if (size === "small") {
      return "px-3 py-1 text-xs font-semibold";
    }

    if (size === "large") {
      return "px-3 py-4 text-sm  ";
    }
  }

  return (
    <button
      className={`flex h-6 items-center justify-center gap-1 rounded-md border-[#00ADB5] font-semibold transition hover:bg-opacity-75 ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
