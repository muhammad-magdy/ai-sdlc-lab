const { addTask } = require('./commands/add');
const { listTasks } = require('./commands/list');
const { completeTask } = require('./commands/complete');
const { deleteTask } = require('./commands/delete');

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'add': {
        const description = args.slice(1).join(' ');
        const task = addTask(description);
        console.log(`Task added successfully! [ID: ${task.id}] ${task.description}`);
        break;
      }

      case 'list': {
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

      default:
        console.error(`Error: Unknown command "${command}"`);
        console.error('Available commands: add, list, complete, delete');
        process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
