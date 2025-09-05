import { useMutation, useQueryClient } from "@tanstack/react-query";
function useDeleteTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      const newTasks = response.json();

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
