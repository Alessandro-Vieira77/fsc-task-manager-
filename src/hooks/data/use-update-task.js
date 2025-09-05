import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data) => {
      const { data: updateTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
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
        },
      );

      return updateTask;
    },
  });
}

export default useUpdateTask;
