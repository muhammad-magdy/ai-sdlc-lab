const { loadTasks, saveTasks } = require('../storage/storage');

function editTask(taskId, newDescription) {
  if (!newDescription || typeof newDescription !== 'string' || newDescription.trim() === '') {
    return { success: false, error: 'New description is required and cannot be empty' };
  }

  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(taskId));

  if (!task) {
    return { success: false, error: `Task with ID ${taskId} not found` };
  }

  const oldDescription = task.description;
  task.description = newDescription.trim();
  saveTasks(tasks);

  return { success: true, taskId, oldDescription, newDescription: task.description };
}

function showEditHelp() {
  console.log(`
EDIT COMMAND

USAGE:
  node src/index.js edit <task-id> <new-description>

DESCRIPTION:
  Edit an existing task's description using its ID. The task ID and
  completion status are preserved, only the description is changed.

ARGUMENTS:
  <task-id>          The ID of the task to edit (required)
  <new-description>  The new description for the task (required, cannot be empty)

EXAMPLES:
  node src/index.js edit 1 Updated task description
  node src/index.js edit 5 Buy groceries and cook dinner
  node src/index.js edit 3 Review PR #456 and merge to main

OUTPUT:
  Task 1 updated successfully
  Old: Buy groceries
  New: Updated task description

ERROR CASES:
  - Missing task ID: "Error: Task ID is required"
  - Missing description: "Error: New description is required and cannot be empty"
  - Invalid task ID: "Error: Task with ID 999 not found"
  - Empty description: "Error: New description is required and cannot be empty"

NOTES:
  - Task ID must exist in your task list
  - Use 'node src/index.js list' to see all task IDs
  - Task ID and completion status are preserved
  - Only the description is changed
  - Whitespace is trimmed from the new description
  - Changes are saved immediately to tasks.json
  - You can edit both completed and incomplete tasks
`);
}

module.exports = {
  editTask,
  showEditHelp
};
