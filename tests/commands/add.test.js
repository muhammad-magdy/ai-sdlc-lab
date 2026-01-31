const { addTask } = require('../../src/commands/add');
const { loadTasks, saveTasks } = require('../../src/storage/storage');

// Mock the storage module
jest.mock('../../src/storage/storage');

// Mock the task model
jest.mock('../../src/models/task', () => ({
  createTask: jest.fn((description) => ({
    id: 12345,
    description,
    completed: false
  }))
}));

describe('Add Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loadTasks.mockReturnValue([]);
  });

  describe('addTask', () => {
    test('should add a task with valid description', () => {
      const description = 'Buy groceries';
      loadTasks.mockReturnValue([]);

      const task = addTask(description);

      expect(task).toEqual({
        id: 12345,
        description: 'Buy groceries',
        completed: false
      });
      expect(saveTasks).toHaveBeenCalledWith([task]);
    });

    test('should throw error when description is empty', () => {
      expect(() => addTask('')).toThrow('Task description is required and cannot be empty');
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should throw error when description is undefined', () => {
      expect(() => addTask(undefined)).toThrow('Task description is required and cannot be empty');
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should throw error when description is null', () => {
      expect(() => addTask(null)).toThrow('Task description is required and cannot be empty');
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should throw error when description is only whitespace', () => {
      expect(() => addTask('   ')).toThrow('Task description is required and cannot be empty');
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should throw error when description is not a string', () => {
      expect(() => addTask(123)).toThrow('Task description is required and cannot be empty');
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should trim whitespace from description', () => {
      const description = '  Buy groceries  ';

      const task = addTask(description);

      expect(task.description).toBe('Buy groceries');
    });

    test('should add task to existing list of tasks', () => {
      const existingTasks = [
        { id: 1, description: 'Existing task', completed: false }
      ];
      loadTasks.mockReturnValue([...existingTasks]);

      const task = addTask('New task');

      expect(saveTasks).toHaveBeenCalled();
      const savedTasks = saveTasks.mock.calls[0][0];
      expect(savedTasks).toHaveLength(2);
      expect(savedTasks[0]).toEqual(existingTasks[0]);
      expect(savedTasks[1]).toEqual(task);
    });

    test('should handle descriptions with special characters', () => {
      const description = 'Review PR #123 & merge';

      const task = addTask(description);

      expect(task.description).toBe(description);
      expect(saveTasks).toHaveBeenCalled();
    });

    test('should handle long descriptions', () => {
      const description = 'A'.repeat(500);

      const task = addTask(description);

      expect(task.description).toBe(description);
      expect(saveTasks).toHaveBeenCalled();
    });

    test('should handle descriptions with quotes', () => {
      const description = 'Task with "quotes"';

      const task = addTask(description);

      expect(task.description).toBe(description);
    });

    test('should load existing tasks before adding new one', () => {
      addTask('New task');

      expect(loadTasks).toHaveBeenCalled();
    });

    test('should save tasks after adding new one', () => {
      addTask('New task');

      expect(saveTasks).toHaveBeenCalled();
    });

    test('should return the created task', () => {
      const task = addTask('Test task');

      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('completed');
    });

    test('should handle multiple tasks added in sequence', () => {
      const existingTasks = [];
      loadTasks.mockReturnValue(existingTasks);

      addTask('Task 1');

      loadTasks.mockReturnValue([{ id: 1, description: 'Task 1', completed: false }]);
      addTask('Task 2');

      expect(saveTasks).toHaveBeenCalledTimes(2);
    });

    test('should handle description with newlines', () => {
      const description = 'Line 1\nLine 2';

      expect(() => addTask(description)).not.toThrow();
    });

    test('should handle unicode characters in description', () => {
      const description = 'Task with émojis 😀';

      const task = addTask(description);

      expect(task.description).toBe(description);
    });
  });
});
