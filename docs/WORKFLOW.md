# Development Workflow

**Constitution Version**: 2.8.0
**Last Updated**: 2025-10-06

This document describes the complete development workflow from feature idea to production merge, including GitHub integration, individual task files, git commit workflow with Husky pre-commit hooks, **strict sequential task enforcement**, **pr-reviewer agent integration**, agent assignment, GitHub project board, and **6 MANDATORY user approval gates**.

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
/implement → For Each Task (STRICTLY SEQUENTIAL):
    ├─ Create Task Branch from Spec Branch
    ├─ Implement Task (TDD)
    ├─ ⚠️ APPROVAL GATE 4a: User Approves Implementation (MANDATORY - BEFORE COMMIT)
    ├─ Commit (with Husky pre-commit hooks)
    │   ├─ If hooks FAIL → get user approval for fixes (MANDATORY)
    │   └─ If hooks PASS → commit succeeds
    ├─ Create PR (Task Branch → Spec Branch, follow .github/pull_request_template.md)
    ├─ Code Review with pr-reviewer Agent
    ├─ ⚠️ APPROVAL GATE 4b: User Approves PR (MANDATORY)
    ├─ Merge PR
    ├─ Checkout spec branch
    ├─ Pull from origin
    ├─ Verify merged PR
    └─ Create Next Task Branch (ONLY after previous merged)
    ↓
All Tasks Complete
    ↓
Create PR (Spec Branch → Main, closes Spec Issue #X)
    ↓
Code Review with pr-reviewer Agent (Full Feature)
    ↓
⚠️ APPROVAL GATE 5: User Approves Final PR (MANDATORY)
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

**IMPORTANT**: Tasks must be completed **STRICTLY SEQUENTIALLY** in the order defined in tasks.md.

**Sequential Implementation Rules**:

- ✅ **MUST** complete tasks one by one in the exact order from tasks.md
- ✅ **MUST** wait for previous task PR to be merged before starting next task
- ❌ **NEVER** work on tasks in parallel, even if they appear independent in the plan
- ❌ **NEVER** skip tasks or change task order without explicit user approval
- ❌ **NEVER** start a new task while previous task is still in progress or waiting for PR merge

**Rationale**: Sequential execution ensures:

- Clear dependency management
- Easier debugging and rollback
- Predictable state at each step
- Simplified code review process
- Reduced merge conflicts

For **EACH** task, follow this workflow:

#### Step 1: Verify Previous Task Complete

```bash
# BEFORE starting new task, ensure on spec branch
git checkout spec/001-user-authentication

# Pull latest (includes previous task if merged)
git pull origin spec/001-user-authentication
```

**MANDATORY**: Cannot proceed if previous task PR not merged!

#### Step 2: Create Task Sub-branch and Link to Issue

```bash
# Create sub-branch for task from spec branch
git checkout -b spec/001-user-authentication/T014-auth-endpoints

# Push branch to establish remote tracking
git push -u origin spec/001-user-authentication/T014-auth-endpoints

# Link branch to GitHub issue and move to "In Progress" column
gh issue develop #14 --branch spec/001-user-authentication/T014-auth-endpoints
gh issue edit #14 --add-label "in-progress"

# Move issue to appropriate "In Progress" column on project board
# Based on agent assignment:
# - agent:backend → "🔧 Backend Dev"
# - agent:frontend → "🎨 Frontend Dev"
# - agent:common → "⚙️ Common Types"
# - agent:testing → "🧪 Testing"
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

#### Step 4: ⚠️ **REQUEST IMPLEMENTATION APPROVAL** (MANDATORY - BEFORE COMMIT)

**STOP! DO NOT commit yet!**

**Post message to user**:

```
Task T014 (Create AuthController endpoints) implementation is complete.

Changes ready for commit:
- Created src/auth/auth.controller.ts with 6 endpoints
- Created test/auth.controller.spec.ts with 12 tests
- All tests passing (12/12)
- ESLint: 0 errors
- Coverage: 92%

Files to be committed:
- src/auth/auth.controller.ts (new file, 245 lines)
- test/auth.controller.spec.ts (new file, 189 lines)

Waiting for approval to commit these changes.
```

**User reviews and responds**:

- ✅ "Approved, commit"
- ❌ "Please change X before commit" → Make changes, request approval again

**MANDATORY**: Cannot commit until user explicitly approves!

#### Step 5: Commit with Husky Pre-commit Hooks

**After receiving user approval to commit**:

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

#### Step 6: Create Pull Request and Move to Review

**After successful commit**:

```bash
# Create PR following .github/pull_request_template.md
gh pr create \
  --base spec/001-user-authentication \
  --head spec/001-user-authentication/T014-auth-endpoints \
  --title "[T014] Create AuthController endpoints" \
  --body "$(cat <<'EOF'
## Description
Implements AuthController with 6 REST endpoints for authentication flow.

## Type of Change
- [x] New feature (non-breaking change which adds functionality)

## Agent
- [x] Backend

## Code Quality Checklist
- [x] Code follows project style guidelines
- [x] Self-reviewed my code
- [x] Commented complex code sections
- [x] Updated relevant documentation
- [x] No new warnings generated
- [x] Added tests proving fix/feature works
- [x] New and existing tests pass locally

## Testing
- Unit tests: 12/12 passing
- Coverage: 92%
- Manual testing: All endpoints validated via Postman

## Accessibility
- [x] N/A (Backend API)

## Breaking Changes
- [x] No breaking changes

Closes #14
EOF
)"

