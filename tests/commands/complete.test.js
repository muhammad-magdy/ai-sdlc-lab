const { completeTask } = require('../../src/commands/complete');
const { loadTasks, saveTasks } = require('../../src/storage/storage');

// Mock the storage module
jest.mock('../../src/storage/storage');

describe('Complete Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('completeTask', () => {
    test('should mark task as complete when task exists', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = completeTask('1');

      expect(result.success).toBe(true);
      expect(result.taskId).toBe('1');
      expect(mockTasks[0].completed).toBe(true);
      expect(saveTasks).toHaveBeenCalledWith(mockTasks);
    });

    test('should return error when task does not exist', () => {
      loadTasks.mockReturnValue([]);

      const result = completeTask('999');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Task with ID 999 not found');
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should handle string task IDs', () => {
      const mockTasks = [
        { id: 5, description: 'Task 5', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = completeTask('5');

      expect(result.success).toBe(true);
      expect(mockTasks[0].completed).toBe(true);
    });

    test('should handle numeric task IDs', () => {
      const mockTasks = [
        { id: 5, description: 'Task 5', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = completeTask(5);

      expect(result.success).toBe(true);
      expect(mockTasks[0].completed).toBe(true);
    });

    test('should return error when task is already complete', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: true }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = completeTask('1');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Task 1 is already complete');
      expect(result.alreadyComplete).toBe(true);
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should not modify other tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false },
        { id: 3, description: 'Task 3', completed: true }
      ];
      loadTasks.mockReturnValue(mockTasks);

      completeTask('1');

      expect(mockTasks[0].completed).toBe(true);
      expect(mockTasks[1].completed).toBe(false);
      expect(mockTasks[2].completed).toBe(true);
    });

    test('should save tasks after marking complete', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      completeTask('1');

      expect(saveTasks).toHaveBeenCalledTimes(1);
      expect(saveTasks).toHaveBeenCalledWith(mockTasks);
    });

    test('should handle task with large ID', () => {
      const largeId = 999999999;
      const mockTasks = [
        { id: largeId, description: 'Task with large ID', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = completeTask(largeId.toString());

      expect(result.success).toBe(true);
      expect(mockTasks[0].completed).toBe(true);
    });

    test('should load tasks before completing', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      completeTask('1');

      expect(loadTasks).toHaveBeenCalledTimes(1);
    });

    test('should return error for non-existent task in list with other tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = completeTask('5');

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });

    test('should handle invalid task ID format gracefully', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = completeTask('abc');

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });

    test('should preserve task description when completing', () => {
      const mockTasks = [
        { id: 1, description: 'Important task', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      completeTask('1');

      expect(mockTasks[0].description).toBe('Important task');
    });

    test('should preserve task ID when completing', () => {
      const mockTasks = [
        { id: 42, description: 'Task', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      completeTask('42');

      expect(mockTasks[0].id).toBe(42);
    });

    test('should be idempotent for already completed tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: true }
      ];
      loadTasks.mockReturnValue(mockTasks);

      // Try to complete already completed task
      const result = completeTask('1');

      expect(result.success).toBe(false);
      expect(result.alreadyComplete).toBe(true);
      expect(mockTasks[0].completed).toBe(true);
      expect(saveTasks).not.toHaveBeenCalled();
    });
  });
});
