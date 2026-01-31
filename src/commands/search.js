const { loadTasks } = require('../storage/storage');

function searchTasks(keyword) {
  if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
    return { success: false, error: 'Search keyword is required and cannot be empty' };
  }

  const tasks = loadTasks();
  const searchTerm = keyword.trim().toLowerCase();
  const matchingTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(searchTerm)
  );

  return { success: true, tasks: matchingTasks, keyword: searchTerm };
}

function showSearchHelp() {
  console.log(`
SEARCH COMMAND

USAGE:
  node src/index.js search <keyword>

DESCRIPTION:
  Search for tasks containing the given keyword in their description.
  Search is case-insensitive and matches partial words.

ARGUMENTS:
  <keyword>    The keyword to search for (required, cannot be empty)

EXAMPLES:
  node src/index.js search project
  node src/index.js search meeting
  node src/index.js search "pull request"

OUTPUT:
  Found 2 task(s) matching "project":
  [ ] [ID: 1] Complete project documentation
  [✓] [ID: 5] Review project requirements

NOTES:
  - Search is case-insensitive
  - Partial word matches are included
  - Searches in task descriptions only
  - Returns both completed and incomplete tasks
  - Use quotes for multi-word search terms
  - Shows message if no matches found
`);
}

module.exports = {
  searchTasks,
  showSearchHelp
};