# Move issue to "👀 Review" column on project board
gh issue edit #14 --remove-label "in-progress" --add-label "review"
```

**IMPORTANT**: PR must follow `.github/pull_request_template.md` format (MANDATORY)

#### Step 7: ⚠️ **CODE REVIEW WITH PR-REVIEWER AGENT** (MANDATORY)

**After PR created**:

1. Launch `pr-reviewer` agent using Task tool:

```typescript
// Use Task tool to invoke pr-reviewer agent
Task({
  subagent_type: 'pr-reviewer',
  description: 'Review PR #XX',
  prompt:
    'Review pull request #XX ([T014] Create AuthController endpoints) and provide comprehensive technical feedback.',
});
```

2. The `pr-reviewer` agent performs comprehensive review:
   - Code quality, architecture, and design patterns
   - TypeScript type safety and proper typing practices
   - Vue/NestJS framework best practices
   - Security vulnerabilities and potential risks
   - Performance implications
   - Test coverage and quality
   - Adherence to project conventions (CLAUDE.md)

3. Agent returns structured review with:
   - Executive Summary (Approve ✅ / Request Changes ⚠️ / Comment 💬)
   - Critical Issues 🚨
   - Major Concerns ⚠️
   - Minor Suggestions 💡
   - Positive Highlights ⭐
   - Testing Assessment 🧪
   - Documentation Review 📝
   - Action Items

#### Step 8: ⚠️ **REQUEST PR APPROVAL** (MANDATORY)

**Post message to user with pr-reviewer findings**:

```
PR #XX created: [T014] Create AuthController endpoints

PR Review by pr-reviewer agent:

Executive Summary: Request Changes ⚠️
Overall assessment: Implementation is solid but has one critical security concern and two major architectural improvements needed.

Critical Issues 🚨:
- Auth token validation missing for DELETE endpoints
- No rate limiting on login endpoint

Major Concerns ⚠️:
- Consider extracting validation logic to separate ValidationService
- Error messages expose too much system information

Minor Suggestions 💡:
- Add JSDoc comments for public methods
- Consider using enum for user roles instead of string literals

Positive Highlights ⭐:
- Excellent test coverage (92%)
- Clean dependency injection pattern
- Proper DTO validation

Testing Assessment 🧪: 12/12 tests passing, coverage exceeds target (92% vs 80%)
Documentation Review 📝: API documentation complete

PR Link: https://github.com/user/repo/pull/XX

