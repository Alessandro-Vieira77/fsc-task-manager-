const SidebarButton = ({ children, variant }) => {
  function getStyle() {
    if (variant === "selected") {
      return "text-brand-primary bg-brand-background";
    }

    if (variant === "unSelected") {
      return "text-brand-dark-blue";
    }
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-1 rounded-lg px-5 py-2 ${getStyle()}`}>
      {children}
    </a>
  );
};

export default SidebarButton;
