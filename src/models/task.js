function createTask(description) {
  return {
    id: Date.now(),
    description: description,
    completed: false
  };
}

module.exports = {
  createTask
};
