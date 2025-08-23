const Button = ({
  children,
  variant = "brand-primary",
  size = "small",
  className,
  ...props
}) => {
  function getVariantClass() {
    if (variant === "brand-primary") {
      return "bg-brand-primary text-white";
    }

    if (variant === "Ghost") {
      return "text-brand-dark-gray";
    }

    if (variant === "secundary") {
      return "text--brand-dark-blue bg-brand-light-gray";
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
      className={`flex h-6 items-center justify-center gap-1 rounded-md border-brand-primary font-semibold transition hover:bg-opacity-75 ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
