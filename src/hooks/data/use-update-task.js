import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutatiosKeys from "../../keys/mutation";
import api from "../../lib/axios";
function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutatiosKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updateTask } = await api.patch(`tasks/${taskId}`, {
        title: data?.title.trim(),
        description: data?.description.trim(),
        time: data?.time?.trim(),
        onSuccess: (data) => {
          queryClient.setQueryData(["tasks"], (oldData) => {
            return oldData.map((task) => {
              if (task.id !== taskId) {
                return task;
              }
              return { ...task, ...data };
            });
          });
        },
      });

      return updateTask;
    },
  });
}

export default useUpdateTask;
