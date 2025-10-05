# Tasks: Storybook Setup for Design Preview

**Input**: Design documents from `/specs/001-setup-storybook-for/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/, quickstart.md

## Summary

This task breakdown implements Storybook 8.x for the Jira Clone project to enable design preview workflow. The implementation includes:

- Storybook installation and configuration
- Vue 3 + Vite + Tailwind CSS 4.0 integration
- Accessibility testing setup (WCAG 2.1 AA)
- Example component with comprehensive stories
- Documentation and validation

**Total Tasks**: 13
**Estimated Time**: 8-12 hours
**Agent Distribution**: DevOps (5), Design (3), Frontend (2), Testing (2), Architecture (1)

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Setup & Dependencies

- [ ] **T001** [P] Install Storybook 8.x and required dependencies in `front/package.json`
- [ ] **T002** [P] Create Storybook main configuration in `front/.storybook/main.ts`
- [ ] **T003** [P] Create Storybook preview configuration in `front/.storybook/preview.ts`

**Parallel Execution**: T001, T002, T003 can run together (different files, independent)

```bash
# Launch T001-T003 in parallel:
Task: "Install Storybook dependencies"
Task: "Create main.ts configuration"
Task: "Create preview.ts configuration"
```

## Phase 3.2: Integration & Configuration

- [ ] **T004** Configure Tailwind CSS integration in `front/.storybook/preview.ts` (depends on T003)
- [ ] **T005** Add Storybook npm scripts to `front/package.json` (depends on T001)
- [ ] **T006** [P] Create viewport configurations for mobile-first responsive design in `front/.storybook/preview.ts` (depends on T003)

## Phase 3.3: Documentation

- [ ] **T007** [P] Create ADR for Storybook adoption in `docs/adr/001-storybook-adoption.md`
- [ ] **T008** [P] Create Storybook usage guide in `front/README.md`

**Parallel Execution**: T007, T008 can run together (different files)

## Phase 3.4: Example Components & Stories

- [ ] **T009** Create example Button component in `front/src/components/atoms/Button/Button.vue`
- [ ] **T010** Create Button component stories in `front/src/components/atoms/Button/Button.stories.ts` (depends on T009)
- [ ] **T011** Add interaction tests to Button stories using @storybook/test (depends on T010)

## Phase 3.5: Testing & Validation

- [ ] **T012** [P] Configure Storybook test runner in `front/.storybook/test-runner.ts`
- [ ] **T013** Validate all quickstart scenarios pass (manual testing guide)

## Dependencies

### Dependency Graph

```
Setup Phase (T001-T003) [All parallel]
    ↓
Integration Phase (T004-T006)
    T003 → T004 (Tailwind in preview.ts)
    T001 → T005 (npm scripts)
    T003 → T006 (viewport config)
    ↓
Documentation Phase (T007-T008) [All parallel, can start anytime]
    ↓
Example Component Phase (T009-T011) [Sequential]
    T009 → T010 → T011
    ↓
Validation Phase (T012-T013)
    T012 [parallel with T013 start]
    T013 (final validation)
```

### Task Dependencies Detail

- **T001-T003**: No dependencies, run in parallel
- **T004**: Depends on T003 (modifies same file)
- **T005**: Depends on T001 (modifies same file)
- **T006**: Depends on T003 (modifies same file)
- **T007-T008**: No dependencies, run in parallel anytime
- **T009**: Depends on T001-T006 complete (needs Storybook working)
- **T010**: Depends on T009 (references component)
- **T011**: Depends on T010 (modifies same story file)
- **T012**: Can start after T001-T006 complete
- **T013**: Final task, depends on all others complete

## Branch Strategy

**Spec Branch**: `spec/001-setup-storybook-for` (contains spec + plan + tasks)

**Task Sub-branches**: Each task gets its own branch from spec branch

- Format: `spec/001-setup-storybook-for/T###-task-name`
- Examples:
  - `spec/001-setup-storybook-for/T001-install-storybook`
  - `spec/001-setup-storybook-for/T002-create-main-config`
  - `spec/001-setup-storybook-for/T009-create-button-component`

**Workflow for Each Task (SEQUENTIAL - MANDATORY)**:

1. **BEFORE starting new task**: Verify previous task PR merged to spec branch
2. Pull latest from spec branch: `git checkout spec/001-setup-storybook-for && git pull`
3. Create task sub-branch: `git checkout -b spec/001-setup-storybook-for/T###-task-name`
4. Implement task on sub-branch (TDD workflow if applicable)
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
   - Push task branch: `git push origin spec/001-setup-storybook-for/T###-task-name`
   - Create PR: `spec/001-setup-storybook-for/T###-task-name` → `spec/001-setup-storybook-for`
   - Wait for PR merge
