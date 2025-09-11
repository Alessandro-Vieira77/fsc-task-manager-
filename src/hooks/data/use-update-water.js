import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutatiosKeys from "../../keys/mutation";
import querykeys from "../../keys/querys";
import api from "../../lib/axios";
function useUpdateWater(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutatiosKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updateTask } = await api.patch(`water/${taskId}`, {
        status: data?.status?.trim(),
      });

      queryClient.setQueryData(querykeys.getWaterTasks(), (oldData) => {
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

export default useUpdateWater;
