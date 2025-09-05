import { useQuery } from "@tanstack/react-query";

function useGetTaskId(taskId) {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks");

      const tasks = await response.json();
      const tasksId = tasks.find((task) => {
        return task.id === taskId;
      });

      return tasksId;
    },
  });
}

export default useGetTaskId;
