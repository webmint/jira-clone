# Development Workflow

**Constitution Version**: 2.7.0
**Last Updated**: 2025-10-05

This document describes the complete development workflow from feature idea to production merge, including GitHub integration, individual task files, git commit workflow with Husky pre-commit hooks, sequential task enforcement, agent assignment, GitHub project board, and **5 MANDATORY user approval gates**.

---

## Overview

```
Feature Idea
    ↓
/specify → spec.md + spec branch + GitHub Issue #X (Spec)
    ↓
⚠️ APPROVAL GATE 1: User Reviews & Approves Spec (MANDATORY)
    ↓
/plan → plan.md, research.md, contracts/, etc. (committed to spec branch)
    ↓
⚠️ APPROVAL GATE 2: User Reviews & Approves Plan (MANDATORY)
    ↓
/tasks → tasks.md + GitHub Issues #Y1, #Y2, ... (committed to spec branch)
    ↓
⚠️ APPROVAL GATE 3: User Reviews & Approves Tasks (MANDATORY)
    ↓
Push spec branch (spec + plan + tasks)
    ↓
/implement → For Each Task (SEQUENTIAL):
    ├─ Create Task Branch from Spec Branch
    ├─ Implement Task (TDD)
    ├─ Commit (with Husky pre-commit hooks)
    │   ├─ If hooks FAIL → get user approval for fixes (MANDATORY)
    │   └─ If hooks PASS → commit succeeds
    ├─ ⚠️ APPROVAL GATE 4: User Approves Task (MANDATORY)
    ├─ Create PR (Task Branch → Spec Branch)
    ├─ Merge PR
    ├─ Switch to spec branch, pull latest
    └─ Start Next Task (ONLY after previous merged)
    ↓
All Tasks Complete
    ↓
⚠️ APPROVAL GATE 5: User Approves Feature (MANDATORY)
    ↓
Create PR (Spec Branch → Main, closes Spec Issue #X)
    ↓
Merge to Main
```

---

## Phase 1: Specification

### 1.1 Create Specification

```bash
# Run the specify command
/specify <feature description>
```

**Output**:

- `.specify/specs/###-feature-name/spec.md`
- **Git commits**:
  - Creates temporary branch: `spec/###-feature-name`
  - Commits spec.md to temporary branch
  - Pushes to origin
- GitHub Issue created: `[Spec] Feature Name`
  - Labels: `feature`, `spec`, priority (e.g., `P1-high`)
  - Assigned to: Architecture Agent
  - Added to project board: "📐 Spec & Design" column
  - Status: Open, awaiting review

**Example**:

```bash
/specify Add user authentication with email/password and role-based permissions
```

Creates:

- `.specify/specs/001-user-authentication/spec.md`
- Temporary branch: `spec/001-user-authentication`
- GitHub Issue #5: `[Spec] User Authentication System`
- Project board: Issue added to "📐 Spec & Design" column

### 1.2 ⚠️ APPROVAL GATE 1: Review & Approve Specification (MANDATORY)

**The /specify command STOPS here and WAITS for your approval!**

**User Action Required**:

1. Review spec file at `.specify/specs/###-feature-name/spec.md`
2. Review GitHub Issue #X (check project board)
3. Review temporary branch: `spec/###-feature-name`
4. Check that:
   - [ ] Requirements are clear and complete
   - [ ] Scope is well-defined and bounded
   - [ ] User scenarios make sense
   - [ ] No major concerns or missing requirements

**To Approve**:

- ✅ Respond: "Approved, proceed with /plan"

**To Request Changes**:

- ❌ Comment with required changes
- After changes made, review again

**IMPORTANT**: `/plan` command CANNOT run until you explicitly approve the spec!

**After approval**: Stays on spec branch, proceeds to /plan (spec branch NOT merged yet)

---

## Phase 2: Planning

### 2.1 Create Implementation Plan

**After spec approved**:

```bash
/plan
```

**Output** (in `.specify/specs/###-feature-name/`):

- `plan.md` - Implementation strategy
- `research.md` - Technical research and decisions
- `data-model.md` - Database schema and entities
- `contracts/` - API contracts (OpenAPI/GraphQL)
- `quickstart.md` - Manual testing guide
- Agent-specific file (e.g., `CLAUDE.md`)
- **Git commits**:
  - All plan files committed to spec branch
  - Commit message: "docs: add implementation plan for [feature-name]"
  - NOT pushed yet (waiting for tasks approval)

**Example**:

```
.specify/specs/001-user-authentication/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   ├── auth-register.yaml
│   ├── auth-login.yaml
│   └── auth-refresh.yaml
└── quickstart.md
```

