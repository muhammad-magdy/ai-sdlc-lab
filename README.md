# AI SDLC Lab

An experimental project demonstrating **autonomous AI-driven software development** using multi-agent collaboration. AI agents work together to execute complete sprint workflows with zero manual intervention.

## Project Overview

This repository contains:
1. **CLI Task Manager** - A Node.js command-line task management application
2. **Automated Sprint System** - AI agents that autonomously plan, develop, test, and review sprints

## Automated Sprint System

### How It Works

Four specialized AI agents collaborate to execute complete SDLC workflows:

- **Project Manager** - Reviews requirements and approves sprints
- **Scrum Master** - Plans sprints and facilitates retrospectives
- **Developer** - Implements features and fixes bugs
- **QA Tester** - Tests functionality and reports issues

### Quick Start

```bash
# Run automated sprint workflow
npm run sprint

# View real-time progress dashboard
npm run dashboard
```

The dashboard provides live monitoring with:
- Current sprint and phase
- Progress bar (0-100%)
- Agent status (pending/running/complete)
- Real-time activity logs

### Sprint Workflow

1. **Planning** - Scrum Master creates sprint backlog
2. **Development** - Developer implements tasks
3. **Testing** - QA Tester validates features
4. **Review** - Product Manager approves/rejects
5. **Retrospective** - Team identifies improvements

All sprint artifacts are auto-generated in `planning/`, `test-reports/`, and `retrospectives/` folders.

## CLI Task Manager

A simple, efficient command-line interface application for managing your tasks directly from the terminal. The actual application being developed through the automated sprints.

### Features

- **Add Tasks**: Quickly create new tasks with descriptions
- **List Tasks**: View all your tasks with their completion status
- **Complete Tasks**: Mark tasks as done when finished
- **Delete Tasks**: Remove tasks you no longer need
- **Persistent Storage**: All tasks are saved locally in JSON format
- **Simple Commands**: Intuitive CLI commands for fast task management

### Installation

**Prerequisites:**
- Node.js version 14.0.0 or higher
- npm (comes with Node.js)

**Setup:**
```bash
# Clone the repository
git clone <repository-url>
cd ai-sdlc-lab

# Verify Node.js installation
node --version

# Ready to use! No additional dependencies required.
```

### Usage Guide

All commands follow this format:
```bash
node src/index.js <command> [arguments]
```

#### Add a Task

Add a new task to your task list with a description.

**Syntax:**
```bash
node src/index.js add <task description>
```

**Examples:**
```bash
# Add a simple task
node src/index.js add Buy groceries

# Add a task with multiple words
node src/index.js add Complete project documentation by Friday

# Add a task with special characters
node src/index.js add Review PR #123 and merge
```

**Output:**
```
Task added successfully! [ID: 1] Buy groceries
```

**Notes:**
- Task description is required (cannot be empty)
- Each task receives a unique ID automatically
- New tasks are marked as incomplete by default

#### List All Tasks

View all your tasks with their IDs, descriptions, and completion status.

**Syntax:**
```bash
node src/index.js list
```

**Example:**
```bash
node src/index.js list
```

**Output:**
```
[ ] [ID: 1] Buy groceries
[✓] [ID: 2] Complete project documentation
[ ] [ID: 3] Review PR #123 and merge
```

**Status Indicators:**
- `[ ]` - Incomplete task
- `[✓]` - Completed task

**Notes:**
- If you have no tasks, you'll see: "No tasks found"
- Both complete and incomplete tasks are shown

#### Complete a Task

Mark a task as complete using its ID.

**Syntax:**
```bash
node src/index.js complete <task-id>
```

**Examples:**
```bash
# Mark task 1 as complete
node src/index.js complete 1

# Mark task 5 as complete
node src/index.js complete 5
```

**Output:**
```
Task 1 marked as complete
```

**Error Cases:**
```bash
# Missing task ID
node src/index.js complete
# Output: Error: Task ID is required

# Invalid task ID
node src/index.js complete 999
# Output: Error: Task not found
```

**Notes:**
- Task ID must exist in your task list
- Completed tasks remain in your list until deleted

#### Delete a Task

Permanently remove a task from your list using its ID.

**Syntax:**
```bash
node src/index.js delete <task-id>
```

**Examples:**
```bash
# Delete task 1
node src/index.js delete 1

# Delete task 3
node src/index.js delete 3
```

