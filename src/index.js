const { addTask, showAddHelp } = require('./commands/add');
const { listTasks, showListHelp } = require('./commands/list');
const { completeTask, showCompleteHelp } = require('./commands/complete');
const { deleteTask, showDeleteHelp } = require('./commands/delete');
const { showHelp } = require('./commands/help');

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(`
CLI Task Manager

Usage: node src/index.js <command> [arguments]

Available commands:
  add        Add a new task
  list       List all tasks
  complete   Mark a task as complete
  delete     Delete a task
  edit       Edit a task description
  search     Search for tasks by keyword
  help       Show detailed help for all commands

Examples:
  node src/index.js add Buy groceries
  node src/index.js list
  node src/index.js complete 1
  node src/index.js delete 2

For more information, run: node src/index.js help
Or use --help with any command: node src/index.js add --help
`);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'add': {
        if (args[1] === '--help') {
          showAddHelp();
          break;
        }
        const description = args.slice(1).join(' ');
        const task = addTask(description);
        console.log(`Task added successfully! [ID: ${task.id}] ${task.description}`);
        break;
      }

      case 'list': {
        if (args[1] === '--help') {
          showListHelp();
          break;
        }
        const tasks = listTasks();
        if (tasks.length === 0) {
          console.log('No tasks found');
        } else {
          tasks.forEach(task => {
            const status = task.completed ? '[✓]' : '[ ]';
            console.log(`${status} [ID: ${task.id}] ${task.description}`);
          });
        }
        break;
      }

      case 'complete': {
        if (args[1] === '--help') {
          showCompleteHelp();
          break;
        }
        const taskId = args[1];
        if (!taskId) {
          console.error('Error: Task ID is required');
          process.exit(1);
        }
        const result = completeTask(taskId);
        if (result.success) {
          console.log(`Task ${result.taskId} marked as complete`);
        } else {
          if (result.alreadyComplete) {
            console.log(result.error);
          } else {
            console.error(`Error: ${result.error}`);
            process.exit(1);
          }
        }
        break;
      }

      case 'delete': {
        if (args[1] === '--help') {
          showDeleteHelp();
          break;
        }
        const taskId = args[1];
        if (!taskId) {
          console.error('Error: Task ID is required');
          process.exit(1);
        }
        const result = deleteTask(taskId);
        if (result.success) {
          console.log(`Task ${result.taskId} deleted successfully`);
        } else {
          console.error(`Error: ${result.error}`);
          process.exit(1);
        }
        break;
      }

      case 'help': {
        showHelp();
        break;
      }

      default:
        console.error(`Error: Unknown command "${command}"`);
        console.error('Available commands: add, list, complete, delete, help');
        process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
