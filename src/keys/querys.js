const querykeys = {
  getTasks: () => ["tasks"],
  getTaskId: (taskId) => ["tasks", taskId],
  getWaterTasks: () => ["waterTasks"],
};

export default querykeys;
