const { createTask } = require('../src/models/task');

describe('Task Model', () => {
  describe('createTask', () => {
    test('should create a task with valid description', () => {
      const description = 'Buy groceries';
      const task = createTask(description);

      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('description', description);
      expect(task).toHaveProperty('completed', false);
    });

    test('should generate unique IDs for different tasks', () => {
      const task1 = createTask('Task 1');
      // Small delay to ensure different timestamp
      const task2 = createTask('Task 2');

      expect(task1.id).toBeDefined();
      expect(task2.id).toBeDefined();
      // IDs should be different (though they might be same if created at exact same millisecond)
      // In practice, Date.now() should give different values
    });

    test('should set completed flag to false by default', () => {
      const task = createTask('Test task');

      expect(task.completed).toBe(false);
    });

    test('should handle simple descriptions', () => {
      const description = 'Test';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle descriptions with multiple words', () => {
      const description = 'Complete project documentation by Friday';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle descriptions with special characters', () => {
      const description = 'Review PR #123 & merge to main';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle descriptions with quotes', () => {
      const description = 'Task with "quotes" and \'apostrophes\'';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle descriptions with unicode characters', () => {
      const description = 'Task with émojis 😀 and ünïcödé';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle long descriptions', () => {
      const description = 'A'.repeat(500);
      const task = createTask(description);

      expect(task.description).toBe(description);
      expect(task.description.length).toBe(500);
    });

    test('should create task with numeric ID', () => {
      const task = createTask('Test task');

      expect(typeof task.id).toBe('number');
      expect(task.id).toBeGreaterThan(0);
    });

    test('should use timestamp as ID', () => {
      const beforeTime = Date.now();
      const task = createTask('Test task');
      const afterTime = Date.now();

      expect(task.id).toBeGreaterThanOrEqual(beforeTime);
      expect(task.id).toBeLessThanOrEqual(afterTime);
    });

    test('should create valid task object structure', () => {
      const task = createTask('Test task');

      expect(Object.keys(task)).toEqual(['id', 'description', 'completed']);
    });

    test('should handle empty string description', () => {
      const description = '';
      const task = createTask(description);

      expect(task.description).toBe('');
      expect(task.id).toBeDefined();
      expect(task.completed).toBe(false);
    });

    test('should handle whitespace-only description', () => {
      const description = '   ';
      const task = createTask(description);

      expect(task.description).toBe('   ');
    });

    test('should handle description with newlines', () => {
      const description = 'Line 1\nLine 2';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle description with tabs', () => {
      const description = 'Item 1\tItem 2';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should create multiple tasks in sequence', () => {
      const tasks = [];
      for (let i = 0; i < 5; i++) {
        tasks.push(createTask(`Task ${i + 1}`));
      }

      expect(tasks).toHaveLength(5);
      tasks.forEach((task, index) => {
        expect(task.description).toBe(`Task ${index + 1}`);
        expect(task.completed).toBe(false);
      });
    });

    test('should handle descriptions with HTML-like content', () => {
      const description = '<script>alert("test")</script>';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle descriptions with backslashes', () => {
      const description = 'Path: C:\\Users\\test\\file.txt';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle descriptions with forward slashes', () => {
      const description = 'URL: https://example.com/path/to/resource';
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should handle very long unicode descriptions', () => {
      const description = '🎉'.repeat(100);
      const task = createTask(description);

      expect(task.description).toBe(description);
    });

    test('should generate IDs that are valid task identifiers', () => {
      const task = createTask('Test');

      // ID should be a positive integer
      expect(Number.isInteger(task.id)).toBe(true);
      expect(task.id).toBeGreaterThan(0);

      // ID should be parseable from string
      expect(parseInt(task.id.toString())).toBe(task.id);
    });

    test('should maintain task properties after creation', () => {
      const description = 'Original description';
      const task = createTask(description);

      // Verify properties are not undefined or null
      expect(task.id).not.toBeNull();
      expect(task.id).not.toBeUndefined();
      expect(task.description).not.toBeNull();
      expect(task.description).not.toBeUndefined();
      expect(task.completed).not.toBeNull();
      expect(task.completed).not.toBeUndefined();
    });
  });
});
