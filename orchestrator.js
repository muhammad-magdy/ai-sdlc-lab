#!/usr/bin/env node

/**
 * AI SDLC Lab - Sprint Orchestrator
 * Coordinates agent execution for automated sprint workflow
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const STATUS_FILE = path.join(__dirname, 'sprint-status.json');

// Initialize status
let status = {
  sprint: 'Sprint 2',
  phase: 'Idle',
  currentAgent: null,
  progress: 0,
  startTime: null,
  logs: [],
  agents: {
    'project-manager': { status: 'pending', startTime: null, endTime: null },
    'scrum-master': { status: 'pending', startTime: null, endTime: null },
    'developer': { status: 'pending', startTime: null, endTime: null },
    'tester': { status: 'pending', startTime: null, endTime: null }
  }
};

// Save status to file
function saveStatus() {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}

// Add log entry
function addLog(message, level = 'info') {
  const timestamp = new Date().toISOString();
  status.logs.push({ timestamp, message, level });
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
  saveStatus();
}

// Update agent status
function updateAgent(agent, agentStatus) {
  status.agents[agent].status = agentStatus;
  if (agentStatus === 'running') {
    status.agents[agent].startTime = new Date().toISOString();
    status.currentAgent = agent;
  } else if (agentStatus === 'complete' || agentStatus === 'failed') {
    status.agents[agent].endTime = new Date().toISOString();
    status.currentAgent = null;
  }
  saveStatus();
}

// Update overall progress
function updateProgress(phase, percentage) {
  status.phase = phase;
  status.progress = percentage;
  saveStatus();
}

// Execute Claude agent
function runAgent(agentType, prompt, description) {
  return new Promise((resolve, reject) => {
    addLog(`Starting ${agentType} agent: ${description}`);
    updateAgent(agentType, 'running');

    // Escape prompt for shell - use temporary file approach
    const tempFile = path.join(__dirname, `.prompt-${Date.now()}.tmp`);
    fs.writeFileSync(tempFile, prompt);

    const command = `claude --agent ${agentType} -p "$(cat "${tempFile}")"`;

    exec(command, {
      cwd: __dirname,
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      shell: true
    }, (error, stdout, stderr) => {
      // Clean up temp file
      try {
        fs.unlinkSync(tempFile);
      } catch (e) {
        // Ignore cleanup errors
      }

      if (error) {
        addLog(`${agentType} failed: ${error.message}`, 'error');
        if (stderr) addLog(`stderr: ${stderr}`, 'error');
        updateAgent(agentType, 'failed');
        reject(error);
      } else {
        addLog(`${agentType} completed successfully`, 'success');
        updateAgent(agentType, 'complete');
        resolve(stdout);
      }
    });
  });
}

// Main orchestrator workflow
async function runSprint() {
  try {
    status.startTime = new Date().toISOString();
    addLog(`Starting automated sprint workflow: ${status.sprint}`);
    saveStatus();

    // Phase 1: Planning (20%)
    updateProgress('Planning', 10);
    await runAgent(
      'scrum-master',
      `You are planning ${status.sprint} for the CLI Task Manager project.

Read the following documents:
- planning/REQUIREMENTS.md (product requirements)
- planning/SPRINT_1_REVIEW.md (previous sprint review)
- retrospectives/SPRINT_1_RETROSPECTIVE.md (action items to address)

Your job:
1. Define a clear SPRINT GOAL for ${status.sprint}
2. Create the ${status.sprint.toUpperCase()} BACKLOG focusing on:
   - Action items from retrospective (HIGH priority)
   - BUG-001 fix
   - Help system implementation
   - User documentation
   - Items from Future Backlog as appropriate

3. Break work into structured tasks using format:
TASK_ID: DEV-X
TITLE:
DESCRIPTION:
FILES_EXPECTED:
DEPENDS_ON:

4. Create QA tasks (QA-X format)

Output to planning/SPRINT_2_PLAN.MD with sections:
- SPRINT GOAL
- SPRINT 2 BACKLOG
- FUTURE BACKLOG`,
      'Create Sprint 2 plan'
    );
    updateProgress('Planning', 20);

    // Phase 2: Development (60%)
    updateProgress('Development', 30);
    await runAgent(
      'developer',
      `You are implementing ${status.sprint} for the CLI Task Manager project.

1. Read planning/SPRINT_2_PLAN.MD for all development tasks
2. Read planning/REQUIREMENTS.md for requirements
3. Read retrospectives/SPRINT_1_RETROSPECTIVE.md for action items

Implement all DEV tasks in order:
- Follow dependencies in DEPENDS_ON
- Create files in FILES_EXPECTED
- Address action items from retrospective
- Keep solutions simple and focused

Complete all development tasks.`,
      'Implement Sprint 2 tasks'
    );
    updateProgress('Development', 60);

    // Phase 3: Testing (80%)
    updateProgress('Testing', 70);
    await runAgent(
      'tester',
      `You are testing ${status.sprint} of the CLI Task Manager project.

1. Read planning/SPRINT_2_PLAN.MD for QA tasks
2. Read planning/REQUIREMENTS.md for acceptance criteria
3. Execute all QA tasks systematically

Test:
- New features added in this sprint
- BUG-001 fix (if implemented)
- Regression testing of existing features
- All acceptance criteria

Create test report at test-reports/SPRINT_2_QA_REPORT.md with:
- Test results for each QA task
- Pass/Fail status
- Bugs found
- Recommendations`,
      'Execute Sprint 2 QA'
    );
    updateProgress('Testing', 80);

    // Phase 4: Review (90%)
    updateProgress('Review', 85);
    await runAgent(
      'project-manager',
      `You are reviewing ${status.sprint} completion for the CLI Task Manager project.

1. Read planning/SPRINT_2_PLAN.MD (what was planned)
2. Read test-reports/SPRINT_2_QA_REPORT.md (test results)
3. Review implemented code

Evaluate:
- All acceptance criteria met?
- Test results acceptable?
- Quality assessment
- Business value delivered

Make decision: APPROVE or REJECT with reasoning.

Create planning/SPRINT_2_REVIEW.md with your decision and recommendations.`,
      'Review and approve Sprint 2'
    );
    updateProgress('Review', 90);

    // Phase 5: Retrospective (100%)
    updateProgress('Retrospective', 95);
    await runAgent(
      'scrum-master',
      `Facilitate ${status.sprint} Retrospective for CLI Task Manager project.

Read:
- planning/SPRINT_2_PLAN.MD
- planning/SPRINT_2_REVIEW.md
- test-reports/SPRINT_2_QA_REPORT.md

Create retrospective covering:
- WHAT WENT WELL
- WHAT DIDN'T GO WELL
- WHAT CAN BE IMPROVED (action items)

Output to retrospectives/SPRINT_2_RETROSPECTIVE.md`,
      'Facilitate Sprint 2 retrospective'
    );
    updateProgress('Complete', 100);

    addLog(`${status.sprint} completed successfully! 🎉`, 'success');
    addLog('All sprint artifacts generated. Ready for commit.', 'info');

  } catch (error) {
    addLog(`Sprint workflow failed: ${error.message}`, 'error');
    status.phase = 'Failed';
    saveStatus();
    process.exit(1);
  }
}

// Start the workflow
console.log('='.repeat(60));
console.log('AI SDLC Lab - Automated Sprint Orchestrator');
console.log('='.repeat(60));
console.log('');

runSprint().then(() => {
  console.log('');
  console.log('Sprint workflow completed!');
  console.log(`View progress: file://${path.join(__dirname, 'dashboard.html')}`);
}).catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