### 2.2 ⚠️ APPROVAL GATE 2: Review & Approve Plan (MANDATORY)

**The /plan command STOPS here and WAITS for your approval!**

**User Action Required**:

1. Review all deliverables:
   - `plan.md` - Implementation strategy
   - `research.md` - Technical decisions
   - `data-model.md` - Database schema
   - `contracts/` - API contracts
   - `quickstart.md` - Testing guide

2. Check that:
   - [ ] Technical approach makes sense
   - [ ] Research decisions are sound
   - [ ] Data model is appropriate
   - [ ] API contracts are well-defined
   - [ ] No major concerns about architecture

**To Approve**:

- ✅ Respond: "Approved, proceed with /tasks"

**To Request Changes**:

- ❌ Comment with required changes
- After changes made, review again

**IMPORTANT**: `/tasks` command CANNOT run until you explicitly approve the plan!

---

## Phase 3: Task Generation

### 3.1 Generate Tasks and Create GitHub Issues

```bash
/tasks
```

**Output**:

1. `.specify/specs/###-feature-name/tasks.md` - Summary with all tasks
2. `.specify/specs/###-feature-name/tasks/` folder created
3. Individual file for EACH task: `tasks/T###-task-name.md` with:
   - Task description and files to modify
   - **Agent assignment** (MANDATORY based on file paths)
   - Dependencies (blocks/blocked by)
   - Acceptance criteria checklist
   - GitHub issue link
   - Sub-branch name
   - Approval tracking
4. **Git commits**:
   - Tasks committed to spec branch
   - Commit message: "feat: generate tasks for [feature-name]"
   - NOT pushed yet (waiting for approval)
5. GitHub Issues created for EACH task:
   - Title: `[T###] Task description`
   - Labels: `feature`, `spec`, agent label (e.g., `agent:backend`), priority
   - **Assigned to**: Responsible agent role (MANDATORY)
   - Linked to: Parent spec issue + task file
   - **Added to project board**: "📋 Backlog" column

**Example**:

```bash
/tasks
```

Creates:

- `tasks.md` - Summary of all tasks
- `tasks/` folder with individual task files:
  - `tasks/T001-user-entity.md` (Agent: backend)
  - `tasks/T002-users-service.md` (Agent: backend)
  - `tasks/T003-backend-dtos.md` (Agent: backend)
  - ... (20+ task files)
- Git: All committed to spec branch (NOT pushed yet)
- GitHub Issues (all added to "📋 Backlog"):
  - #10: `[T001] Create User entity model` → assigned to backend agent
  - #11: `[T002] Create UsersService` → assigned to backend agent
  - #12: `[T003] Backend DTOs` → assigned to backend agent
  - ... (20+ issues)
- Project board: All tasks in "📋 Backlog" column

**Agent Assignment Rules**:

- Tasks modifying `back/` → `agent:backend`
- Tasks modifying `front/` → `agent:frontend`
- Tasks modifying `common/` → `agent:common`
- Test-only tasks → `agent:testing`
- DevOps/CI tasks → `agent:devops`
- Design/UI tasks → `agent:design`
- Architecture decisions → `agent:architecture`

### 3.2 ⚠️ APPROVAL GATE 3: Review & Approve Tasks (MANDATORY)

**The /tasks command STOPS here and WAITS for your approval!**

**User Action Required**:

1. Review deliverables:
   - `tasks.md` - Complete task breakdown (summary)
   - `tasks/` folder - Individual task files (detailed)
   - Feature branch: `feature/###-name` (created)
   - GitHub issues for all tasks (check issue tracker)

2. Check that:
   - [ ] Task breakdown is complete and logical
   - [ ] Dependencies are correctly identified
   - [ ] Parallel tasks are truly independent
   - [ ] Task ordering makes sense (tests before implementation)
   - [ ] No tasks are missing or duplicated
   - [ ] **Agent assignments are correct** (based on file paths)
   - [ ] GitHub issues created for all tasks
   - [ ] All issues added to project board "📋 Backlog"

**To Approve**:

- ✅ Respond: "Approved, begin implementation"

**To Request Changes**:

- ❌ Comment with required changes to task breakdown
- After changes made, review again

**IMPORTANT**: Implementation CANNOT begin until you explicitly approve the task breakdown!

**After approval**:

```bash
# Push spec branch with ALL changes (spec + plan + tasks)
git push origin spec/###-feature-name
```

Spec branch now contains all planning artifacts, ready for implementation.

---

## Phase 4: Implementation (Per Task)

### 4.1 Task Workflow

**IMPORTANT**: Tasks must be completed **SEQUENTIALLY**. Cannot start new task until previous task PR is merged to spec branch.

For **EACH** task, follow this workflow:

