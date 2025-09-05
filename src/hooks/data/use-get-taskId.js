import { useQuery } from "@tanstack/react-query";

import api from "../../lib/axios";

function useGetTaskId(taskId) {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data: tasks } = await api.get("tasks");
      const tasksId = tasks.find((task) => {
        return task.id === taskId;
      });

      return tasksId;
    },
  });
}

export default useGetTaskId;
