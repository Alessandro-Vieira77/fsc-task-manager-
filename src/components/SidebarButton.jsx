import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, to }) => {
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
    <NavLink
      to={to}
      className={({ isActive }) => {
        return button({ color: isActive ? "selected" : "unSelected" });
      }}>
      {children}
    </NavLink>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default SidebarButton;