Waiting for your approval to merge (or request changes based on pr-reviewer findings).
```

**User reviews PR and pr-reviewer findings, then responds**:

- ✅ "Approved, merge PR" (if satisfied with code as-is or after fixes)
- ❌ "Address critical issues first" → Make changes, update PR, re-run pr-reviewer, request approval again

**MANDATORY**: Cannot merge until user explicitly approves!

#### Step 9: Merge PR and Move to Done

**After receiving user approval**:

```bash
# Merge PR (via GitHub or gh CLI)
gh pr merge XX --squash

# Move issue to "✅ Done" column on project board
gh issue edit #14 --remove-label "review" --add-label "done"
gh issue close #14

# Step 1: Checkout spec branch
git checkout spec/001-user-authentication

# Step 2: Pull data from git
git pull origin spec/001-user-authentication

# Step 3: Verify merged PR from last task
git log --oneline -1  # Should show merged task commit
```

**Verify merge**:

- Confirm PR #XX is merged
- Confirm issue #14 moved to "✅ Done" column
- Confirm spec branch contains latest changes
- All tests still passing on spec branch

#### Step 10: Next Task or Final PR

**Check if more tasks remain**:

**If NOT last task**:

```bash
# Step 4: Create branch for next task
git checkout -b spec/001-user-authentication/T015-next-task

# Return to Step 3 for next task implementation
```

**If LAST task**:

```bash
# All tasks complete - create PR to main

# Create final PR for spec branch → main
gh pr create \
  --base main \
  --head spec/001-user-authentication \
  --title "feat: User Authentication System" \
  --body "$(cat <<'EOF'
## Description
Complete implementation of user authentication system with email/password and role-based permissions.

## Type of Change
- [x] New feature (non-breaking change which adds functionality)

## Agent
- [x] Full Stack (Backend + Frontend)

## Code Quality Checklist
- [x] Code follows project style guidelines
- [x] Self-reviewed my code
- [x] Commented complex code sections
- [x] Updated relevant documentation
- [x] No new warnings generated
- [x] Added tests proving fix/feature works
- [x] New and existing tests pass locally

## Testing
- Backend: 127/127 tests, 87% coverage
- Frontend: 89/89 tests, 82% coverage
- E2E: 15/15 scenarios passing

## Summary
- Backend: 14 tasks completed
- Frontend: 11 tasks completed
- Tests: 7 tasks completed
- Docs: 5 tasks completed

Closes #5
EOF
)"
```

#### Step 11: ⚠️ **FINAL CODE REVIEW WITH PR-REVIEWER AGENT** (MANDATORY - for spec→main PR only)

**After final PR created**:

1. Launch `pr-reviewer` agent for final comprehensive review:

```typescript
// Use Task tool to invoke pr-reviewer agent for final PR
Task({
  subagent_type: 'pr-reviewer',
  description: 'Review final PR #YY',
  prompt:
    'Review final pull request #YY (User Authentication System - spec → main) and provide comprehensive technical feedback covering the entire feature implementation.',
});
```

2. The `pr-reviewer` agent performs comprehensive feature-level review:
   - Full feature integration check
   - All tests across entire feature (backend + frontend + E2E)
   - Documentation completeness (README, API docs, ADRs)
   - Breaking changes analysis
   - Migration guide if needed
   - Cross-workspace consistency
   - Security audit across all components

3. Agent returns final structured review for entire feature

#### Step 12: ⚠️ **REQUEST FINAL PR APPROVAL** (MANDATORY - for spec→main PR only)

**Post message to user with final pr-reviewer findings**:

```
Final PR #YY created: User Authentication System

PR Review by pr-reviewer agent (Feature-Level):

Executive Summary: Approve ✅
Overall assessment: Excellent implementation with comprehensive test coverage, proper documentation, and no breaking changes. Feature is production-ready.

Critical Issues 🚨: None identified

Major Concerns ⚠️: None identified

