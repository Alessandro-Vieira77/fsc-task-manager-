import "./MenuStyle.css"; // estilos da animação

import { Menu, X } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import SideBar from "../Sidebar";

export default function SidebarMenu() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  return (
    <div className="relative flex w-full justify-end lg:hidden">
      {/* Botão Hamburguer */}
      <button
        onClick={() => setOpen(!open)}
        className="m-2 rounded-md bg-brand-primary p-2 text-white">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar com animação */}
      <CSSTransition
        in={open}
        nodeRef={sidebarRef}
        timeout={300}
        classNames="sidebar"
        unmountOnExit>
        <div>
          {createPortal(
            <div
              ref={sidebarRef}
              className="fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg">
              <SideBar />
            </div>,
            document.body,
          )}
        </div>
      </CSSTransition>
    </div>
  );
}
