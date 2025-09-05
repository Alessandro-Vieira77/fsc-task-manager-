import { useQuery } from "@tanstack/react-query";

import querykeys from "../../keys/querys";
import api from "../../lib/axios";

function useGetTasks() {
  return useQuery({
    queryKey: querykeys.getTasks(),
    queryFn: async () => {
      const { data: task } = await api.get("tasks");
      return task;
    },
  });
}

export default useGetTasks;
