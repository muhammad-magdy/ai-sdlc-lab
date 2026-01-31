const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, '../../tasks.json');

function loadTasks() {
  try {
    if (!fs.existsSync(TASKS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading tasks:', error.message);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving tasks:', error.message);
    throw error;
  }
}

module.exports = {
  loadTasks,
  saveTasks
};
