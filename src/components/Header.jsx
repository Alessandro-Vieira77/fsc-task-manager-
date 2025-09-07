import { IconAdd, IconTrash } from "../assets/icons";
import Button from "./Button";
function Header({ title, subTitle, addDailog }) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-brand-primary">
          {title}
        </span>
        <h2 className="text-xl font-semibold text-brand-dark-blue">
          {subTitle}
        </h2>
      </div>
      <div className="flex items-end gap-2">
        <Button color="ghost">
          Limpar tarefas
          <IconTrash />
        </Button>
        <Button
          color={"primary"}
          onClick={() => {
            addDailog(true);
          }}>
          Nova Tarefa
          <IconAdd />
        </Button>
      </div>
    </div>
  );
}
export default Header;