9. After PR merged:
   - Switch to spec branch: `git checkout spec/001-setup-storybook-for`
   - Pull latest changes: `git pull`
   - **ONLY THEN** proceed to next task

**Final PR**: After ALL tasks merged to spec branch

- Run full test suite on spec branch
- **WAIT FOR USER APPROVAL** of entire feature (MANDATORY)
- Create PR: `spec/001-setup-storybook-for` → `main`
- Closes parent spec issue

## Parallel Execution Examples

### Example 1: Initial Setup (T001-T003)

All three tasks modify different files and have no dependencies:

```typescript
// Can be launched simultaneously
await Promise.all([
  Task('Install Storybook 8.x dependencies'),
  Task('Create .storybook/main.ts'),
  Task('Create .storybook/preview.ts'),
]);
```

### Example 2: Documentation (T007-T008)

Both tasks create new files independently:

```typescript
await Promise.all([
  Task('Create ADR for Storybook adoption'),
  Task('Create Storybook usage guide'),
]);
```

## GitHub Integration

**Parent Spec Issue**: TBD (will be created)
**Spec Branch**: `spec/001-setup-storybook-for`
**Task Issues**: Will be created for each task (T001-T013)

Each task issue will include:

- Title: `[T###] Task description`
- Labels: `feature`, `spec`, `agent:devops`/`agent:design`/`agent:frontend`/`agent:testing`, `P1-high`
- Assignee: Responsible agent
- Body: Link to task file + parent spec issue
- Project board: "📋 Backlog" column

## Agent Assignment

- **DevOps Agent (5 tasks)**: T001, T002, T003, T005, T012
- **Design Agent (3 tasks)**: T006, T010, T011
- **Frontend Agent (2 tasks)**: T004, T009
- **Testing Agent (2 tasks)**: T012 (shared with DevOps), T013
- **Architecture Agent (1 task)**: T007
- **Documentation (1 task)**: T008

## Task Details

### Phase 3.1: Setup & Dependencies

#### T001: Install Storybook Dependencies [P]

**Agent**: agent:devops
**Files**: `front/package.json`
**Priority**: P1-high
**Parallel**: Yes

Install Storybook 8.x and all required dependencies in the frontend workspace.

**Dependencies to install**:

- @storybook/vue3 ^8.0.0
- @storybook/vue3-vite ^8.0.0
- @storybook/addon-essentials ^8.0.0
- @storybook/addon-interactions ^8.0.0
- @storybook/addon-links ^8.0.0
- @storybook/addon-a11y ^8.0.0
- @storybook/addon-themes ^8.0.0
- @storybook/test ^8.0.0
- @storybook/test-runner ^0.17.0
- storybook ^8.0.0

#### T002: Create Storybook Main Configuration [P]

**Agent**: agent:devops
**Files**: `front/.storybook/main.ts`
**Priority**: P1-high
**Parallel**: Yes

Create the main Storybook configuration file with framework, addons, and story patterns.

**Configuration includes**:

- Framework: @storybook/vue3-vite
- Stories glob pattern: `../src/**/*.stories.@(js|jsx|ts|tsx)`
- All required addons
- TypeScript configuration
- Static directories

#### T003: Create Storybook Preview Configuration [P]

**Agent**: agent:devops
**Files**: `front/.storybook/preview.ts`
**Priority**: P1-high
**Parallel**: Yes

Create the preview configuration file with global parameters and decorators.

**Configuration includes**:

- Parameters for controls, actions
- Viewport base configuration
- Background colors
- Global decorators (if needed)

### Phase 3.2: Integration & Configuration

#### T004: Configure Tailwind CSS Integration

**Agent**: agent:frontend
**Files**: `front/.storybook/preview.ts`
**Priority**: P1-high
**Depends on**: T003

Add Tailwind CSS import to preview.ts to ensure all Tailwind utilities are available in stories.

**Implementation**:

- Import main CSS file containing Tailwind directives
- Verify Vite PostCSS processing works
- Test Tailwind classes render correctly

#### T005: Add Storybook npm Scripts

**Agent**: agent:devops
**Files**: `front/package.json`
**Priority**: P1-high
**Depends on**: T001

Add npm scripts for running Storybook dev server, building, and testing.

**Scripts to add**:

- `"storybook": "storybook dev -p 6006"`
- `"build-storybook": "storybook build"`
- `"test-storybook": "test-storybook"`

#### T006: Configure Viewport Configurations [P]

**Agent**: agent:design
**Files**: `front/.storybook/preview.ts`
**Priority**: P1-high
**Depends on**: T003

Add mobile-first viewport configurations for responsive design testing.

**Viewports to configure**:

- Mobile: 375px x 667px
- Tablet: 768px x 1024px
- Desktop: 1440px x 900px
- Default viewport: mobile (mobile-first)

