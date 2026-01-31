function showHelp() {
  console.log(`
CLI Task Manager - Command Reference

USAGE:
  node src/index.js <command> [arguments]

COMMANDS:

  add <description>
      Add a new task with the given description.

      Example:
        node src/index.js add Buy groceries
        node src/index.js add Complete project documentation by Friday

  list [--complete | --incomplete]
      List all tasks with their IDs, descriptions, and completion status.

      Options:
        --complete     Show only completed tasks
        --incomplete   Show only incomplete tasks

      Examples:
        node src/index.js list
        node src/index.js list --complete
        node src/index.js list --incomplete

  complete <task-id>
      Mark a task as complete using its ID.

      Example:
        node src/index.js complete 1
        node src/index.js complete 5

  delete <task-id>
      Permanently delete a task using its ID.

      Example:
        node src/index.js delete 1
        node src/index.js delete 3

  edit <task-id> <new-description>
      Edit an existing task's description.

      Example:
        node src/index.js edit 1 Updated task description
        node src/index.js edit 5 Buy groceries and cook dinner

  search <keyword>
      Search for tasks containing the given keyword (case-insensitive).

      Example:
        node src/index.js search project
        node src/index.js search meeting

  help
      Display this help message.

      Example:
        node src/index.js help

HELP FLAGS:

  Use --help with any command for detailed information:
    node src/index.js add --help
    node src/index.js list --help
    node src/index.js complete --help
    node src/index.js delete --help

DATA STORAGE:

  Tasks are stored in: tasks.json
  All changes are saved automatically.

For more information, see the README.md file.
`);
}

module.exports = {
  showHelp
};
