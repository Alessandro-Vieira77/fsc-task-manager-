import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";

function useAddTask(tasks) {
  const queryClient = useQueryClient();
  return useMutation({
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

      const addTask = response.json();
      return addTask;
    },
    onSuccess: (tasks) => {
      queryClient.setQueryData(["tasks"], (oldData) => {
        return [...oldData, tasks];
      });
    },
  });
}

export default useAddTask;
