# Development Workflow

**Constitution Version**: 2.10.4
**Last Updated**: 2025-10-11

This document describes the complete development workflow from feature idea to production merge, including GitHub integration, individual task files, git commit workflow, **strict sequential task enforcement**, **pr-reviewer agent integration**, **documentation-writer agent integration**, agent assignment, GitHub project board, GitHub issue URL linking, and **7 MANDATORY user approval gates**.

**GitHub Issue Structure**:

- **Spec → Parent Issue**: Created immediately when spec is defined, added to "Backlog"
- **Tasks → Sub-Issues**: Created after user approval, linked as children to parent spec issue

---

## Overview

```
Feature Idea
    ↓
/specify → spec.md + spec branch + GitHub Issue #X (Parent Issue, status: Backlog)
    ↓
⚠️ MANDATORY SPEC SIZE EVALUATION (notify if too large, suggest split)
    ↓
⚠️ APPROVAL GATE 1: User Reviews & Approves Spec (MANDATORY)
    ↓
/plan → plan.md, research.md, contracts/, etc. (committed to spec branch)
    ↓
⚠️ APPROVAL GATE 2: User Reviews & Approves Plan (MANDATORY)
    ↓
/tasks → tasks.md + tasks/*.md (committed to spec branch, NO GitHub issues yet)
    ↓
⚠️ APPROVAL GATE 3: User Reviews & Approves Tasks (MANDATORY)
    ↓
Create GitHub Sub-Issues #Y1, #Y2, ... (linked to parent #X, status: Backlog)
    ↓
Push spec branch (spec + plan + tasks)
    ↓
/implement → For Each Task (STRICTLY SEQUENTIAL):
    ├─ Create Task Branch from Spec Branch
    ├─ Implement Task (TDD)
    ├─ ⚠️ APPROVAL GATE 4a: User Approves Implementation (MANDATORY - BEFORE COMMIT)
    ├─ Commit changes
    ├─ Create PR (Task Branch → Spec Branch, closes task issue with "Closes #[task-issue]")
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
⚠️ DOCUMENTATION UPDATE: Call documentation-writer agent (MANDATORY)
    ↓
⚠️ APPROVAL GATE 5: User Approves Feature + Documentation (MANDATORY)
    ↓
Create PR (Spec Branch → Main, closes Spec Issue #X)
    ↓
Code Review with pr-reviewer Agent (Full Feature)
    ↓
⚠️ APPROVAL GATE 6: User Approves Final PR (MANDATORY)
    ↓
⚠️ CLEANUP: Delete remote task branches (optional, user approval)
    ↓
Merge to Main
    ↓
Move Parent Spec Issue to "Done" (automatic)
    ↓
⚠️ CLEANUP: Delete sub-issues from project board (optional, user approval)
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
  - Creates spec branch: `spec/###-feature-name`
  - Commits spec.md to spec branch
  - Pushes to origin
- **GitHub Issue created immediately** (parent issue):
  - Title: Short, clear feature name (e.g., `User Authentication System`)
  - Description: Brief, clear summary from spec (NOT full spec content)
  - Labels: `feature`, `spec`, priority (e.g., `P1-high`)
  - Assigned to: Architecture Agent
  - **Added to project board with status: "Backlog"**
  - Link to spec file in description

**Example**:

```bash
/specify Add user authentication with email/password and role-based permissions
```

Creates:

- `.specify/specs/001-user-authentication/spec.md`
- Spec branch: `spec/001-user-authentication`
- GitHub Issue #5: `User Authentication System` (parent issue)
  - Description: "Implement user authentication with email/password and role-based permissions for secure access control."
  - Project board: Issue added to "Backlog" column
  - Link: `.specify/specs/001-user-authentication/spec.md`

### 1.2 ⚠️ MANDATORY SPEC SIZE EVALUATION

**Immediately after spec creation, evaluate spec size to avoid large specs and big code changes.**

**Size Indicators** (any 2+ means spec is "too large"):

- More than 5 user scenarios
- More than 3 major feature areas
- Estimated 15+ tasks
- Multiple database entities (3+)
- Multiple API endpoints across different resources (10+)
- Cross-cutting concerns (auth + data + UI + workflows)

**If spec appears too large, MUST notify user**:

