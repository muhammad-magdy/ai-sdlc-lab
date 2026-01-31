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

function showAddHelp() {
  console.log(`
ADD COMMAND

USAGE:
  node src/index.js add <description>

DESCRIPTION:
  Add a new task with the given description. The task will be assigned
  a unique ID automatically and marked as incomplete by default.

ARGUMENTS:
  <description>    The description of the task (required, cannot be empty)

EXAMPLES:
  node src/index.js add Buy groceries
  node src/index.js add Complete project documentation by Friday
  node src/index.js add Review PR #123 and merge

OUTPUT:
  Task added successfully! [ID: 1] Buy groceries

NOTES:
  - Task description is required and cannot be empty
  - Each task receives a unique ID automatically
  - New tasks are marked as incomplete by default
  - Changes are saved immediately to tasks.json
`);
}

module.exports = {
  addTask,
  showAddHelp
};
