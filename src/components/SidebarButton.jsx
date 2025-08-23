import { tv } from "tailwind-variants";
const SidebarButton = ({ children, color }) => {
  const button = tv({
    base: "flex items-center gap-1 rounded-lg px-5 py-2",
    variants: {
      color: {
        selected: "text-brand-primary bg-brand-background",
        unSelected: "text-brand-dark-blue",
      },
    },
    defaultVariants: {
      color: "selected",
    },
  });

  return (
    <a href="#" className={button({ color: color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
