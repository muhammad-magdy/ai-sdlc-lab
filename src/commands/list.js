const { loadTasks } = require('../storage/storage');

function listTasks(filter = null) {
  const tasks = loadTasks();

  if (filter === 'complete') {
    return tasks.filter(task => task.completed);
  } else if (filter === 'incomplete') {
    return tasks.filter(task => !task.completed);
  }

  return tasks;
}

function showListHelp() {
  console.log(`
LIST COMMAND

USAGE:
  node src/index.js list [--complete | --incomplete]

DESCRIPTION:
  View all tasks with their IDs, descriptions, and completion status.
  Optionally filter to show only completed or incomplete tasks.

OPTIONS:
  --complete      Show only completed tasks
  --incomplete    Show only incomplete tasks
  (no option)     Show all tasks

EXAMPLES:
  node src/index.js list
  node src/index.js list --complete
  node src/index.js list --incomplete

OUTPUT:
  [ ] [ID: 1] Buy groceries
  [✓] [ID: 2] Complete project documentation
  [ ] [ID: 3] Review PR #123 and merge

STATUS INDICATORS:
  [ ]    Incomplete task
  [✓]    Completed task

NOTES:
  - If you have no tasks, you'll see: "No tasks found"
  - Both complete and incomplete tasks are shown by default
  - Use filters to focus on specific task status
`);
}

module.exports = {
  listTasks,
  showListHelp
};
