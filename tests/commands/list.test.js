const { listTasks } = require('../../src/commands/list');
const { loadTasks } = require('../../src/storage/storage');

// Mock the storage module
jest.mock('../../src/storage/storage');

describe('List Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listTasks', () => {
    test('should return empty array when no tasks exist', () => {
      loadTasks.mockReturnValue([]);

      const tasks = listTasks();

      expect(tasks).toEqual([]);
      expect(loadTasks).toHaveBeenCalled();
    });

    test('should return all tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: true },
        { id: 3, description: 'Task 3', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks).toEqual(mockTasks);
      expect(tasks).toHaveLength(3);
    });

    test('should include both completed and incomplete tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Incomplete task', completed: false },
        { id: 2, description: 'Complete task', completed: true }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks.some(t => t.completed)).toBe(true);
      expect(tasks.some(t => !t.completed)).toBe(true);
    });

    test('should return tasks with all properties', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks[0]).toHaveProperty('id');
      expect(tasks[0]).toHaveProperty('description');
      expect(tasks[0]).toHaveProperty('completed');
    });

    test('should call loadTasks from storage', () => {
      loadTasks.mockReturnValue([]);

      listTasks();

      expect(loadTasks).toHaveBeenCalledTimes(1);
    });

    test('should return tasks in the order they are stored', () => {
      const mockTasks = [
        { id: 3, description: 'Third', completed: false },
        { id: 1, description: 'First', completed: false },
        { id: 2, description: 'Second', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks[0].id).toBe(3);
      expect(tasks[1].id).toBe(1);
      expect(tasks[2].id).toBe(2);
    });

    test('should handle tasks with special characters', () => {
      const mockTasks = [
        { id: 1, description: 'Task with "quotes" & special chars', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks[0].description).toBe('Task with "quotes" & special chars');
    });

    test('should handle tasks with long descriptions', () => {
      const longDescription = 'A'.repeat(500);
      const mockTasks = [
        { id: 1, description: longDescription, completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks[0].description).toBe(longDescription);
    });

    test('should handle single task', () => {
      const mockTasks = [
        { id: 1, description: 'Only task', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks).toHaveLength(1);
      expect(tasks[0].description).toBe('Only task');
    });

    test('should handle many tasks', () => {
      const mockTasks = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        description: `Task ${i + 1}`,
        completed: i % 2 === 0
      }));
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks).toHaveLength(100);
    });

    test('should not modify the returned tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      // listTasks should return the array as-is
      expect(tasks).toBe(mockTasks);
    });

    test('should handle tasks with unicode characters', () => {
      const mockTasks = [
        { id: 1, description: 'Task with émojis 😀', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const tasks = listTasks();

      expect(tasks[0].description).toBe('Task with émojis 😀');
    });
  });
});
