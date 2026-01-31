const fs = require('fs');
const path = require('path');
const { loadTasks, saveTasks } = require('../src/storage/storage');

// Mock the fs module
jest.mock('fs');

const TASKS_FILE = path.join(__dirname, '../tasks.json');

describe('Storage Module', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('loadTasks', () => {
    test('should return empty array when file does not exist', () => {
      fs.existsSync.mockReturnValue(false);

      const tasks = loadTasks();

      expect(tasks).toEqual([]);
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.readFileSync).not.toHaveBeenCalled();
    });

    test('should load tasks from existing file', () => {
      const mockTasks = [
        { id: 1, description: 'Test task 1', completed: false },
        { id: 2, description: 'Test task 2', completed: true }
      ];

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

      const tasks = loadTasks();

      expect(tasks).toEqual(mockTasks);
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalledWith(
        expect.stringContaining('tasks.json'),
        'utf8'
      );
    });

    test('should return empty array when file contains corrupted JSON', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue('{ invalid json }');

      // Mock console.error to suppress error output during test
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const tasks = loadTasks();

      expect(tasks).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading tasks:',
        expect.any(String)
      );

      consoleErrorSpy.mockRestore();
    });

    test('should return empty array when file is empty', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue('');

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const tasks = loadTasks();

      expect(tasks).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    test('should handle file read errors gracefully', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const tasks = loadTasks();

      expect(tasks).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading tasks:',
        'Permission denied'
      );

      consoleErrorSpy.mockRestore();
    });

    test('should load empty array from file with empty JSON array', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue('[]');

      const tasks = loadTasks();

      expect(tasks).toEqual([]);
    });

    test('should handle tasks with special characters in descriptions', () => {
      const mockTasks = [
        { id: 1, description: 'Task with "quotes" and \'apostrophes\'', completed: false },
        { id: 2, description: 'Task with <html> & special chars', completed: true }
      ];

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

      const tasks = loadTasks();

      expect(tasks).toEqual(mockTasks);
    });
  });

  describe('saveTasks', () => {
    test('should save tasks to file with proper formatting', () => {
      const mockTasks = [
        { id: 1, description: 'Test task 1', completed: false },
        { id: 2, description: 'Test task 2', completed: true }
      ];

      saveTasks(mockTasks);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('tasks.json'),
        JSON.stringify(mockTasks, null, 2),
        'utf8'
      );
    });

    test('should save empty array', () => {
      const mockTasks = [];

      saveTasks(mockTasks);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('tasks.json'),
        '[]',
        'utf8'
      );
    });

    test('should throw error when write operation fails', () => {
      const mockTasks = [{ id: 1, description: 'Test', completed: false }];
      const writeError = new Error('Disk full');

      fs.writeFileSync.mockImplementation(() => {
        throw writeError;
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => saveTasks(mockTasks)).toThrow('Disk full');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error saving tasks:',
        'Disk full'
      );

      consoleErrorSpy.mockRestore();
    });

    test('should handle saving tasks with special characters', () => {
      const mockTasks = [
        { id: 1, description: 'Task with "quotes" and newlines\n', completed: false }
      ];

      fs.writeFileSync.mockImplementation(() => {});

      saveTasks(mockTasks);

      expect(fs.writeFileSync).toHaveBeenCalled();
      const savedData = fs.writeFileSync.mock.calls[0][1];
      const parsedData = JSON.parse(savedData);
      expect(parsedData[0].description).toBe('Task with "quotes" and newlines\n');
    });

    test('should handle permission errors', () => {
      const mockTasks = [{ id: 1, description: 'Test', completed: false }];

      fs.writeFileSync.mockImplementation(() => {
        const error = new Error('EACCES: permission denied');
        error.code = 'EACCES';
        throw error;
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => saveTasks(mockTasks)).toThrow();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    test('should properly serialize complex task objects', () => {
      const mockTasks = [
        {
          id: 1,
          description: 'Complex task',
          completed: false
        },
        {
          id: 2,
          description: 'Another task',
          completed: true
        }
      ];

      fs.writeFileSync.mockImplementation(() => {});

      saveTasks(mockTasks);

      const savedData = fs.writeFileSync.mock.calls[0][1];
      const parsedData = JSON.parse(savedData);

      expect(parsedData).toEqual(mockTasks);
    });
  });

  describe('loadTasks and saveTasks integration', () => {
    test('should be able to save and load the same data', () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: true },
        { id: 3, description: 'Task 3', completed: false }
      ];

      fs.writeFileSync.mockImplementation(() => {});

      // Save tasks
      saveTasks(mockTasks);
      const savedData = fs.writeFileSync.mock.calls[0][1];

      // Mock load to return saved data
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(savedData);

      // Load tasks
      const loadedTasks = loadTasks();

      expect(loadedTasks).toEqual(mockTasks);
    });
  });
});
