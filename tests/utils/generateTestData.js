const fs = require('fs');
const path = require('path');

// Sample task descriptions for realistic test data
const taskTemplates = [
  'Review pull request #',
  'Update documentation for ',
  'Fix bug in ',
  'Implement feature: ',
  'Refactor ',
  'Write unit tests for ',
  'Deploy to ',
  'Meeting with ',
  'Research ',
  'Optimize performance of ',
  'Add validation to ',
  'Update dependencies for ',
  'Create mockup for ',
  'Design database schema for ',
  'Configure CI/CD for ',
  'Write API documentation for ',
  'Code review: ',
  'Debug issue with ',
  'Migrate data from ',
  'Set up monitoring for ',
  'Create dashboard for ',
  'Implement authentication for ',
  'Add logging to ',
  'Improve error handling in ',
  'Write integration tests for '
];

const modules = [
  'user module',
  'authentication system',
  'payment gateway',
  'admin panel',
  'dashboard',
  'API endpoints',
  'database layer',
  'frontend components',
  'backend services',
  'notification system',
  'reporting module',
  'search functionality',
  'file upload feature',
  'email service',
  'cache layer',
  'session management',
  'logging system',
  'configuration management',
  'deployment pipeline',
  'testing framework'
];

const numbers = ['123', '456', '789', '101', '202', '303'];

/**
 * Generate a realistic task description
 * @returns {string} A random task description
 */
function generateTaskDescription() {
  const template = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
  const module = modules[Math.floor(Math.random() * modules.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];

  if (template.includes('#')) {
    return template + number;
  } else {
    return template + module;
  }
}

/**
 * Generate test tasks with realistic data
 * @param {number} count - Number of tasks to generate
 * @returns {Array} Array of task objects
 */
function generateTasks(count) {
  const tasks = [];
  const baseId = Date.now();

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: baseId + i,
      description: generateTaskDescription(),
      completed: Math.random() > 0.5 // Random 50/50 completed/incomplete
    });
  }

  return tasks;
}

/**
 * Save generated tasks to a JSON file
 * @param {Array} tasks - Array of task objects
 * @param {string} outputPath - Path to output file
 */
function saveTasksToFile(tasks, outputPath) {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(tasks, null, 2), 'utf8');
    console.log(`Successfully generated ${tasks.length} tasks`);
    console.log(`Output file: ${outputPath}`);
  } catch (error) {
    console.error('Error writing file:', error.message);
    throw error;
  }
}

/**
 * Main function to generate and save test data
 * @param {number} count - Number of tasks to generate
 * @param {string} outputFile - Optional output file path
 */
function generateTestData(count = 100, outputFile = null) {
  const startTime = Date.now();

  // Validate input
  if (!Number.isInteger(count) || count < 1) {
    throw new Error('Count must be a positive integer');
  }

  if (count > 10000) {
    console.warn('Warning: Generating more than 10,000 tasks may take a while...');
  }

  // Generate tasks
  console.log(`Generating ${count} test tasks...`);
  const tasks = generateTasks(count);

  // Determine output path
  const defaultPath = path.join(__dirname, '../../tasks.json');
  const outputPath = outputFile || defaultPath;

  // Save to file
  saveTasksToFile(tasks, outputPath);

  // Report stats
  const completedCount = tasks.filter(t => t.completed).length;
  const incompleteCount = tasks.length - completedCount;
  const elapsedTime = Date.now() - startTime;

  console.log('\nGeneration Statistics:');
  console.log(`- Total tasks: ${tasks.length}`);
  console.log(`- Completed: ${completedCount} (${Math.round(completedCount / tasks.length * 100)}%)`);
  console.log(`- Incomplete: ${incompleteCount} (${Math.round(incompleteCount / tasks.length * 100)}%)`);
  console.log(`- Generation time: ${elapsedTime}ms`);

  return tasks;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Test Data Generator for CLI Task Manager

USAGE:
  node generateTestData.js <count> [output-file]

ARGUMENTS:
  <count>          Number of tasks to generate (required, 1-10000)
  [output-file]    Output file path (optional, default: ../../tasks.json)

EXAMPLES:
  # Generate 100 tasks to default location
  node generateTestData.js 100

  # Generate 1000 tasks to custom file
  node generateTestData.js 1000 custom-tasks.json

  # Generate 50 tasks to specific path
  node generateTestData.js 50 C:/path/to/tasks.json

OPTIONS:
  --help, -h      Show this help message
`);
    process.exit(0);
  }

  const count = parseInt(args[0]);
  const outputFile = args[1] || null;

  if (isNaN(count)) {
    console.error('Error: Count must be a valid number');
    process.exit(1);
  }

  try {
    generateTestData(count, outputFile);
    console.log('\nTest data generation completed successfully!');
  } catch (error) {
    console.error('Error generating test data:', error.message);
    process.exit(1);
  }
}

module.exports = {
  generateTasks,
  generateTestData,
  generateTaskDescription
};
