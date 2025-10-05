s# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)

```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure, feature number
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Create tasks/ folder: .specify/specs/[###-feature-name]/tasks/
10. For EACH task, create individual task file:
    → File: tasks/T###-task-name.md
    → Content: Task description, file paths, dependencies, acceptance criteria
    → Format: Markdown with checklist
    → Assign agent based on task type (backend/frontend/common/testing/etc)
11. Commit task files to git:
    → Ensure on spec branch: spec/[###-feature-name]
    → git add .specify/specs/[###-feature-name]/tasks.md
    → git add .specify/specs/[###-feature-name]/tasks/
    → git commit -m "feat: generate tasks for [feature-name]"
    → Do NOT push yet (wait for approval)
12. Create GitHub issue for EACH task:
    → Title: "[T###] Task description"
    → Labels: "feature", "spec", agent label (agent:backend/frontend/etc), priority (P1/P2/P3)
    → Assignee: Responsible agent (GitHub username or team)
    → Body: Task details + link to parent spec issue + link to task file in git
    → Add to project board column: "📋 Backlog"
13. ⚠️ STOP and WAIT FOR USER APPROVAL (MANDATORY)
    → Display: "Tasks generated. Review deliverables:"
    → Display: "  - tasks.md (task breakdown with dependencies)"
    → Display: "  - tasks/ folder with XX individual task files"
    → Display: "  - Spec branch: spec/[###-name]"
    → Display: "  - XX GitHub issues created and added to project board"
    → Display: "  - All files committed to spec branch (not pushed yet)"
    → Display: "WAITING FOR APPROVAL to proceed with implementation"
    → User must explicitly approve before implementation begins
14. After approval:
    → Push spec branch with all changes (spec + plan + tasks)
    → git push origin spec/[###-feature-name]
    → Do NOT create PR to main yet
    → Proceed to /implement command
15. Return: SUCCESS (tasks approved, ready for implementation)
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Individual Task File Format

Each task saved as: `tasks/T###-task-name.md`

**Template**:

