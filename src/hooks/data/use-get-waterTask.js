import { useQuery } from "@tanstack/react-query";

import querykeys from "../../keys/querys";
import api from "../../lib/axios";

function useGetWaterTask() {
  return useQuery({
    queryKey: querykeys.getWaterTasks(),
    queryFn: async () => {
      const { data: waterTasks } = await api.get("water");
      return waterTasks;
    },
  });
}

export default useGetWaterTask;