#### Step 1: Verify Previous Task Complete

```bash
# BEFORE starting new task, ensure on spec branch
git checkout spec/001-user-authentication

# Pull latest (includes previous task if merged)
git pull origin spec/001-user-authentication
```

**MANDATORY**: Cannot proceed if previous task PR not merged!

#### Step 2: Create Task Sub-branch

```bash
# Create sub-branch for task from spec branch
git checkout -b spec/001-user-authentication/T014-auth-endpoints
```

#### Step 3: Implement Task

Follow TDD workflow:

1. Write failing tests (if not already created)
2. Implement code to pass tests
3. Refactor for quality
4. Ensure all quality gates pass

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build
npm run build
```

#### Step 4: Commit with Husky Pre-commit Hooks

```bash
# Attempt commit
git add .
git commit -m "feat: implement auth controller endpoints"
```

**If Husky pre-commit hooks FAIL**:

1. **STOP immediately** - display error output
2. Ask user for approval:

   ```
   Pre-commit hooks failed with errors:
   - ESLint: 3 errors in auth.controller.ts
   - Prettier: 2 files need formatting

   Approve fixes for these errors?
   ```

3. **WAIT FOR USER APPROVAL** (MANDATORY)
4. After approval, fix errors
5. Retry commit
6. Repeat if hooks fail again

**If hooks PASS**: Commit succeeds, proceed to next step

#### Step 5: ⚠️ **WAIT FOR USER APPROVAL** (MANDATORY)

**DO NOT create PR without user approval!**

**Post message to user**:

```
Task T014 (Create AuthController endpoints) is complete.

Changes:
- Created src/auth/auth.controller.ts with 6 endpoints
- All tests passing (12/12)
- ESLint: 0 errors
- Coverage: 92%
- Pre-commit hooks: ✅ PASSED

Waiting for approval to create PR.
```

**User reviews and responds**:

- ✅ "Approved, create PR"
- ❌ "Please change X before PR" → Make changes, request approval again

#### Step 6: Create Pull Request

**After user approval**:

```bash
# Push task branch
git push -u origin spec/001-user-authentication/T014-auth-endpoints

# Create PR
gh pr create \
  --base spec/001-user-authentication \
  --head spec/001-user-authentication/T014-auth-endpoints \
  --title "[T014] Create AuthController endpoints" \
  --body "Implements AuthController with 6 endpoints

Closes #14

Changes:
- auth.controller.ts
- Tests: 12/12 passing
- Coverage: 92%
"
```

**PR merges**: Task branch → Spec branch
**Closes**: Task issue #14

#### Step 7: After PR Merged

```bash
# Switch back to spec branch
git checkout spec/001-user-authentication

# Pull latest (includes merged task)
git pull origin spec/001-user-authentication
```

#### Step 8: Next Task

**ONLY NOW** can the next task begin. Return to Step 1 for next task.

---

## Phase 5: Final Integration

### 5.1 All Tasks Complete

After all task PRs are merged to spec branch:

```bash
# Ensure on spec branch
git checkout spec/001-user-authentication

# Pull latest
git pull origin spec/001-user-authentication

# Run full test suite
npm run test:all

# Run E2E tests
npm run test:e2e

# Build all workspaces
npm run build
```

### 5.2 ⚠️ **WAIT FOR USER APPROVAL** (MANDATORY)

**Post message to user**:

```
Feature 001 (User Authentication) is complete.

All 44 tasks completed and merged to spec branch.

Summary:
- Backend: 14 tasks
- Frontend: 11 tasks
- Tests: 7 tasks
- Docs: 5 tasks

Test Results:
- Backend: 127/127 tests, 87% coverage
- Frontend: 89/89 tests, 82% coverage
- E2E: 15/15 scenarios

Quality Gates: ✅ All passed

Waiting for approval to create final PR to main.
```

**User reviews and responds**:

- ✅ "Approved, create PR to main"
- ❌ "Please test X scenario first" → Test, fix if needed, request approval again

### 5.3 Create Final PR to Main

**After user approval**:

```bash
# Create PR to main
gh pr create \
  --base main \
  --head spec/001-user-authentication \
  --title "feat: User Authentication System" \
  --body "Closes #5"
```

**PR merges**: Spec branch → Main
**Closes**: Spec issue #5

---

## Branch Hierarchy

```
main (protected)
└── spec/###-feature-name (spec branch with spec+plan+tasks, merged after all tasks done)
    ├── spec/###-feature-name/T001-task-a (task sub-branch, merged to spec branch)
    ├── spec/###-feature-name/T002-task-b (task sub-branch, merged to spec branch)
    └── spec/###-feature-name/T003-task-c (task sub-branch, merged to spec branch)
