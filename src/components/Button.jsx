const Button = ({ children, variant = "primary" }) => {
  function getVariantClass() {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "Ghost") {
      return "text-[#818181]";
    }
  }

  return (
    <button
      className={`flex h-6 items-center gap-1 rounded-md border-[#00ADB5] px-3 py-1 text-xs font-semibold transition hover:border-2 hover:opacity-80 ${getVariantClass()}`}>
      {children}
    </button>
  );
};

export default Button;