**Output:**
```
Task 1 deleted successfully
```

**Error Cases:**
```bash
# Missing task ID
node src/index.js delete
# Output: Error: Task ID is required

# Invalid task ID
node src/index.js delete 999
# Output: Error: Task not found
```

**Notes:**
- Deletion is permanent and cannot be undone
- Task IDs are not reused after deletion

### Common Workflows

#### Daily Task Management
```bash
# Start your day - add tasks
node src/index.js add Review morning emails
node src/index.js add Attend team standup
node src/index.js add Work on feature branch

# Check your tasks
node src/index.js list

# Complete tasks as you finish them
node src/index.js complete 2

# End of day - check what's left
node src/index.js list

# Clean up completed tasks
node src/index.js delete 2
```

#### Project Task Tracking
```bash
# Add project tasks
node src/index.js add Write unit tests for auth module
node src/index.js add Update API documentation
node src/index.js add Review security audit findings

# View all project tasks
node src/index.js list

# Mark completed work
node src/index.js complete 1
node src/index.js complete 2

# Review progress
node src/index.js list
```

### Data Storage

**Storage Location:**
```
C:\Megz\Projects\ai-sdlc-lab\tasks.json
```

**File Format:**
```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "completed": false
  },
  {
    "id": 2,
    "description": "Complete project documentation",
    "completed": true
  }
]
```

**Data Persistence:**
- The file is created automatically on first use if it doesn't exist
- All changes (add, complete, delete) are saved immediately
- Tasks persist between application restarts
- Manual editing of `tasks.json` is possible but not recommended

### Troubleshooting

**"Command not found" or "node: not found"**
- **Problem:** Node.js is not installed or not in your PATH
- **Solution:** Install Node.js from [nodejs.org](https://nodejs.org/) and restart your terminal

**"Cannot find module" errors**
- **Problem:** You're not running the command from the correct directory
- **Solution:** Navigate to the project directory: `cd C:\Megz\Projects\ai-sdlc-lab`

**"Error: Task not found"**
- **Problem:** The task ID you provided doesn't exist
- **Solution:** Run `node src/index.js list` to see all valid task IDs

**Tasks disappear after restart**
- **Problem:** File permissions or path issues preventing data from being saved
- **Solution:** Check that you have write permissions in the project directory and verify `tasks.json` exists

**Corrupted JSON file**
- **Problem:** The `tasks.json` file has invalid JSON syntax
- **Solution:** The application handles corrupted JSON by starting fresh. If issues persist, backup and delete `tasks.json`

**Special characters not displaying correctly**
- **Problem:** Terminal encoding issues with special characters
- **Solution:** Use UTF-8 encoding in your terminal. For Windows Command Prompt: `chcp 65001`

**Tip:** Create a shell alias for faster access:
```bash
# Add to ~/.bashrc or ~/.bash_profile
alias task="node C:\Megz\Projects\ai-sdlc-lab\src\index.js"

# Then use simply:
task add Buy milk
task list
task complete 1
```

## Project Structure

```
├── orchestrator.js           # Sprint automation coordinator
├── dashboard.html            # Real-time progress dashboard
├── planning/                 # Requirements & sprint plans
├── retrospectives/           # Sprint retrospectives
├── test-reports/            # QA test results
└── src/                     # CLI Task Manager source code
    ├── commands/            # Command handlers
    ├── models/              # Data models
    ├── storage/             # JSON persistence
    └── index.js             # CLI entry point
```

## Getting Started

```bash
# Install dependencies (if any added)
npm install

# Use the CLI Task Manager
npm start add "My first task"
npm start list

# Run automated sprint (Sprint 2)
npm run sprint
```

## Key Learnings

This project demonstrates:
- Multi-agent orchestration and collaboration
- AI-driven workflow automation
- Complete SDLC process automation
- Real-time progress monitoring
- Iterative improvement through retrospectives

## Sprint History

- **Sprint 1** - Core CRUD operations with JSON persistence (APPROVED)
- **Sprint 2** - Coming soon (automated execution)

## Tech Stack

- **Runtime**: Node.js 14+
- **Agents**: Claude Code CLI
- **Dashboard**: HTML/CSS/JavaScript
- **Orchestration**: Node.js child processes

## License

ISC
