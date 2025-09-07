import { useMutation } from "@tanstack/react-query";

import api from "../../lib/axios";

const useUpateStatus = (taskId) => {
  return useMutation({
    mutationKey: ["taskStatus"],
    mutationFn: async (status) => {
      const response = await api.patch(`tasks/${taskId}`, {
        status: status,
      });

      return response;
    },
  });
};

export default useUpateStatus;
