import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetTaskId(taskId) {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data: tasks } = await axios.get("http://localhost:3000/tasks");
      const tasksId = tasks.find((task) => {
        return task.id === taskId;
      });

      return tasksId;
    },
  });
}

export default useGetTaskId;
