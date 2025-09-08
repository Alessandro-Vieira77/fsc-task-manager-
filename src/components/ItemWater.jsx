import { toast } from "react-hot-toast";
import { tv } from "tailwind-variants";

import { IconCheck } from "../assets/icons";
import useUpdateWater from "../hooks/data/use-update-water";
function ItemWater({ waterTask }) {
  const status = tv({
    base: "flex items-center justify-between gap-3 rounded-md bg-opacity-10 p-3 text-sm font-semibold transition",
    variants: {
      color: {
        primary: "bg-brand-primary text-brand-primary",
        secundary: "bg-brand-text-gray text-brand-text-gray",
      },
    },
  });

  const checkbox = tv({
    base: "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ",
    variants: {
      color: {
        primary: "bg-brand-primary ",
        secundary: "bg-brand-text-gray ",
      },
    },
  });

  const { mutate: updateWater } = useUpdateWater(waterTask.id);

  function getStatusClasses() {
    if (waterTask.status === "done") {
      return "primary";
    }

    if (waterTask.status === "not_started") {
      return "secundary";
    }
  }

  function getStatus() {
    let status;
    if (waterTask.status === "not_started") {
      toast.success("Tarefa marcada como realizada");
      status = "done";
    }
    if (waterTask.status === "done") {
      toast.success("Tarefa marcada como não realizada");
      status = "not_started";
    }

    updateWater(
      {
        status,
      },
      {
        onError: () => {
          toast.error("Erro ao atualizar tarefa");
        },
      },
    );
  }

  return (
    <div className={status({ color: getStatusClasses() })}>
      <div className="flex items-center gap-2">
        <label className={checkbox({ color: getStatusClasses() })}>
          <input
            type="checkbox"
            checked={waterTask.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            readOnly
            onClick={() => {
              getStatus();
            }}
          />
          {waterTask.status === "done" && <IconCheck />}
        </label>
        {waterTask.quantity}
      </div>
    </div>
  );
}

export default ItemWater;
