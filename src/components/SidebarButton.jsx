const SidebarButton = ({ children, variant }) => {
  function getStyle() {
    if (variant === "selected") {
      return "text-[#00ADB5] bg-[#E6F7F8]";
    }

    if (variant === "unSelected") {
      return "text-[#35383E]";
    }
  }

  return (
    <a href="#" className={`rounded-lg p-2 ${getStyle()}`}>
      {children}
    </a>
  );
};

export default SidebarButton;
