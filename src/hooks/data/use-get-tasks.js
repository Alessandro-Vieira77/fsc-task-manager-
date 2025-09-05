import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data: task } = await axios.get("http://localhost:3000/tasks");
      return task;
    },
  });
}

export default useGetTasks;
