const { deleteTask } = require('../../src/commands/delete');
const { loadTasks, saveTasks } = require('../../src/storage/storage');

// Mock the storage module
jest.mock('../../src/storage/storage');

describe('Delete Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteTask', () => {
    test('should delete task when task exists', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask('1');

      expect(result.success).toBe(true);
      expect(result.taskId).toBe('1');
      expect(mockTasks).toHaveLength(1);
      expect(mockTasks[0].id).toBe(2);
      expect(saveTasks).toHaveBeenCalledWith(mockTasks);
    });

    test('should return error when task does not exist', () => {
      loadTasks.mockReturnValue([]);

      const result = deleteTask('999');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Task with ID 999 not found');
      expect(saveTasks).not.toHaveBeenCalled();
    });

    test('should handle string task IDs', () => {
      const mockTasks = [
        { id: 5, description: 'Task 5', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask('5');

      expect(result.success).toBe(true);
      expect(mockTasks).toHaveLength(0);
    });

    test('should handle numeric task IDs', () => {
      const mockTasks = [
        { id: 5, description: 'Task 5', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask(5);

      expect(result.success).toBe(true);
      expect(mockTasks).toHaveLength(0);
    });

    test('should delete completed tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Completed task', completed: true }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask('1');

      expect(result.success).toBe(true);
      expect(mockTasks).toHaveLength(0);
    });

    test('should delete incomplete tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Incomplete task', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask('1');

      expect(result.success).toBe(true);
      expect(mockTasks).toHaveLength(0);
    });

    test('should not modify other tasks when deleting one', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false },
        { id: 3, description: 'Task 3', completed: true }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('2');

      expect(mockTasks).toHaveLength(2);
      expect(mockTasks[0].id).toBe(1);
      expect(mockTasks[1].id).toBe(3);
    });

    test('should save tasks after deleting', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('1');

      expect(saveTasks).toHaveBeenCalledTimes(1);
    });

    test('should delete first task from list', () => {
      const mockTasks = [
        { id: 1, description: 'First', completed: false },
        { id: 2, description: 'Second', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('1');

      expect(mockTasks).toHaveLength(1);
      expect(mockTasks[0].description).toBe('Second');
    });

    test('should delete last task from list', () => {
      const mockTasks = [
        { id: 1, description: 'First', completed: false },
        { id: 2, description: 'Last', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('2');

      expect(mockTasks).toHaveLength(1);
      expect(mockTasks[0].description).toBe('First');
    });

    test('should delete middle task from list', () => {
      const mockTasks = [
        { id: 1, description: 'First', completed: false },
        { id: 2, description: 'Middle', completed: false },
        { id: 3, description: 'Last', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('2');

      expect(mockTasks).toHaveLength(2);
      expect(mockTasks[0].description).toBe('First');
      expect(mockTasks[1].description).toBe('Last');
    });

    test('should handle deleting only task in list', () => {
      const mockTasks = [
        { id: 1, description: 'Only task', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('1');

      expect(mockTasks).toHaveLength(0);
    });

    test('should load tasks before deleting', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('1');

      expect(loadTasks).toHaveBeenCalledTimes(1);
    });

    test('should return error for non-existent task in list with other tasks', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask('5');

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
      expect(mockTasks).toHaveLength(2);
    });

    test('should handle invalid task ID format gracefully', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask('abc');

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
      expect(mockTasks).toHaveLength(1);
    });

    test('should handle large task IDs', () => {
      const largeId = 999999999;
      const mockTasks = [
        { id: largeId, description: 'Task with large ID', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      const result = deleteTask(largeId.toString());

      expect(result.success).toBe(true);
      expect(mockTasks).toHaveLength(0);
    });

    test('should permanently remove task from array', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false }
      ];
      loadTasks.mockReturnValue(mockTasks);

      deleteTask('1');

      expect(mockTasks.find(t => t.id === 1)).toBeUndefined();
    });

    test('should handle sequential deletions', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false },
        { id: 3, description: 'Task 3', completed: false }
      ];

      loadTasks.mockReturnValue(mockTasks);
      deleteTask('1');

      loadTasks.mockReturnValue(mockTasks);
      deleteTask('2');

      expect(mockTasks).toHaveLength(1);
      expect(mockTasks[0].id).toBe(3);
    });
  });
});
