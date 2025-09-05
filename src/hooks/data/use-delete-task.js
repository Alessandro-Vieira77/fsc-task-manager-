import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
function useDeleteTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: newTasks } = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`,
      );

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
