import { useQuery } from "@tanstack/react-query";

function useGetTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const task = await response.json();
      return task;
    },
  });
}

export default useGetTasks;