### Phase 3.3: Documentation

#### T007: Create ADR for Storybook Adoption [P]

**Agent**: agent:architecture
**Files**: `docs/adr/001-storybook-adoption.md`
**Priority**: P2-medium

Document the architectural decision to adopt Storybook for component development.

**ADR sections**:

- Status: Accepted
- Context: Need for component preview system
- Decision: Storybook 8 with Vue 3 + Vite
- Consequences: Benefits and trade-offs
- Alternatives considered

#### T008: Create Storybook Usage Guide [P]

**Agent**: agent:design
**Files**: `front/README.md`
**Priority**: P2-medium

Create comprehensive usage guide for developers using Storybook.

**Guide includes**:

- How to run Storybook
- How to create stories
- Story naming conventions
- Best practices
- Troubleshooting

### Phase 3.4: Example Components & Stories

#### T009: Create Example Button Component

**Agent**: agent:frontend
**Files**: `front/src/components/atoms/Button/Button.vue`
**Priority**: P1-high
**Depends on**: T001-T006 complete

Create an example Button component demonstrating all design system patterns.

**Component features**:

- Props: label, variant, size, disabled, loading
- Variants: primary, secondary, danger, ghost
- Sizes: sm, md, lg
- States: default, hover, active, disabled, loading
- Tailwind CSS styling
- TypeScript with proper prop types

#### T010: Create Button Component Stories

**Agent**: agent:design
**Files**: `front/src/components/atoms/Button/Button.stories.ts`
**Priority**: P1-high
**Depends on**: T009

Create comprehensive stories for the Button component using CSF3 format.

**Stories to create**:

- Primary, Secondary, Danger, Ghost (variants)
- Small, Medium, Large (sizes)
- Disabled, Loading (states)
- All combinations demonstrating component flexibility
- Auto-docs enabled

#### T011: Add Interaction Tests to Button Stories

**Agent**: agent:design
**Files**: `front/src/components/atoms/Button/Button.stories.ts`
**Priority**: P1-high
**Depends on**: T010

Add interaction tests using @storybook/test to validate component behavior.

**Tests to add**:

- Click interaction test
- Disabled state test
- Loading state test
- Keyboard navigation test

### Phase 3.5: Testing & Validation

#### T012: Configure Storybook Test Runner [P]

**Agent**: agent:testing
**Files**: `front/.storybook/test-runner.ts`
**Priority**: P2-medium

Configure the Storybook test runner for CI/CD integration.

**Configuration includes**:

- Test runner setup
- Accessibility checks integration
- Custom test hooks (if needed)
- CI/CD compatibility

#### T013: Validate Quickstart Scenarios

**Agent**: agent:testing
**Files**: None (manual validation)
**Priority**: P1-high
**Depends on**: All tasks complete

Execute all 10 quickstart scenarios from `quickstart.md` and verify they pass.

**Scenarios to validate**:

1. Installation verification
2. Configuration files exist
3. Dev server starts
4. Stories viewable
5. Viewport switching
6. Accessibility testing
7. Interaction testing
8. Tailwind CSS integration
9. Production build
10. HMR functionality

## Validation Checklist

_GATE: Checked before completion_

- [x] All configuration files created
- [x] All dependencies installed
- [x] Example component demonstrates best practices
- [x] Documentation complete
- [x] Tests configured
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [ ] ⚠️ User approval obtained for tasks

## Notes

- **[P] tasks**: Different files, can run in parallel
- **Sequential tasks**: Must wait for dependencies
- **TDD not strict**: This is infrastructure setup, not feature implementation
- **Commit after each task**: Keep changes atomic and reviewable
- **User approval mandatory**: Before each PR and final merge

## ⚠️ APPROVAL GATE

**MANDATORY**: User must review and approve task breakdown before implementation begins.

**Review Checklist for User**:

- [ ] Task breakdown is complete and logical
- [ ] Dependencies are correctly identified
- [ ] Parallel tasks are truly independent
- [ ] Task ordering makes sense
- [ ] No tasks are missing or duplicated
- [ ] Agent assignments appropriate

**Deliverables to Review**:

- `tasks.md` - This file (complete task breakdown with summary)
- `tasks/` folder - Individual task files (T001-T013)
- Spec branch: `spec/001-setup-storybook-for`
- GitHub issues: Will be created for each task

**After Review**:

- ✅ **APPROVED**: Respond with "Approved, begin implementation"
- ❌ **CHANGES NEEDED**: Comment with required changes to task breakdown

**Next Step**: After user approval, begin implementing tasks sequentially with sub-branches and PRs

---

_Based on plan.md, research.md, data-model.md, contracts/storybook-config-contract.ts, and quickstart.md_
