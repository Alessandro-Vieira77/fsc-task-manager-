const mutatiosKeys = {
  delete: (taskId) => ["deleteTasks", taskId],
  update: (taskId) => ["updateTasks", taskId],
  create: (taskId) => ["addTasks", taskId || "new"],
};
export default mutatiosKeys;