```
⚠️ SPEC SIZE EVALUATION

Current spec scope:
- User scenarios: 8
- Major feature areas: 4 (Auth, User Management, Permissions, Audit)
- Estimated tasks: 25-30
- Database entities: 5 (User, Role, Permission, Session, AuditLog)
- API endpoints: 18 across 4 resources
- Cross-cutting: Yes (auth + data + UI + workflows)

Assessment: **TOO LARGE** (5/6 indicators exceeded)

Suggested breakdown into smaller specs:

**Spec 001a: Basic Authentication**
- User registration and login
- JWT tokens and sessions
- Estimated: 8-10 tasks
- Scope: Auth endpoints + Session entity + Login UI

**Spec 001b: Role-Based Permissions**
- Role and Permission entities
- RBAC middleware
- Admin UI for role management
- Estimated: 8-10 tasks

**Spec 001c: Audit Logging**
- AuditLog entity
- Audit middleware
- Audit log UI
- Estimated: 6-8 tasks

Proceeding as-is will result in:
- 25-30 task PRs (harder to review)
- Longer feature branch lifetime (merge conflicts risk)
- Harder to test incrementally

Would you like to:
1. Proceed with current spec as-is
2. Split into smaller specs (recommended)
```

**User decides** whether to proceed or split. If splitting, discard current spec and create multiple smaller specs sequentially.

### 1.3 ⚠️ APPROVAL GATE 1: Review & Approve Specification (MANDATORY)

**The /specify command STOPS here and WAITS for your approval!**

**User Action Required**:

1. Review spec file at `.specify/specs/###-feature-name/spec.md`
2. Review GitHub Issue #X (check project board, currently in "Backlog")
3. Review spec branch: `spec/###-feature-name`
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

**After approval**:

1. Move spec issue to "In progress":
   ```bash
   gh issue edit #5 --add-project-v2-item-field "Status=In progress"
   ```
2. Stay on spec branch, proceed to /plan (spec branch NOT merged yet)

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

### 3.1 Generate Tasks

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
   - Sub-branch name
   - Approval tracking
4. **Git commits**:
   - Tasks committed to spec branch
   - Commit message: "feat: generate tasks for [feature-name]"
   - NOT pushed yet (waiting for approval)

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
- **NOTE**: GitHub sub-issues NOT created yet (created after approval in step 3.2)

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

2. Check that:
   - [ ] Task breakdown is complete and logical
   - [ ] Dependencies are correctly identified
   - [ ] Parallel tasks are truly independent
   - [ ] Task ordering makes sense (tests before implementation)
   - [ ] No tasks are missing or duplicated
   - [ ] **Agent assignments are correct** (based on file paths)

**To Approve**:

- ✅ Respond: "Approved, begin implementation"

**To Request Changes**:

- ❌ Comment with required changes to task breakdown
- After changes made, review again

**IMPORTANT**: Implementation CANNOT begin until you explicitly approve the task breakdown!

**After approval**:

1. **Create GitHub sub-issues for EACH task**:
   - Title: `[T###] Task description`
   - Description: Full task content from task file (description, files to modify, dependencies, acceptance criteria, implementation notes, testing requirements)
   - Labels: `feature`, `spec`, agent label (e.g., `agent:backend`), priority
   - **Assigned to**: Responsible agent role (MANDATORY)
   - **Parent issue**: Link as sub-issue to parent spec issue #X
   - **Added to project board with status**: "Backlog"

   Example:

   ```bash
   # For each task, create sub-issue and link to parent
   gh issue create --title "[T001] Create User entity model" \
     --body "$(cat .specify/specs/001-user-authentication/tasks/T001-user-entity.md)" \
     --label "feature,spec,agent:backend,P1-high" \
     --assignee @backend-agent

   # Link as sub-issue to parent issue #5
   gh issue develop #10 --parent #5

   # Add to project board
   gh project item-add 1 --owner webmint --url https://github.com/webmint/jira-clone/issues/10
   ```

2. **Push spec branch with ALL changes**:
   ```bash
   # Push spec branch with ALL changes (spec + plan + tasks)
   git push origin spec/###-feature-name
   ```

**Result after approval**:

- All task sub-issues created and linked to parent spec issue
- All sub-issues added to project board in "Backlog" column
- Spec branch pushed with all planning artifacts
- Ready for implementation

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
# Option A: Use gh issue develop to create and link branch in one command
gh issue develop 14 -n spec/001-user-authentication/T014-auth-endpoints -c

# This command will:
# 1. Create branch spec/001-user-authentication/T014-auth-endpoints from current branch
# 2. Link it to issue #14 automatically
# 3. Checkout the branch (-c flag)

