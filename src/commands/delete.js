const { loadTasks, saveTasks } = require('../storage/storage');

function deleteTask(taskId) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));

  if (taskIndex === -1) {
    return { success: false, error: `Task with ID ${taskId} not found` };
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);

  return { success: true, taskId };
}

module.exports = {
  deleteTask
};