```markdown
# Task T###: [Task Name]

**Status**: Pending | In Progress | Complete
**Priority**: [P1/P2/P3]
**Agent**: [agent:backend/frontend/etc]
**Parallel**: [Yes/No]
**Depends On**: [T###, T###] or None

## Description

[Detailed task description]

## Files to Create/Modify

- `path/to/file1.ts` - [Purpose]
- `path/to/file2.ts` - [Purpose]

## Dependencies

**Blocks**: [T###, T###] (tasks that depend on this)
**Blocked By**: [T###, T###] (tasks this depends on)

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
- [ ] Tests passing
- [ ] Code coverage meets minimum
- [ ] ESLint: 0 errors

## Implementation Notes

[Any specific guidance, patterns to follow, edge cases to consider]

## Testing Requirements

- [ ] Unit tests for [component]
- [ ] Integration tests for [flow]
- [ ] Test coverage: XX%

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `feature/[###-feature-name]/T###-task-name`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [ ] T004 [P] Contract test POST /api/users in tests/contract/test_users_post.py
- [ ] T005 [P] Contract test GET /api/users/{id} in tests/contract/test_users_get.py
- [ ] T006 [P] Integration test user registration in tests/integration/test_registration.py
- [ ] T007 [P] Integration test auth flow in tests/integration/test_auth.py

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [ ] T008 [P] User model in src/models/user.py
- [ ] T009 [P] UserService CRUD in src/services/user_service.py
- [ ] T010 [P] CLI --create-user in src/cli/user_commands.py
- [ ] T011 POST /api/users endpoint
- [ ] T012 GET /api/users/{id} endpoint
- [ ] T013 Input validation
- [ ] T014 Error handling and logging

## Phase 3.4: Integration

- [ ] T015 Connect UserService to DB
- [ ] T016 Auth middleware
- [ ] T017 Request/response logging
- [ ] T018 CORS and security headers

## Phase 3.5: Polish

- [ ] T019 [P] Unit tests for validation in tests/unit/test_validation.py
- [ ] T020 Performance tests (<200ms)
- [ ] T021 [P] Update docs/api.md
- [ ] T022 Remove duplication
- [ ] T023 Run manual-testing.md

## Dependencies

- Tests (T004-T007) before implementation (T008-T014)
- T008 blocks T009, T015
- T016 blocks T018
- Implementation before polish (T019-T023)

## Parallel Example

```
# Launch T004-T007 together:
Task: "Contract test POST /api/users in tests/contract/test_users_post.py"
Task: "Contract test GET /api/users/{id} in tests/contract/test_users_get.py"
Task: "Integration test registration in tests/integration/test_registration.py"
Task: "Integration test auth in tests/integration/test_auth.py"
```

## Branch Strategy

**Spec Branch**: `spec/[###-feature-name]` (created from `main`, contains spec + plan + tasks)

**Task Sub-branches**: Each task gets its own branch from spec branch

- Format: `spec/[###-feature-name]/T###-task-name`
- Example: `spec/001-user-auth/T014-auth-endpoints`

**Workflow for Each Task (SEQUENTIAL - MANDATORY)**:

1. **BEFORE starting new task**: Verify previous task PR merged to spec branch
2. Pull latest from spec branch
3. Create task sub-branch from spec branch
4. Implement task on sub-branch (TDD workflow)
5. Run quality gates (tests, linting, build)
6. Attempt git commit:
   - If Husky pre-commit hooks FAIL:
     - **STOP** - display errors to user
     - Ask: "Pre-commit hooks failed. Approve fixes for: [errors]?"
     - **WAIT FOR USER APPROVAL** (MANDATORY)
     - Fix errors after approval
     - Retry commit
   - If hooks PASS: commit succeeds
7. **WAIT FOR USER APPROVAL** of completed task (MANDATORY)
8. After approval:
   - Push task branch to origin
   - Create PR: `spec/[###-name]/T###-task` → `spec/[###-name]`
   - Wait for PR merge
9. After PR merged:
   - Switch to spec branch
   - Pull latest changes
   - **ONLY THEN** proceed to next task

**Final PR**: After ALL tasks merged to spec branch

- Run full test suite on spec branch
- **WAIT FOR USER APPROVAL** of entire feature (MANDATORY)
- Create PR: `spec/[###-name]` → `main`
- Closes parent spec issue

## GitHub Integration

**Parent Spec Issue**: #[spec-issue-number]
**Spec Branch**: `spec/[###-feature-name]`
**Task Issues**: Created for each task below

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Each task = separate sub-branch
- **MANDATORY**: Get user approval before creating PR
- Commit after each task milestone
- Avoid: vague tasks, same file conflicts

## Task Generation Rules

_Applied during main() execution_

1. **Task Sizing Guidelines (MANDATORY)**:
   - Each task should be **meaningful but focused** - not too big, not too granular
   - **Good task size**: 1-3 related files, single responsibility, ~1-3 hours work
   - **Too big**: Multiple unrelated concerns, 5+ files, >4 hours work → split into multiple tasks
   - **Too small**: Single import, one-line change, trivial refactor → combine with related work
   - **Examples of good tasks**:
     - "Create User entity with validation" (model + validation rules)
     - "Implement UsersService CRUD operations" (service with all methods)
     - "Create authentication DTOs" (login, register, refresh DTOs together)
     - "Build ProjectCard component with Storybook story" (component + styles + story)
   - **Examples of too granular** (avoid):
     - "Add email field to User entity"
     - "Create UserDto class"
     - "Add import statement"
     - "Fix typo in variable name"
   - **Examples of too big** (split into multiple):
     - "Implement entire authentication system" → split into: entity, service, controller, DTOs, middleware
     - "Build user dashboard with all features" → split by feature/component
     - "Create all project management components" → one task per component

2. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task (but group related endpoints if natural)

3. **From Data Model**:
   - Each entity → model creation task [P] (entity + validation together)
   - Relationships → service layer tasks

4. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

5. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

6. **Agent Assignment** (MANDATORY):
   - Tasks modifying `back/` → assign to `agent:backend`
   - Tasks modifying `front/` → assign to `agent:frontend`
   - Tasks modifying `common/` → assign to `agent:common`
   - Test-only tasks → assign to `agent:testing`
   - DevOps/CI tasks → assign to `agent:devops`
   - Design/UI tasks → assign to `agent:design`
   - Architecture decisions → assign to `agent:architecture`

## Validation Checklist

_GATE: Checked by main() before returning_

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
- [ ] ⚠️ User approval obtained for tasks

## ⚠️ APPROVAL GATE

**MANDATORY**: User must review and approve task breakdown before implementation begins.

**Review Checklist for User**:

- [ ] Task breakdown is complete and logical
- [ ] Dependencies are correctly identified
- [ ] Parallel tasks are truly independent
- [ ] Task ordering makes sense (tests before implementation)
- [ ] No tasks are missing or duplicated
- [ ] GitHub issues created for all tasks

**Deliverables to Review**:

- `tasks.md` - This file (complete task breakdown with summary)
- `tasks/` folder - Individual task files for each task
  - `tasks/T001-task-name.md`
  - `tasks/T002-task-name.md`
  - ... (one file per task)
- Feature branch: `feature/[###-name]` (created in repository)
- GitHub issues for each task (check issue tracker)

**After Review**:

- ✅ **APPROVED**: Respond with "Approved, begin implementation"
- ❌ **CHANGES NEEDED**: Comment with required changes to task breakdown

**Next Step**: After user approval, begin implementing tasks one by one
