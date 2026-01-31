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

function showDeleteHelp() {
  console.log(`
DELETE COMMAND

USAGE:
  node src/index.js delete <task-id>

DESCRIPTION:
  Permanently delete a task from your list using its ID.
  This action cannot be undone.

ARGUMENTS:
  <task-id>    The ID of the task to delete (required)

EXAMPLES:
  node src/index.js delete 1
  node src/index.js delete 3

OUTPUT:
  Task 1 deleted successfully

ERROR CASES:
  - Missing task ID: "Error: Task ID is required"
  - Invalid task ID: "Error: Task with ID 999 not found"

NOTES:
  - Task ID must exist in your task list
  - Use 'node src/index.js list' to see all task IDs
  - Deletion is permanent and cannot be undone
  - Task IDs are not reused after deletion
  - Changes are saved immediately to tasks.json
`);
}

module.exports = {
  deleteTask,
  showDeleteHelp
};
