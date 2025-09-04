import "./addTaskDailog.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes, { func } from "prop-types";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import { IconLoader } from "../assets/icons";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDailog = ({ isOpen, handleClose, tasks }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addTask", tasks?.id],
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify({
          id: v4(),
          title: data?.title.trim(),
          description: data?.description.trim(),
          time: data?.time.trim(),
          status: "not_started",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      time: "selected",
    },
  });

  const nodeRef = useRef(null);

  function handleSaveTasks(data) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Tarefa adicionada!");
        queryClient.refetchQueries(["tasks"]);
        handleClose(isPending);
      },
      onError: () => {
        toast.error("Erro ao adicionar tarefa!");
      },
    });

    reset({ title: "", description: "", time: "selected" });
  }

  function handleCloseDialog() {
    reset({
      title: "",
      description: "",
      time: "selected",
    });
    handleClose();
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames={"add-task-dialog"}
      nodeRef={nodeRef}
      unmountOnExit>
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
            <div className="flex w-[336px] flex-col items-center space-y-1 rounded-xl bg-brand-white p-5 shadow">
              <h1 className="text-brand-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h1>
              <p className="pb-4 text-sm font-light text-brand-text-gray">
                Insira as informaçãoes abaixo
              </p>
              <form
                onSubmit={handleSubmit(handleSaveTasks)}
                className="flex w-full flex-col gap-4">
                <Input
                  title="Título"
                  type="text"
                  id="title"
                  placeholder="Digite seu nome"
                  error={formErrors?.title?.message}
                  disabled={isSubmitting}
                  {...register("title", {
                    validate: (value) => {
                      if (!value.trim()) {
                        return "Campo não pode está vazio";
                      }
                      return true;
                    },
                    required: "Campo obrigatório",
                    minLength: {
                      value: 3,
                      message: "Mínimo 3 caracteres",
                    },
                  })}
                />

                <TimeSelect
                  error={formErrors?.time?.message}
                  loading={isSubmitting}
                  {...register("time", {
                    validate: (value) => {
                      if (value === "selected") {
                        return "Campo obrigatório";
                      }
                      return true;
                    },
                    required: "Campo obrigatório",
                    minLength: {
                      value: 3,
                      message: "Mínimo 3 caracteres",
                    },
                  })}
                />

                <Input
                  title="Descrição"
                  type="text"
                  placeholder="Digite a descrição"
                  id="description"
                  error={formErrors?.description?.message}
                  disabled={isSubmitting}
                  {...register("description", {
                    validate: (value) => {
                      if (!value.trim()) {
                        return "Campo não pode está vazio";
                      }
                      return true;
                    },
                    required: "Campo obrigatório",
                    minLength: {
                      value: 3,
                      message: "Mínimo 3 caracteres",
                    },
                  })}
                />

                <div className="flex w-full items-center gap-4 pt-4">
                  <Button
                    color={"secundary"}
                    size="large"
                    width={"full"}
                    type="button"
                    onClick={() => handleCloseDialog()}>
                    Cancelar
                  </Button>
                  <Button
                    color={"primary"}
                    size="large"
                    width={"full"}
                    disabled={isSubmitting}
                    type="submit">
                    {isPending && (
                      <IconLoader className="animate-spin text-brand-white" />
                    )}
                    {isPending ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDailog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTaskDailog;
