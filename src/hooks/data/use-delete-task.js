import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutatiosKeys from "../../keys/mutation";
import api from "../../lib/axios";

function useDeleteTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutatiosKeys.delete(taskId),
    mutationFn: async () => {
      const { data: newTasks } = await api.delete(`tasks/${taskId}`);

      return newTasks;
    },
    onSuccess: (newTasks) => {
      queryClient.setQueryData(["tasks"], (oldData) => {
        return oldData.filter((task) => task.id !== newTasks.id);
      });
    },
  });
}

export default useDeleteTask;
