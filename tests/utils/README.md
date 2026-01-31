# Test Utilities

This directory contains utility scripts for testing the CLI Task Manager.

## generateTestData.js

A script to generate realistic test data for performance and stress testing.

### Features

- Generates realistic task descriptions using predefined templates
- Random completion status (50/50 split between complete/incomplete)
- Fast generation (1000+ tasks in < 5 seconds)
- Configurable output location
- Statistical reporting

### Usage

#### Command Line

```bash
# Generate 100 tasks to default location (tasks.json)
node tests/utils/generateTestData.js 100

# Generate 1000 tasks for performance testing
node tests/utils/generateTestData.js 1000

# Generate 50 tasks to custom file
node tests/utils/generateTestData.js 50 custom-tasks.json

# Generate tasks to specific path
node tests/utils/generateTestData.js 500 C:/path/to/tasks.json

# Show help
node tests/utils/generateTestData.js --help
```

#### Programmatic Usage

```javascript
const { generateTestData, generateTasks } = require('./tests/utils/generateTestData');

// Generate and save 100 tasks to default location
generateTestData(100);

// Generate and save to custom location
generateTestData(500, 'my-tasks.json');

// Generate tasks without saving (for testing)
const tasks = generateTasks(100);
console.log(tasks); // Array of 100 task objects
```

### Output Format

The script generates tasks in the standard format:

```json
[
  {
    "id": 1738362000000,
    "description": "Review pull request #123",
    "completed": false
  },
  {
    "id": 1738362000001,
    "description": "Implement feature: authentication system",
    "completed": true
  },
  ...
]
```

### Performance

- **100 tasks**: ~2-5ms
- **1,000 tasks**: ~10-20ms
- **10,000 tasks**: ~100-200ms

Generation time is well under 1 second even for large datasets.

### Use Cases

1. **Performance Testing**
   ```bash
   # Generate 1000 tasks to test list performance
   node tests/utils/generateTestData.js 1000
   node src/index.js list
   ```

2. **Stress Testing**
   ```bash
   # Generate 10,000 tasks to test limits
   node tests/utils/generateTestData.js 10000
   node src/index.js list
   ```

3. **Testing Filters and Search**
   ```bash
   # Generate diverse tasks
   node tests/utils/generateTestData.js 500
   node src/index.js search "review"
   node src/index.js list --complete
   ```

4. **Unit Test Fixtures**
   ```javascript
   const { generateTasks } = require('./tests/utils/generateTestData');

   test('should handle many tasks', () => {
     const tasks = generateTasks(100);
     expect(tasks).toHaveLength(100);
   });
   ```

### Task Description Templates

The generator uses realistic templates including:

- Code review tasks: "Review pull request #123"
- Development tasks: "Implement feature: authentication system"
- Bug fixes: "Fix bug in payment gateway"
- Documentation: "Update documentation for user module"
- Testing: "Write unit tests for API endpoints"
- DevOps: "Deploy to production environment"
- Meetings: "Meeting with product team"
- Research: "Research new frontend framework"

### Statistics Output

After generation, the script displays:

```
Successfully generated 1000 tasks
Output file: C:\Megz\Projects\ai-sdlc-lab\tasks.json

Generation Statistics:
- Total tasks: 1000
- Completed: 487 (49%)
- Incomplete: 513 (51%)
- Generation time: 15ms

Test data generation completed successfully!
```

### Error Handling

The script validates inputs and handles errors gracefully:

- Invalid count (non-integer, negative): Displays error and exits
- File write errors: Reports error with details
- Large datasets (>10,000): Displays warning

### Integration with npm

You can add a script to package.json:

```json
{
  "scripts": {
    "generate-test-data": "node tests/utils/generateTestData.js"
  }
}
```

Then use:

```bash
npm run generate-test-data 1000
```

### Notes

- Generated task IDs are based on timestamps (Date.now() + offset)
- Completion status is randomly assigned (50/50 distribution)
- Output file is formatted with 2-space indentation for readability
- Default output location is the project root `tasks.json` file

### Future Enhancements

Potential improvements for future versions:

- Custom completion percentage
- Task priority levels (when feature is implemented)
- Due dates (when feature is implemented)
- Categories/tags (when feature is implemented)
- Sequential vs random ID generation
- Custom description templates via config file