```

**Flow**:

1. `/specify` creates `spec/###-name` branch
2. `/plan` and `/tasks` commit to same spec branch
3. Each task creates sub-branch from spec branch
4. Task PRs merge back to spec branch (SEQUENTIAL)
5. Final PR merges spec branch to main

---

## GitHub Project Board

### Required Columns (in order)

1. **📋 Backlog** - All new tasks start here after /tasks
2. **📐 Spec & Design** - Spec issues, design work, architecture decisions
3. **⚙️ Common Types** - Shared types, DTOs, interfaces across workspaces
4. **🔧 Backend Dev** - Backend tasks in progress
5. **🎨 Frontend Dev** - Frontend tasks in progress
6. **🧪 Testing** - Test-only tasks in progress
7. **👀 Review** - Tasks with open PRs awaiting review
8. **✅ Done** - Completed and merged tasks

**Workflow**:

- Spec issues → "📐 Spec & Design"
- Task issues → "📋 Backlog" initially
- Move to appropriate dev column when starting work
- Move to "👀 Review" when PR created
- Move to "✅ Done" when merged

---

## GitHub Labels

### Required Labels

**Type Labels**:

- `feature`, `bug`, `tech-debt`, `docs`, `security`, `spec`

**Priority Labels**:

- `P0-critical`, `P1-high`, `P2-medium`, `P3-low`

**Agent Labels**:

- `agent:architecture`, `agent:backend`, `agent:frontend`
- `agent:design`, `agent:testing`, `agent:devops`, `agent:common`

**Status Labels** (optional):

- `in-progress`, `blocked`, `review`

---

## User Approval Gates

### Gate 1: After /specify Command

**Required**: User must review and approve spec before `/plan` can run
**What to review**: spec.md file and GitHub issue

### Gate 2: After /plan Command

**Required**: User must review and approve plan before `/tasks` can run
**What to review**: plan.md, research.md, data-model.md, contracts/, quickstart.md

### Gate 3: After /tasks Command

**Required**: User must review and approve task breakdown before implementation begins
**What to review**: tasks.md, feature branch, GitHub task issues

### Gate 4: After Each Task Implementation

**Required**: User must approve each task before PR creation
**What to review**: Code changes, test results, quality gates

### Gate 5: After All Tasks Complete

**Required**: User must approve entire feature before PR to main
**What to review**: Full feature functionality, all tests passing

---

## Quick Reference

### Commands

```bash
/specify <description>   # Create spec + GitHub issue
/plan                    # Create implementation plan
/tasks                   # Create tasks + branch + GitHub issues
```

### Branch Naming

```
feature/###-feature-name                      # Feature branch
feature/###-feature-name/T###-task-name       # Task sub-branch
```

### Commit Messages

```
type: brief description

Detailed explanation

Refs #[task-issue-number]
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

---

## Constitution Reference

This workflow is mandated by Constitution v2.7.0:

- Article III, Section 3.1: Specification-First Process (with git workflow + 3 approval gates)
- Article III, Section 3.4: GitHub Integration & Branch Strategy
- Article III, Section 3.5: Issue and PR Protocol
- Article IV, Section 4.4: Git Standards
- Article XII: GitHub Project Board (8 columns)

**Key Changes in v2.7.0**:

- **Single spec branch workflow**: Spec, plan, and tasks all on same `spec/###-name` branch
- **Sequential task execution**: MANDATORY - cannot start new task until previous merged
- **Husky pre-commit hook handling**: MANDATORY user approval before fixing hook failures
- **Task branches from spec branch**: All task sub-branches created from and merged to spec branch
- **Final PR only after all tasks**: Spec branch merged to main only when feature complete

**Key Changes in v2.6.0**:

- **Storybook integration**: Design Agent must create .stories.ts for all UI components

**Key Changes in v2.5.0**:

- **Git workflow integration**: Spec commits to temp branch, plan to main, tasks to feature branch
- **Mandatory agent assignment**: Each task assigned to agent based on file paths
- **GitHub project board**: 8 columns with defined workflow
- **Enhanced labels**: Agent labels (agent:backend, agent:frontend, etc.)
- **Automated tracking**: Issues auto-added to project board columns

**Key Changes in v2.4.0**:

- Added individual task files: `tasks/T###-task-name.md`
- Each task gets detailed file with dependencies, acceptance criteria, tracking
- Task files linked in GitHub issues

**Key Changes in v2.3.0**:

- Added MANDATORY approval gate after /specify
- Added MANDATORY approval gate after /plan
- Added MANDATORY approval gate after /tasks
- Commands must STOP and WAIT for explicit user approval before proceeding

See `.specify/memory/constitution.md` for full details.
