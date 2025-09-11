import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";

import mutatiosKeys from "../../keys/mutation";
import api from "../../lib/axios";

function useAddTask(tasks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutatiosKeys.create(tasks?.id),
    mutationFn: async (data) => {
      const { data: addTask } = await api.post("http://localhost:3000/tasks", {
        id: v4(),
        title: data?.title.trim(),
        description: data?.description.trim(),
        time: data?.time.trim(),
        status: "not_started",
      });
      return addTask;
    },
    onSuccess: (tasks) => {
      queryClient.setQueryData(["tasks"], (oldData) => {
        return [...oldData, tasks];
      });
    },
    initialData: [],
  });
}

export default useAddTask;
