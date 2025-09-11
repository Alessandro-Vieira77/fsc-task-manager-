import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutatiosKeys from "../../keys/mutation";
import querykeys from "../../keys/querys";
import api from "../../lib/axios";
function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutatiosKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updateTask } = await api.patch(`tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time?.trim(),
        status: data?.status?.trim(),
      });

      queryClient.setQueryData(querykeys.getTasks(), (oldData) => {
        return oldData.map((task) => {
          if (task.id === taskId) {
            return updateTask;
          }
          return task;
        });
      });

      return updateTask;
    },
    initialData: [],
  });
}

export default useUpdateTask;
