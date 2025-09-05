import { useMutation, useQueryClient } from "@tanstack/react-query";
function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data?.title.trim(),
          description: data?.description.trim(),
          time: data?.time?.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
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

      return response.json();
    },
  });
}

export default useUpdateTask;