Minor Suggestions 💡:
- Consider adding performance benchmarks for auth endpoints
- Add more E2E scenarios for error handling edge cases

Positive Highlights ⭐:
- All 44 tasks completed successfully
- Excellent test coverage across all workspaces
- Clean architecture with proper separation of concerns
- Comprehensive documentation (ADRs, API docs, quickstart guide)
- Security best practices followed throughout

Testing Assessment 🧪:
- Backend: 127/127 tests (87% coverage)
- Frontend: 89/89 tests (82% coverage)
- E2E: 15/15 scenarios passing

Documentation Review 📝:
- ADR-001: User Authentication Strategy (complete)
- API documentation: All endpoints documented
- Quickstart guide: Comprehensive testing scenarios
- README updates: Migration guide included

Breaking Changes: None

Feature is ready to merge to main.

Waiting for your final approval to merge.
```

**User reviews final PR and pr-reviewer findings, then responds**:

- ✅ "Approved, merge to main"
- ❌ "Test scenario X first" → Test, fix if needed, re-run pr-reviewer, request approval again

**MANDATORY**: Cannot merge to main until user explicitly approves!

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
- Task issues → "📋 Backlog" initially (created during `/tasks`)
- Move to appropriate dev column when starting task (Step 2):
  - `agent:backend` → "🔧 Backend Dev"
  - `agent:frontend` → "🎨 Frontend Dev"
  - `agent:common` → "⚙️ Common Types"
  - `agent:testing` → "🧪 Testing"
- Move to "👀 Review" when PR created (Step 6)
- Move to "✅ Done" when PR merged and issue closed (Step 9)

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
**What to review**: tasks.md, spec branch, GitHub task issues

### Gate 4a: After Each Task Implementation (BEFORE COMMIT)

**Required**: User must approve implementation before committing files
**What to review**:

- Code changes (files to be committed)
- Test results
- Test coverage
- Linting results
- Build status

### Gate 4b: After Each Task PR Creation (BEFORE MERGE)

**Required**: User must approve PR after pr-reviewer agent code review
**What to review**:

- Pull request details
- pr-reviewer agent findings (Executive Summary, Critical Issues, Major Concerns, etc.)
- All quality checks passing
- PR follows template format

### Gate 5: After All Tasks Complete (Final PR to Main)

**Required**: User must approve entire feature before merging to main
**What to review**:

- Final PR from spec branch to main
- pr-reviewer agent comprehensive feature review
- Full feature functionality
- All tests passing across all workspaces
- Documentation completeness

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

This workflow is mandated by Constitution v2.8.0:

- Article III, Section 3.1: Specification-First Process (with git workflow + 6 approval gates)
- Article III, Section 3.4: GitHub Integration & Branch Strategy
- Article III, Section 3.5: Issue and PR Protocol
- Article IV, Section 4.4: Git Standards
- Article XII: GitHub Project Board (8 columns)

**Key Changes in v2.8.0**:

- **Approval Gate 4a (NEW)**: User must approve implementation BEFORE committing (mandatory review of code changes, test results, coverage)
- **Approval Gate 4b (NEW)**: User must approve PR BEFORE merging (after pr-reviewer agent code review)
- **PR-Reviewer Agent Integration**: Automated comprehensive code review using `pr-reviewer` agent for ALL PRs (task PRs and final spec→main PR)
  - Invoked via Task tool with `subagent_type: "pr-reviewer"`
  - Provides structured review: Executive Summary, Critical Issues, Major Concerns, Minor Suggestions, Positive Highlights, Testing Assessment, Documentation Review
  - Reviews code quality, TypeScript safety, Vue/NestJS best practices, security, performance, test coverage, and CLAUDE.md adherence
- **Strict Sequential Enforcement**: Explicitly prohibits parallel task work, even if tasks appear independent
- **PR Template Compliance**: All PRs must follow `.github/pull_request_template.md` format (MANDATORY)
- **Post-Merge Verification**: After each PR merge, verify spec branch contains changes before creating next task branch

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