# Then push to establish remote tracking
git push -u origin spec/001-user-authentication/T014-auth-endpoints

# Option B: Manual approach (if gh issue develop unavailable)
# Create sub-branch for task from spec branch
git checkout -b spec/001-user-authentication/T014-auth-endpoints

# Push branch to establish remote tracking
git push -u origin spec/001-user-authentication/T014-auth-endpoints

# Note: Branch will be linked to issue when PR is created with "Closes #14" in description

# Move issue to "In progress" status on project board
gh issue edit 14 --add-assignee @me
# Manual: Move issue card to "In progress" column on GitHub project board UI
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

#### Step 5: Commit Changes

**After receiving user approval to commit**:

```bash
# Commit changes
git add .
git commit -m "feat: implement auth controller endpoints

Refs #14"
```

**After successful commit, move issue to "Testing"**:

```bash
# Move issue to "Testing" status (implementation complete, ready for PR)
gh issue edit #14 --add-project-v2-item-field "Status=Testing"
```

#### Step 6: Create Pull Request and Move to Review

**After testing verified, create PR**:

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

# Move issue to "Review" status on project board
gh issue edit #14 --add-project-v2-item-field "Status=Review"
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

# Move issue to "Done" status and close
gh issue edit #14 --add-project-v2-item-field "Status=Done"
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

#### Step 13: ⚠️ **CLEANUP - DELETE REMOTE TASK BRANCHES** (After final PR approval)

**After final PR approved, request approval to delete all remote task branches**:

```
All tasks for spec 001-user-authentication have been completed and merged.

Remote task branches to be deleted:
- spec/001-user-authentication/T001-user-entity
- spec/001-user-authentication/T002-users-service
- spec/001-user-authentication/T003-backend-dtos
- spec/001-user-authentication/T004-auth-controller
... (total: 44 branches)

These branches are no longer needed as all changes have been merged to spec branch.

Approve deletion of remote task branches?
```

**User responds**:

- ✅ "Approved, delete branches"
- ❌ "Keep branches" → Skip cleanup

**If approved, delete all remote task branches**:

```bash
# Delete each remote task branch
git push origin --delete spec/001-user-authentication/T001-user-entity
git push origin --delete spec/001-user-authentication/T002-users-service
git push origin --delete spec/001-user-authentication/T003-backend-dtos
# ... for all task branches
```

**Result**: Repository cleaned up, only spec branch and main remain.

#### Step 14: ⚠️ **MERGE PR TO MAIN** (After branch cleanup approval)

**After branch cleanup (or skip), merge the final PR**:

```bash
# Merge final PR to main
gh pr merge YY --squash
```

**Verify merge completed successfully**:

```bash
# Verify PR is merged
gh pr view YY

# Switch to main branch and pull
git checkout main
git pull origin main

# Verify spec changes are in main
git log --oneline -5
```

**After merge confirmed, move parent spec issue to "Done" on project board**:

```bash
# Move parent spec issue #5 to "Done" status
gh issue edit #5 --add-project-v2-item-field "Status=Done"
```

#### Step 15: ⚠️ **CLEANUP SUB-ISSUES** (After spec issue moved to Done)

**After parent spec issue moved to "Done", request approval to delete all sub-issues from project board**:

```
Spec 001-user-authentication has been merged to main.

Sub-issues (tasks) to be deleted from project board:
- #10: [T001] Create User entity model
- #11: [T002] Create UsersService
- #12: [T003] Backend DTOs
- #13: [T004] Auth controller
... (total: 44 sub-issues)

These sub-issues are now complete and no longer needed on the project board.
The parent issue #5 will remain in "Done" status as a record of the feature.

Approve deletion of sub-issues from project board?
```

**User responds**:

- ✅ "Approved, delete sub-issues"
- ❌ "Keep sub-issues" → Skip cleanup

**If approved, delete all sub-issues from project board and close them**:

```bash
# For each sub-issue, remove from project and close
gh issue close #10 --reason completed
gh issue close #11 --reason completed
gh issue close #12 --reason completed
# ... for all sub-issues
```

**Result**:

- Final PR merged to main
- Parent spec issue moved to "Done" (kept as feature record)
- All sub-issues closed and removed from board (cleanup)
- Feature complete and project board clean

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

### 5.2 ⚠️ **DOCUMENTATION UPDATE** (MANDATORY)

**After all tasks complete and tests pass, call documentation-writer agent**:

