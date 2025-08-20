import { createPortal } from "react-dom";
const AddTaskDailog = ({ isOpen }) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="flex flex-col items-center rounded-xl bg-white p-5 shadow">
        <h1 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h1>
        <p className="text-sm font-light text-[#9A9C9F]">
          Insira as informaçãoes abaixo
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default AddTaskDailog;
