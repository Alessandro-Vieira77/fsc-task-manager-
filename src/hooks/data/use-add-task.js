import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 } from "uuid";

function useAddTask(tasks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addTask", tasks?.id],
    mutationFn: async (data) => {
      const { data: addTask } = await axios.post(
        "http://localhost:3000/tasks",
        {
          id: v4(),
          title: data?.title.trim(),
          description: data?.description.trim(),
          time: data?.time.trim(),
          status: "not_started",
        },
      );
      return addTask;
    },
    onSuccess: (tasks) => {
      queryClient.setQueryData(["tasks"], (oldData) => {
        return [...oldData, tasks];
      });
    },
  });
}

export default useAddTask;
