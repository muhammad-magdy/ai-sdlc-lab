const { createTask } = require('../models/task');
const { loadTasks, saveTasks } = require('../storage/storage');

function addTask(description) {
  if (!description || typeof description !== 'string' || description.trim() === '') {
    throw new Error('Task description is required and cannot be empty');
  }

  const tasks = loadTasks();
  const newTask = createTask(description.trim());
  tasks.push(newTask);
  saveTasks(tasks);

  return newTask;
}

module.exports = {
  addTask
};
