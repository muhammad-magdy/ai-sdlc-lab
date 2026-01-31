const { loadTasks, saveTasks } = require('../storage/storage');

function completeTask(taskId) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(taskId));

  if (!task) {
    return { success: false, error: `Task with ID ${taskId} not found` };
  }

  if (task.completed) {
    return { success: false, error: `Task ${taskId} is already complete`, alreadyComplete: true };
  }

  task.completed = true;
  saveTasks(tasks);

  return { success: true, taskId };
}

function showCompleteHelp() {
  console.log(`
COMPLETE COMMAND

USAGE:
  node src/index.js complete <task-id>

DESCRIPTION:
  Mark a task as complete using its ID. The task will remain in your
  list with a completed status until you delete it.

ARGUMENTS:
  <task-id>    The ID of the task to mark as complete (required)

EXAMPLES:
  node src/index.js complete 1
  node src/index.js complete 5

OUTPUT:
  Task 1 marked as complete

ERROR CASES:
  - Missing task ID: "Error: Task ID is required"
  - Invalid task ID: "Error: Task with ID 999 not found"
  - Already complete: "Task 1 is already complete"

NOTES:
  - Task ID must exist in your task list
  - Use 'node src/index.js list' to see all task IDs
  - Completing an already-completed task shows an info message
  - Completed tasks remain in your list until deleted
  - Changes are saved immediately to tasks.json
`);
}

module.exports = {
  completeTask,
  showCompleteHelp
};
