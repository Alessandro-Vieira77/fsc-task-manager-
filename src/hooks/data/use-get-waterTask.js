import { useQuery } from "@tanstack/react-query";

import querykeys from "../../keys/querys";
import api from "../../lib/axios";

function useGetTasks() {
  return useQuery({
    queryKey: querykeys.getWaterTasks(),
    queryFn: async () => {
      const { data: waterTasks } = await api.get("/water");

      return waterTasks;
    },
    initialData: [],
  });
}

export default useGetTasks;
