const { loadTasks, saveTasks } = require('../storage/storage');

function completeTask(taskId) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(taskId));

  if (!task) {
    return { success: false, error: `Task with ID ${taskId} not found` };
  }

  task.completed = true;
  saveTasks(tasks);

  return { success: true, taskId };
}

module.exports = {
  completeTask
};
