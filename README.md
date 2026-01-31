# AI SDLC Lab

An experimental project demonstrating **AI-driven software development** using multi-agent collaboration. AI agents work together to execute complete sprint workflows.

## Project Overview

This repository contains a **CLI Task Manager** application developed entirely through automated sprint workflows, where AI agents (Project Manager, Scrum Master, Developer, QA Tester) collaborate to plan, build, test, and review software.

## CLI Task Manager

A Node.js command-line task management application with JSON persistence.

### Features

**Core Operations:**
- Add tasks with unique IDs
- List all tasks with completion status
- Mark tasks as complete
- Delete tasks
- Edit task descriptions
- Search tasks by keyword
- Filter tasks by completion status

**Additional Features:**
- Comprehensive help system
- JSON persistence (auto-saves to `tasks.json`)
- Automated testing with Jest (98 tests)
- Performance optimized (handles 1000+ tasks)

### Installation

**Prerequisites:**
- Node.js version 14.0.0 or higher
- npm (comes with Node.js)

**Setup:**
```bash
# Clone the repository
git clone https://github.com/muhammad-magdy/ai-sdlc-lab.git
cd ai-sdlc-lab

# Install dependencies
npm install

# Verify installation
node src/index.js help
```

### Usage

```bash
# Add a new task
node src/index.js add "Task description"

# List all tasks
node src/index.js list

# Filter tasks
node src/index.js list --complete
node src/index.js list --incomplete

# Mark task as complete
node src/index.js complete <task-id>

# Edit a task
node src/index.js edit <task-id> "New description"

# Search tasks
node src/index.js search "keyword"

# Delete a task
node src/index.js delete <task-id>

# Get help
node src/index.js help
node src/index.js <command> --help
```

### Quick Examples

```bash
# Daily workflow
node src/index.js add "Review morning emails"
node src/index.js add "Attend team standup"
node src/index.js list
node src/index.js complete 1
node src/index.js search "email"
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Development Process

This project uses an **AI-driven SDLC workflow** with specialized agents:

### The Agents

- **Project Manager** - Defines requirements and approves sprints
- **Scrum Master** - Plans sprints and facilitates retrospectives
- **Developer** - Implements features on feature branches
- **QA Tester** - Tests functionality and reports quality metrics

### Sprint Workflow

Each sprint follows this workflow:

1. **Planning** - Scrum Master creates sprint backlog with tasks
2. **Development** - Developer implements on feature branch
3. **Testing** - QA Tester validates with automated + manual tests
4. **Review** - Product Manager reviews and approves/rejects
5. **Retrospective** - Team identifies improvements

All artifacts are generated automatically:
- `planning/` - Requirements, sprint plans, and reviews
- `retrospectives/` - Sprint retrospectives
- `test-reports/` - QA test results

## Project Structure

```
├── planning/                 # Sprint plans, requirements, reviews
├── retrospectives/           # Sprint retrospectives
├── test-reports/            # QA test results
├── src/                     # CLI Task Manager source code
│   ├── commands/            # Command handlers (add, list, edit, etc.)
│   ├── models/              # Data models
│   ├── storage/             # JSON persistence
│   └── index.js             # CLI entry point
├── tests/                   # Jest test suites
│   ├── commands/            # Command tests
│   ├── utils/               # Test utilities
│   └── setup.js             # Test configuration
├── package.json             # Project configuration
└── jest.config.js           # Jest configuration
```

## Sprint History

### Sprint 1 - APPROVED ✅
**Goal:** Core CRUD Operations

**Deliverables:**
- Basic task operations (add, list, complete, delete)
- JSON persistence
- Error handling
- Project structure

**Results:**
- 19/19 tasks completed
- 1 minor bug found (BUG-001)
- 100% velocity

### Sprint 2 - APPROVED WITH ISSUES ✅
**Goal:** Enhanced UX and Quality

**Deliverables:**
- Help system (help command + --help flags)
- Edit task functionality
- Search by keyword
- List filters (--complete/--incomplete)
- BUG-001 fix
- Comprehensive documentation
- Jest testing framework (98 tests)

**Results:**
- 22/22 tasks completed
- 0 bugs found
- Test coverage: 61.79% (target: 70%)
- Performance: <100ms with 1000+ tasks
- 100% velocity

## Quality Metrics

**Test Coverage:**
- Storage module: 90%+
- Task model: 95%+
- Commands: 70%+
- Overall: 61.79%

**Performance:**
- All operations: <100ms
- Tested with: 1000+ tasks
- Memory efficient: JSON-based storage

## Key Learnings

This project demonstrates:
- Multi-agent collaboration in software development
- AI-driven code implementation
- Feature branch workflow
- Automated testing practices
- Iterative improvement through retrospectives
- Quality-focused development process

## Data Storage

Tasks are stored in `tasks.json` with the following format:
```json
[
  {
    "id": 1769873205641,
    "description": "Buy groceries",
    "completed": false
  },
  {
    "id": 1769873206789,
    "description": "Complete project documentation",
    "completed": true
  }
]
```

**Data Persistence:**
- File created automatically on first use
- All changes saved immediately
- Tasks persist between application restarts

## Troubleshooting

**"Command not found" or "node: not found"**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal

**"Cannot find module" errors**
- Navigate to project directory: `cd ai-sdlc-lab`
- Run `npm install`

**"Error: Task not found"**
- Run `node src/index.js list` to see valid task IDs

**Corrupted JSON file**
- Application handles corrupted JSON by starting fresh
- Backup and delete `tasks.json` if issues persist

**Tip:** Create a shell alias for faster access:
```bash
# Add to ~/.bashrc or ~/.bash_profile
alias task="node /path/to/ai-sdlc-lab/src/index.js"

# Then use simply:
task add "Buy milk"
task list
task complete 1
```

## Tech Stack

- **Runtime:** Node.js 14+
- **Testing:** Jest 30.2.0
- **Agents:** Claude Code CLI
- **Version Control:** Git with feature branch workflow

## Contributing

This is an experimental project demonstrating AI-driven development. The development process itself is the primary focus, showcasing how AI agents can collaborate to deliver production-ready software.

## License

ISC
