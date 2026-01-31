const { loadTasks } = require('../storage/storage');

function listTasks() {
  const tasks = loadTasks();
  return tasks;
}

module.exports = {
  listTasks
};
