// Test setup file for Jest
// This file runs before all tests

// Set up test environment variables if needed
process.env.NODE_ENV = 'test';

// Global test utilities or mocks can be defined here
global.testHelpers = {
  // Helper function to create a mock task
  createMockTask: (id, description, completed = false) => ({
    id,
    description,
    completed
  }),

  // Helper to create multiple mock tasks
  createMockTasks: (count) => {
    const tasks = [];
    for (let i = 1; i <= count; i++) {
      tasks.push({
        id: i,
        description: `Test task ${i}`,
        completed: i % 2 === 0 // Alternate between complete and incomplete
      });
    }
    return tasks;
  }
};

// Console suppression for cleaner test output (optional)
// Uncomment if you want to suppress console logs during tests
// global.console = {
//   ...console,
//   log: jest.fn(),
//   error: jest.fn(),
//   warn: jest.fn(),
// };