```typescript
// Use Task tool to invoke documentation-writer agent
Task({
  subagent_type: 'documentation-writer',
  description: 'Document feature changes',
  prompt: `Feature 001-user-authentication is complete. Please:

1. Review all changes in the spec branch
2. Identify new features, components, APIs, and code that need documentation
3. Update existing documentation that has changed
4. Create new documentation as needed:
   - README updates for new features
   - API documentation for new endpoints
   - Component documentation for new UI components
   - Architecture Decision Records (ADRs) if applicable
   - Usage examples and guides

Files to review:
- All files changed in spec/001-user-authentication branch
- Backend endpoints: auth controller, users service, entities
- Frontend components: login, registration, user management
- Common types and DTOs

Please document comprehensively and update all relevant docs.`,
});
```

**The documentation-writer agent will**:

- Review all code changes in the spec branch
- Identify what needs documentation (new features, APIs, components)
- Create/update documentation files:
  - README files
  - API documentation
  - Component documentation (props, usage)
  - ADRs for architectural decisions
  - Usage examples
- Commit documentation changes to spec branch
- Report what was documented

**After documentation-writer completes**:

```bash
# Review documentation changes
git diff origin/main...HEAD -- "*.md" "docs/"

# If documentation changes exist, commit them
git add .
git commit -m "docs: update documentation for user authentication feature

- Add API documentation for auth endpoints
- Document new Vue components
- Update README with authentication setup
- Add ADR for authentication strategy

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push documentation updates
git push origin spec/001-user-authentication
```

### 5.3 ⚠️ **WAIT FOR USER APPROVAL** (MANDATORY)

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

Documentation Updates:
- API documentation for auth endpoints
- Component documentation for login/registration UI
- README updated with authentication setup guide
- ADR-001: User Authentication Strategy

Waiting for approval to create final PR to main.
```

**User reviews and responds**:

- ✅ "Approved, create PR to main"
- ❌ "Please test X scenario first" → Test, fix if needed, request approval again
- ❌ "Update documentation for X" → Make changes, request approval again

### 5.4 Create Final PR to Main

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

### Status Column Values

1. **Backlog** - All new issues and tasks start here
2. **In progress** - Currently being worked on
3. **Testing** - Implementation complete, testing in progress
4. **Review** - PR created, awaiting code review and approval
5. **Done** - Completed and merged

### Issue Movement Workflow

**Parent Spec Issue:**

- **Backlog** → Created during `/specify`
- **In progress** → Moved after spec approval (when starting `/plan`)
- **Testing** → Moved after all task sub-issues complete
- **Review** → Moved when final PR created (spec→main)
- **Done** → **Explicitly moved after PR merge to main is confirmed** (Step 14)

**Task Sub-Issues:**

- **Backlog** → Created after `/tasks` approval
- **In progress** → Moved when task implementation begins (Step 2)
- **Testing** → Moved after implementation complete, tests passing (Step 4)
- **Review** → Moved when task PR created (Step 6)
- **Done** → Moved when task PR merged to spec branch (Step 9)

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

### Gate 5: After All Tasks Complete + Documentation (BEFORE FINAL PR)

**Required**: User must approve entire feature including documentation before creating final PR
**What to review**:

- Full feature functionality
- All tests passing across all workspaces
- **Documentation completeness** (created by documentation-writer agent):
  - API documentation for new endpoints
  - Component documentation for new UI components
  - README updates
  - ADRs for architectural decisions
  - Usage examples and guides
- Documentation accuracy and clarity

### Gate 6: After Final PR Created (BEFORE MERGE to Main)

**Required**: User must approve final PR after pr-reviewer agent comprehensive review
**What to review**:

- Final PR from spec branch to main
- pr-reviewer agent comprehensive feature review
- Breaking changes analysis
- Migration guide if needed
- All quality gates passing

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
spec/###-feature-name                      # Spec/Feature branch
spec/###-feature-name/T###-task-name       # Task sub-branch
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

This workflow is mandated by Constitution v2.10.4:

- Article III, Section 3.1: Specification-First Process (with git workflow + spec size evaluation + 7 approval gates + documentation step + branch cleanup + spec issue status update + sub-issue cleanup)
- Article III, Section 3.4: GitHub Integration & Branch Strategy
- Article III, Section 3.5: Issue and PR Protocol
- Article IV, Section 4.4: Git Standards
- Article XII: GitHub Project Board (5 status columns)
- Article XIV, Section 14.4: workflow.md Synchronization (MANDATORY)

**Key Changes in v2.10.2**:

- **Husky Removed**: Removed all Husky pre-commit hook handling from workflow
  - Simplified Step 5: "Commit with Husky Pre-commit Hooks" → "Commit Changes"
  - Removed Pre-commit Hook Failure Protocol (user approval gates for hook failures)
  - Removed Husky from documentation description
  - Workflow now focuses on direct git commits without hook complexity
- **GitHub Issue URL Linking** (MANDATORY): Added bidirectional linking requirements
  - **Spec.md**: MUST store GitHub parent issue URL in spec.md header after issue created
  - **Task files**: MUST store GitHub sub-issue URLs in task files after sub-issues created
  - Ensures traceability between spec/task files and GitHub issues
- **`Closes #[issue]` Keyword** (MANDATORY): Explicitly required in all PR descriptions
  - Task PRs (sub-branch → spec branch): MUST include `Closes #[task-issue]`
  - Final PRs (spec branch → main): MUST include `Closes #[spec-issue]`
  - Automatic issue closing when PR merges with Closes keyword
  - Updated overview diagram and Step 6 to show `Closes` requirement
