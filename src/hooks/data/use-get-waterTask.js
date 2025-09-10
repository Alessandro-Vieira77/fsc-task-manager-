import { useQuery } from "@tanstack/react-query";

import querykeys from "../../keys/querys";
import api from "../../lib/axios";

function useGetTasks() {
  return useQuery({
    queryKey: querykeys.getTasks(),
    queryFn: async () => {
      const { data } = await api.get("/water");

      // garante que sempre retorne array
      return Array.isArray(data) ? data : [];
    },
  });
}

export default useGetTasks;