- **workflow.md Sync Requirement**: Added to constitution Article XIV, Section 14.4
  - workflow.md MUST be updated when constitution is amended
  - Version numbers MUST match between constitution.md and workflow.md
  - Both documents co-located in `.specify/memory/` for consistency
  - Ensures operational procedures stay synchronized with constitutional principles

**Key Changes in v2.9.4**:

- **Explicit Spec Issue Status Update**: After spec PR merged to main, explicitly move parent spec issue to "Done" status
  - Added merge verification step to confirm PR merge
  - Spec issue moved to "Done" BEFORE requesting sub-issue cleanup
  - Ensures proper sequencing of cleanup operations
  - Split into two steps: Step 14 (merge + status update), Step 15 (sub-issue cleanup)
  - Updated overview diagram to show spec issue status update

**Key Changes in v2.9.3**:

- **MANDATORY Documentation Step**: After all tasks complete, call documentation-writer agent before final PR
  - Agent reviews all code changes in spec branch
  - Creates/updates: README, API docs, component docs, ADRs, usage examples
  - Commits documentation changes to spec branch
  - Documentation reviewed and approved with feature (Gate 5)
  - Ensures all new features properly documented before merge
  - Phase 5, Section 5.2 in workflow

**Key Changes in v2.9.2**:

- **Sub-Issue Cleanup**: After spec PR merge to main, request user approval to delete all sub-issues from project board
  - Keeps project board clean after spec completion
  - Parent spec issue remains in "Done" as feature record
  - User can approve or skip cleanup
  - Step 14 in Phase 4 workflow

**Key Changes in v2.9.1**:

- **Remote Task Branch Cleanup**: After final PR approval, request user approval to delete all remote task branches
  - Keeps repository clean after spec completion
  - User can approve or skip cleanup
  - Step 13 in Phase 4 workflow

**Key Changes in v2.9.0**:

- **MANDATORY Spec Size Evaluation**: Added evaluation step immediately after spec creation to avoid large specs and big code changes
  - 6 size indicators: user scenarios, feature areas, estimated tasks, DB entities, API endpoints, cross-cutting concerns
  - MUST notify user if spec appears too large (2+ indicators exceeded)
  - MUST suggest breakdown into smaller specs with reasoning
  - User decides whether to proceed or split
  - Goal: Prevent large PRs, reduce merge conflicts, enable incremental testing

**Key Changes in v2.8.0**:

- **GitHub Issue Workflow Updated**:
  - **Spec → Parent Issue**: GitHub issue created IMMEDIATELY when spec is defined (not after approval)
  - **Issue Status**: Parent issue added to project board with status "Backlog" (not "Spec & Design")
  - **Issue Description**: Brief, clear summary from spec (NOT full spec content)
  - **Tasks → Sub-Issues**: GitHub sub-issues created AFTER user approval (not during /tasks)
  - **Sub-Issue Linking**: All task sub-issues linked as children to parent spec issue
  - **Sub-Issue Status**: All sub-issues added to project board with status "Backlog"
- **Approval Gate 4a**: User must approve implementation BEFORE committing (mandatory review of code changes, test results, coverage)
- **Approval Gate 4b**: User must approve PR BEFORE merging (after pr-reviewer agent code review)
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
