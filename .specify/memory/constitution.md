<!--
Sync Impact Report:
Version: 2.9.4 → 2.10.0 (MINOR - mandatory branch naming convention)
Modified Principles:
  - Article IV, Section 4.4: Git Standards (MANDATORY) - Branch naming made absolute requirement
  - Changed prefix from "feature/" to "spec/" matching WORKFLOW.md
  - Added explicit hierarchical structure requirement: spec/<feature-id>/<task-id>
  - Made violation = constitution violation = PR rejection
Added Sections:
  - Mandatory branch naming requirements with examples
  - Explicit consequences for non-compliance
  - Multiple examples including current feature 004
Removed Sections:
  - Old "feature/" prefix examples
Templates Status:
  ✅ WORKFLOW.md - Already uses spec/ prefix (no changes needed)
  ⚠️  All agents must follow spec/ prefix for branches
Follow-up TODOs:
  - Fix current task branch from T001-write-component-unit-tests to spec/004-uibutton-component-you/T001-write-component-unit-tests
-->

# Jira Clone Project Constitution

**Version**: 2.10.0
**Ratified**: 2025-10-04
**Last Amended**: 2025-10-08
**Status**: Active

---

## Preamble

This constitution establishes the foundational principles, standards, and governance model for the Jira Clone project. All contributors, whether human developers or AI agents, must adhere to these principles to ensure consistency, quality, and maintainability throughout the project lifecycle.

**Project Vision**: We build a professional, accessible, and maintainable project management tool that demonstrates excellence in modern web development practices.

---

## Article I: Core Principles

### Section 1.1: Fundamental Values

**1. Quality Over Speed**

- We prioritize correctness and maintainability over rapid delivery
- Technical debt is minimized through proper planning and implementation
- Code is written once but read many times

**2. Specification-First Development** (NON-NEGOTIABLE)

- No code is written without a specification
- All features must have written requirements before implementation
- Architecture decisions are documented in ADRs (Architecture Decision Records)
- Workflow: `Idea → Specification → Design → Implementation → Testing → Review → Merge`

**3. Consistency is Paramount**

- Design system rules are absolute
- Code style is enforced, not suggested
- Patterns established must be followed

**4. Accessibility is Non-Negotiable**

- WCAG 2.1 AA compliance is mandatory for all features
- Keyboard navigation must work everywhere
- Screen readers must be supported
- Color contrast ratio ≥ 4.5:1

**5. Security by Design**

- Security is considered from the start, not added later
- Input validation is mandatory on both client and server
- Authentication and authorization are never optional
- Security issues are P0 and block all other work

**6. Testability is Required**

- All code must be testable
- Critical paths require 100% test coverage
- Tests are maintained with the same care as production code

**7. Agent-Based Task Delegation** (NON-NEGOTIABLE)

- Specialized agents MUST be used for complex, multi-step tasks
- Direct implementation without agents is ONLY permitted for trivial, single-file operations
- This principle ensures efficient use of computational resources and parallel task execution

---

## Article II: Code Quality Standards (NON-NEGOTIABLE)

### Section 2.1: Frontend Code Quality

**ABSOLUTE REQUIREMENTS:**

1. **ESLint Compliance**
   - ZERO ESLint errors permitted in any PR
   - Airbnb TypeScript style guide is law
   - Vue 3 recommended rules are mandatory
   - Prettier formatting enforced via pre-commit hooks

2. **TypeScript Strict Mode**
   - Strict mode enabled in all projects
   - No `any` types without explicit justification in code comments
   - All functions must have proper type annotations
   - Strict null checks enabled
   - No type assertions without documented reason

3. **Vue 3 Standards**
   - Always use `<script setup lang="ts">`
   - Type-based props and emits only
   - Multi-word component names (PascalCase)
   - No `v-html` without security review
   - Composition API preferred over Options API

### Section 2.2: Backend Code Quality

**ABSOLUTE REQUIREMENTS:**

1. **NestJS Best Practices**
   - Dependency injection everywhere
   - Proper module organization
   - DTOs (Data Transfer Objects) for all endpoints
   - Validation pipes required
   - Service layer abstracts data access

2. **Firebase Integration**
   - No direct Firestore calls in controllers
   - Service layer abstracts Firebase
   - Transactions for multi-document operations
   - Security rules reviewed before production

### Section 2.3: Common Package Standards

1. **Type Safety**
   - All shared types documented with JSDoc
   - Zod schemas for runtime validation
   - No circular dependencies
   - Proper exports in index.ts

2. **Documentation**
   - Public APIs must have JSDoc/TSDoc comments
   - Complex algorithms must be explained
   - Business logic must include rationale

### Section 2.4: Quality Gates (MANDATORY)

**All code must pass these gates before merge:**

- ✅ **ESLint**: 0 errors, 0 warnings
- ✅ **TypeScript**: 0 compilation errors
- ✅ **Tests**: All tests passing
- ✅ **Coverage**: Backend >85%, Frontend >80%, Common >90%, Critical paths 100%
- ✅ **Build**: Successful build completion
- ✅ **Design Review**: Compliant with design system
- ✅ **Accessibility**: WCAG 2.1 AA compliant
- ✅ **Performance**: No regressions >5%
- ✅ **Security**: No high/critical vulnerabilities
- ✅ **Code Review**: At least 1 approval, all conversations resolved

**Any PR failing these gates will be rejected.**

---

## Article III: Development Workflow

### Section 3.0: Workflow Documentation Compliance (MANDATORY)

**⚠️ ABSOLUTE REQUIREMENT:**

ALL agents and developers MUST follow the detailed workflow specified in `docs/WORKFLOW.md` (Development Workflow document). This document provides comprehensive, step-by-step instructions for:

- Specification creation and approval (Phase 1)
- Implementation planning and approval (Phase 2)
- Task generation and GitHub issue creation (Phase 3)
- Per-task implementation with mandatory approval gates (Phase 4)
- Final integration and merge to main (Phase 5)

**Key mandatory requirements from WORKFLOW.md:**

1. **7 Approval Gates**: User approval required at spec, plan, tasks, implementation (before commit), PR creation (before merge), documentation, and final PR
2. **Sequential Task Execution**: Tasks MUST be completed one at a time in order
3. **Task Branch Workflow**: Each task gets sub-branch from spec branch
4. **PR Review with pr-reviewer Agent**: ALL PRs reviewed by pr-reviewer agent before user approval
5. **Documentation Step**: documentation-writer agent MUST be called after all tasks complete
6. **Husky Pre-commit Hooks**: User approval required before fixing hook failures
7. **Branch Cleanup**: User approval required before deleting remote task branches
8. **Sub-issue Cleanup**: User approval required before deleting sub-issues from project board

**Violation of WORKFLOW.md is a constitution violation and will result in rejected PRs.**

**Reference**: `docs/WORKFLOW.md` for complete detailed workflow.

### Section 3.1: Specification-First Process

**Mandatory Workflow (NO STAGE MAY BE SKIPPED):**

```
Idea → Specification → GitHub Issue (Spec) → Design → GitHub Issues (Tasks) →
Feature Branch → Task Sub-branches → Implementation → User Approval → PR → Review → Merge
```

**Specification Requirements:**

1. Create feature spec in `.specify/specs/[###-feature-name]/spec.md`
2. **Git workflow**:
   - Create branch: `spec/[###-name]` from `main`
   - Commit spec.md to spec branch
   - Push spec branch to origin
3. **Create GitHub issue immediately** (as soon as spec is defined):
   - Title: Short, clear feature name
   - Description: Brief, clear summary from spec (NOT full spec content)
   - Assign to: Architecture Agent
   - Labels: `feature`, `spec`, priority (P1/P2/P3)
   - Add to project board with status: "Backlog"
4. **⚠️ MANDATORY SPEC SIZE EVALUATION** (immediately after spec creation):
   - Evaluate spec complexity and estimate implementation size
   - **Size indicators** (any 2+ means "too large"):
     - More than 5 user scenarios
     - More than 3 major feature areas
     - Estimated 15+ tasks
     - Multiple database entities (3+)
     - Multiple API endpoints across different resources (10+)
     - Cross-cutting concerns (auth + data + UI + workflows)
   - **If spec appears too large**: MUST notify user with:
     - Current spec scope assessment
     - Suggested breakdown into smaller specs
     - Reasoning for each suggested split
     - Estimated task count for current spec vs. split specs
   - **User decides**: Whether to proceed as-is or split into smaller specs
   - **If user chooses to split**: Discard current spec, create multiple smaller specs sequentially
5. All ambiguities marked with `[NEEDS CLARIFICATION]`
6. All requirements must be testable
7. User scenarios defined with acceptance criteria
8. ⚠️ **MANDATORY APPROVAL GATE**: User must review and explicitly approve spec
9. **After approval**: Proceed to `/plan` (stay on spec branch)

**Planning Requirements:**

1. After spec approved, run `/plan` to generate implementation plan
2. Create research.md, data-model.md, contracts/, quickstart.md
3. **Git workflow**:
   - Work on spec branch: `spec/[###-name]` (same branch from /specify)
   - Commit all plan files to spec branch
   - Do NOT push yet
4. ⚠️ **MANDATORY APPROVAL GATE**: User must review and explicitly approve plan
5. **After approval**: Proceed to `/tasks` (stay on spec branch, no push yet)

**Task Generation Requirements:**

1. After plan approved, run `/tasks` to generate task breakdown
2. Create tasks.md with numbered, ordered tasks (summary view)
3. Create tasks/ folder under spec directory
4. Create individual file for EACH task: `tasks/T###-task-name.md`
5. Each task file contains: description, files, dependencies, acceptance criteria, agent assignment
6. **Task sizing guidelines (MANDATORY)**:
   - Each task should be **meaningful but focused** - not too big, not too granular
   - **Good task size**: 1-3 related files, single responsibility, ~1-3 hours work
   - **Too big**: Multiple unrelated concerns, 5+ files, >4 hours work
   - **Too small**: Single import, one-line change, trivial refactor
   - **Examples of good tasks**:
     - "Create User entity with validation" (model + validation rules)
     - "Implement UsersService CRUD operations" (service with all methods)
     - "Create authentication DTOs" (login, register, refresh DTOs together)
   - **Examples of too granular** (avoid):
     - "Add email field to User entity"
     - "Create UserDto class"
     - "Add import statement"
   - **Examples of too big** (split into multiple):
     - "Implement entire authentication system" (split into: entity, service, controller, DTOs, middleware)
     - "Build user dashboard with all features" (split by feature/component)
7. **Agent assignment MANDATORY**: Assign based on file paths (backend/frontend/common/testing/etc)
8. **Git workflow**:
   - Work on spec branch: `spec/[###-name]` (same branch from /specify)
   - Commit tasks.md and tasks/ folder to spec branch
9. ⚠️ **MANDATORY APPROVAL GATE**: User must review and explicitly approve tasks
10. **After approval**:
    - Create GitHub sub-issue for EACH task:
      - Title: `[T###] Task description`
      - Description: Full task content from task file
      - Assignee: Responsible agent (GitHub username)
      - Labels: `feature`, `spec`, agent label, priority
      - **Parent issue**: Link as sub-issue to parent spec issue
      - Add to project board with status: "Backlog"
    - Push spec branch to origin (with spec + plan + tasks)
    - **Do NOT create PR to main yet**
    - Proceed to `/implement` (implementation starts from spec branch)

**Implementation Requirements (Per Task):**

1. **Sequential execution MANDATORY**: Cannot start new task until previous task merged to spec branch
2. **For each task**:
   - Create task branch: `spec/[###-name]/T###-task-name` from spec branch
   - Implement task following TDD workflow
   - Run all quality gates (tests, linting, build)
3. **Git commit with Husky pre-commit hooks**:
   - Attempt commit to task branch
   - If pre-commit hooks FAIL:
     - **MANDATORY**: Report failure to user with error details
     - **MANDATORY**: Wait for user approval before fixing
     - Fix issues based on hook errors (ESLint, Prettier, tests, etc.)
     - Retry commit
     - Repeat until hooks pass
   - If pre-commit hooks PASS: Commit succeeds
4. ⚠️ **MANDATORY APPROVAL GATE**: User must approve completed task before PR
5. **After task approval**:
   - Push task branch to origin
   - Create PR: `spec/[###-name]/T###-task-name` → `spec/[###-name]`
   - Wait for PR merge
   - After merge, switch to spec branch
   - Pull latest from spec branch
   - **ONLY THEN** can next task begin
6. **After ALL tasks complete**:
   - All task PRs merged to spec branch
   - Run full test suite on spec branch
   - **MANDATORY**: Call documentation-writer agent to document new features and update changed documentation
   - ⚠️ **MANDATORY APPROVAL GATE**: User must approve entire feature (including documentation)
   - Create final PR: `spec/[###-name]` → `main`
   - **After final PR review complete**: Request user approval to delete all remote task branches (cleanup)
   - Merge PR to main
   - **After merge confirmed**: Move parent spec issue to "Done" status on project board
   - **After spec issue moved to Done**: Request user approval to delete all sub-issues from project board (cleanup)
   - Feature completion

**Pre-commit Hook Failure Protocol:**

When git commit fails due to Husky pre-commit hooks:

1. **STOP immediately** - do not attempt auto-fix without approval
2. Display error output to user
3. Ask: "Pre-commit hooks failed. Approve fixes for: [list of errors]?"
4. **Wait for explicit user approval** (MANDATORY)
5. After approval, fix errors
6. Retry commit
7. If hooks fail again, repeat protocol

### Section 3.2: Agent Responsibilities

**Architecture Agent** (Final Authority on Technical Decisions)

- Creates specifications for all features
- Makes final decisions on technical approach
- Reviews all PRs for architectural compliance
- **Authority**: Can reject any PR for architectural reasons

**Design Agent** (Final Authority on UI/UX)

- Creates and maintains design system
- Creates Storybook stories for all UI components
- Maintains component documentation in Storybook
- Ensures components are viewable in browser via Storybook dev server
- Approves all UI/UX implementations
- **Authority**: Can reject any PR for design violations
- **Required Tools**: Storybook (for live component preview and documentation)

**Common Agent** (Guardian of Type Contracts)

- Maintains type contracts in `common/` workspace
- **Authority**: Can reject breaking changes without migration plan

**Backend Agent** (API Implementation)

- Implements API contracts exactly as specified
- **Authority**: Cannot change API contracts without Architecture Agent approval

**Frontend Agent** (UI Implementation)

- Implements designs exactly as specified
- **Authority**: Cannot deviate from design system without Design Agent approval

**DevOps Agent** (Build and Deployment)

- Maintains build and deployment systems
- Configures and maintains Storybook infrastructure
- Ensures Storybook dev server is available for design reviews
- **Authority**: Can block merges if CI/CD is broken

**Testing Agent** (Quality Assurance)

- Defines test requirements
- **Authority**: Can reject PRs with insufficient tests

### Section 3.3: Decision-Making Hierarchy

**Level 1: Individual Agent Decisions** (No approval needed)

- Implementation details within agent's domain
- Variable naming, internal structure
- Micro-optimizations

**Level 2: Cross-Agent Decisions** (Architecture Agent approval required)

- API contract changes
- New dependencies
- Database schema changes
- Performance trade-offs

**Level 3: Project-Level Decisions** (Team consensus required)

- Technology stack changes
- Major architectural shifts
- Breaking changes to public APIs
- Constitution amendments

### Section 3.4: GitHub Integration & Branch Strategy (MANDATORY)

**Feature Specification Phase:**

1. Create feature spec in `.specify/specs/[###-feature-name]/spec.md`
2. **Create GitHub issue immediately** (as soon as spec is defined):
   - Title: Short, clear feature name (e.g., `User Authentication System`)
   - Description: Brief, clear summary from spec (NOT full spec content)
   - Labels: `feature`, `spec`, priority label
   - Assign to: Architecture Agent role
   - Add to project board with status: "Backlog"
   - Link to spec file in description
3. Wait for spec approval before proceeding

**Task Planning Phase:**

1. After spec approved, run `/tasks` to generate tasks.md
2. Wait for user approval of tasks
3. **After approval**, create GitHub sub-issues for EACH task:
   - Title: `[T###] Task description`
   - Description: Full task content from task file
   - Labels: `feature`, `spec`, agent label (e.g., `agent:backend`), priority
   - Assign to: Responsible agent role
   - **Parent issue**: Link as sub-issue to parent spec issue
   - Add to project board with status: "Backlog"

**Implementation Phase:**

1. For EACH task, create sub-branch from feature branch:
   - Format: `feature/###-feature-name/T###-task-name`
   - Example: `feature/001-user-authentication/T014-auth-endpoints`
2. Implement task on sub-branch
3. When complete, **WAIT FOR USER APPROVAL** (MANDATORY)
4. After approval, create PR from task sub-branch → feature branch
5. After all tasks complete and approved, create PR from feature branch → main

**Branch Hierarchy:**

```
main
└── feature/###-feature-name (feature branch)
    ├── feature/###-feature-name/T001-task-a (task sub-branch)
    ├── feature/###-feature-name/T002-task-b (task sub-branch)
    └── feature/###-feature-name/T003-task-c (task sub-branch)
```

### Section 3.5: Issue and PR Protocol

**Every Issue Must Have:**

- Clear description
- Acceptance criteria
- Assigned agent (using GitHub assignment)
- Proper labels (feature/bug/tech-debt/docs + agent + priority)
- Linked to parent spec issue (for task issues)

**Every Task PR Must Have (Sub-branch → Feature Branch):**

- Reference to task issue number
- Description of changes and rationale
- Test evidence (screenshots of passing tests)
- Screenshots (for UI changes)
- User approval confirmation
- Breaking changes documented (if any)

**Every Feature PR Must Have (Feature Branch → Main):**

- Reference to spec issue number
- Summary of all completed tasks
- Full test coverage evidence
- All task PRs merged
- User approval for entire feature
- Breaking changes documented (if any)

**PR Review Requirements:**

- Minimum 1 approval
- Architecture Agent approval for cross-cutting changes
- Design Agent approval for UI changes
- All CI checks passing (green build mandatory)
- No unresolved conversations
- **User approval obtained before PR creation (MANDATORY)**

### Section 3.6: Agent Delegation Requirements (NON-NEGOTIABLE)

**MANDATORY Agent Usage:**

All contributors MUST use the Task tool to launch specialized agents for:

1. **Multi-file searches and research**
   - Searching for patterns across >3 files
   - Finding implementations, definitions, or usage examples
   - Researching best practices or external documentation

2. **Codebase analysis requiring >3 file reads**
   - Understanding feature implementation across modules
   - Tracing data flow or control flow
   - Analyzing architectural patterns

3. **Debugging that requires tracing across modules**
   - Following function calls across service boundaries
   - Tracking state changes through multiple components
   - Root cause analysis spanning multiple files

4. **Tasks benefiting from parallel execution**
   - Independent file modifications
   - Parallel test execution planning
   - Concurrent research tasks

**Permitted Direct Implementation (WITHOUT agents):**

Direct work is ONLY allowed for:

- Single-file edits with complete context already loaded
- Trivial bug fixes (typos, formatting, single-line changes)
- Documentation updates to single files
- Immediate error fixes where root cause is obvious

**Enforcement:**

- Code reviews MUST verify agent usage for complex tasks
- PRs without proper agent delegation may be rejected
- Reviewers should ask: "Could this have used agents more effectively?"

**Rationale:**

- Agents reduce context window usage through focused, parallel execution
- Specialized agents are optimized for specific task types
- Parallel agent execution improves overall task completion time
- Proper delegation demonstrates systematic problem-solving

---

## Article IV: Technical Standards

### Section 4.1: Technology Stack (IMMUTABLE)

**Approved Technologies:**

- **Frontend**: Vue 3, TypeScript, Vite, Pinia, Tailwind CSS
- **Backend**: NestJS, TypeScript, Firebase (Auth, Firestore)
- **Common**: TypeScript, Zod
- **Testing**: Vitest (frontend), Jest (backend), Vue Test Utils, Playwright (E2E)
- **Tooling**: ESLint, Prettier, Husky (git hooks)
- **CI/CD**: GitHub Actions

**Changes to this stack require constitution amendment (Article XIV).**

### Section 4.2: Project Structure (STANDARDIZED)

```
jira-clone/
├── front/          # Vue 3 application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── services/
│   └── tests/
├── back/           # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   ├── models/
│   │   └── services/
│   └── tests/
├── common/         # Shared types
│   └── src/
│       └── types/
├── .specify/       # Specifications and templates
│   ├── specs/
│   ├── templates/
│   └── memory/
└── docs/           # Documentation
    ├── design/
    └── adr/
```

**No additional top-level directories without Architecture Agent approval.**

### Section 4.3: Naming Conventions (ENFORCED)

- **Files**: kebab-case (`user-card.vue`, `auth-service.ts`)
- **Components**: PascalCase (`UserCard`, `IssueList`)
- **Functions/Variables**: camelCase (`getUserData`, `isLoggedIn`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`, `ApiResponse`)
- **Enums**: PascalCase with UPPER_CASE values (`Status.IN_PROGRESS`)
- **Database Collections**: snake_case (`user_profiles`, `issue_comments`)

### Section 4.4: Git Standards (MANDATORY)

**⚠️ Branch Naming Convention (ABSOLUTE REQUIREMENT):**

ALL branches MUST follow this EXACT naming pattern as defined in `docs/WORKFLOW.md`:

```
spec/[###-feature-name]                    # Spec/Feature branch
spec/[###-feature-name]/T###-[task-name]   # Task sub-branch
```

**Examples:**

- `spec/001-user-authentication` (spec branch)
- `spec/001-user-authentication/T014-auth-endpoints` (task sub-branch)
- `spec/002-project-board/T005-kanban-ui` (task sub-branch)
- `spec/004-uibutton-component-you` (spec branch)
- `spec/004-uibutton-component-you/T001-write-component-unit-tests` (task sub-branch)

**MANDATORY REQUIREMENTS:**

1. **Prefix**: ALL branches MUST start with `spec/` (not `feature/`)
2. **Hierarchical Structure**: Task branches MUST be sub-branches: `spec/<feature-id>/<task-id>`
3. **Naming Format**: Feature ID format: `###-feature-name`, Task ID format: `T###-task-name`
4. **No Exceptions**: Any PR with incorrect branch naming will be REJECTED immediately

**⚠️ VIOLATION = CONSTITUTION VIOLATION = PR REJECTION**

**Commit Messages (Conventional Commits):**

```
type: brief description

Detailed explanation if needed

Refs #[task-issue-number]
```

Examples:

```
feat: implement user authentication endpoints

Added Firebase Auth integration, JWT token handling,
and refresh token mechanism.

Refs #14
```

**Commit Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

**PR Closing:**

- Task PRs (sub-branch → feature branch): `Closes #[task-issue]`
- Feature PRs (feature branch → main): `Closes #[spec-issue]`

---

## Article V: Design System

### Section 5.1: Design System Authority

The Design System documented in `docs/design/DESIGN_SYSTEM.md` is **authoritative and absolute**.

**Design System Rules (NON-NEGOTIABLE):**

1. All colors MUST come from the defined palette
2. All spacing MUST use the defined scale (Tailwind spacing)
3. All typography MUST follow the defined scale
4. No custom CSS without Design Agent approval
5. Tailwind utility classes only (no arbitrary values without justification)
6. All UI components MUST use the shared component library

### Section 5.2: Component Library Standards

**Component Requirements:**

1. All components documented in `docs/design/COMPONENTS.md`
2. New components require Design Agent specification
3. Component props must be minimal and well-typed
4. No prop drilling beyond 2 levels (use composition or provide/inject)
5. Composition over configuration
6. Multi-word component names (PascalCase)

### Section 5.3: Storybook Integration (MANDATORY)

**Storybook Requirements for All UI Components:**

1. **Every UI component MUST have a `.stories.ts` file**
2. Stories MUST be created BEFORE or ALONGSIDE component implementation
3. Stories MUST demonstrate all component states and variants
4. Storybook dev server MUST be running during design work (`npm run storybook`)
5. Design Agent reviews happen in browser via Storybook at `http://localhost:6006`
6. Story files MUST include:
   - Default story (basic usage)
   - All prop variants
   - All state variations (loading, error, empty, success)
   - Interaction examples (for interactive components)
7. **Component is NOT complete without Storybook story**

**Storybook Standards:**

- Use CSF3 (Component Story Format 3) with TypeScript
- Stories must use `<script setup lang="ts">` syntax for Vue 3
- Group stories by component category (atoms, molecules, organisms)
- Include JSDoc comments for story descriptions
- Use Storybook controls for interactive props

**DevOps Requirement:**

- Storybook MUST be configured and maintained by DevOps Agent
- Storybook dev server MUST be available for all design reviews
- Storybook build MUST be part of CI/CD pipeline

### Section 5.5: Responsive Design (STANDARD BREAKPOINTS)

**Breakpoints (Mobile-First):**

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

**Additional Tailwind Breakpoints:**

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

**Mobile-first approach is mandatory.**

---

## Article VI: Testing Standards

### Section 6.1: Test-Driven Development (NON-NEGOTIABLE)

**TDD Workflow (MANDATORY):**

1. Write test that fails (RED)
2. Get user approval on test scenarios
3. Write minimal code to pass test (GREEN)
4. Refactor for quality (REFACTOR)

**Tests MUST be written before implementation code.**

### Section 6.2: Test Coverage Requirements

**Minimum Coverage (Blocks merge if not met):**

- **Backend**: 85% line coverage
- **Frontend**: 80% line coverage
- **Common**: 90% line coverage
- **Critical paths**: 100% coverage (authentication, data mutations, payments)

### Section 6.3: Test Categories (ALL REQUIRED)

**Backend Tests:**

- **Contract Tests**: API request/response schemas, database models
- **Integration Tests**: Service-to-service communication, database interactions
- **Unit Tests**: Business logic, utilities, transformations
- **E2E Tests**: Full user journeys (create issue, update status, assign user)

**Frontend Tests:**

- **Component Tests**: All Vue components (render, props, emits, slots)
- **Store Tests**: All Pinia stores (actions, getters, state mutations)
- **Integration Tests**: API service interactions
- **Accessibility Tests**: Keyboard navigation, screen readers, ARIA

### Section 6.4: Test Quality Standards

**All tests must:**

- Test behavior, not implementation details
- Be independent and isolated (no shared state)
- Have clear, descriptive names (`test('user can login with valid credentials')`)
- Follow AAA pattern (Arrange, Act, Assert)
- Run in under 5 minutes total (suite execution time)
- Use proper mocking for external dependencies
- Clean up after themselves (no side effects)

**Flaky tests MUST be fixed immediately or removed.**

---

## Article VII: Performance Standards

### Section 7.1: Performance Budgets (ENFORCED)

**Frontend Performance:**

- **Initial page load**: < 3 seconds (3G network)
- **Time to Interactive**: < 1 second (desktop), < 5 seconds (mobile)
- **Lighthouse score**: > 90 (Performance, Accessibility, Best Practices)
- **Bundle size**: < 200KB gzipped for initial load, < 500KB total
- **UI interactions**: < 16ms frame time (60 fps)

**Backend Performance:**

- **API response time**: < 200ms p95 (simple queries), < 500ms p95 (complex aggregations)
- **Database queries**: < 100ms average
- **File uploads**: Support up to 10MB, < 2s processing time

**Performance regressions >5% block merge.**

### Section 7.2: Optimization Requirements

**Frontend Optimizations (MANDATORY):**

1. Code splitting for routes (lazy loading)
2. Lazy loading for heavy components (modals, editors)
3. Image optimization (WebP format, responsive images)
4. Debouncing for search inputs (300ms minimum)
5. Virtual scrolling for long lists (>100 items)

**Backend Optimizations (MANDATORY):**

1. Database indexes on all queried fields
2. Pagination for list endpoints (max 100 items per page)
3. Caching where appropriate (Redis for session data)
4. Batch operations for bulk updates
5. N+1 query prevention (eager loading, DataLoader pattern)

### Section 7.3: Monitoring Requirements

**Application MUST:**

- Log performance metrics to monitoring service
- Alert on p95 degradation >20%
- Track Core Web Vitals (LCP, FID, CLS)
- Monitor bundle size in CI

---

## Article VIII: Security Standards

### Section 8.1: Authentication & Authorization (NON-NEGOTIABLE)

**Requirements:**

1. Firebase Auth for all authentication
2. JWT tokens with 24-hour expiration
3. Refresh token mechanism implemented
4. Authorization checks on all protected routes (backend)
5. Route guards on all protected pages (frontend)
6. Role-based access control (RBAC) enforced

### Section 8.2: Data Validation (MANDATORY)

**Input Validation (Defense in Depth):**

1. **Backend**: class-validator on all DTOs (NestJS validation pipes)
2. **Frontend**: VeeValidate + Zod on all forms
3. **Common**: Zod schemas for shared validation logic
4. **Principle**: Never trust client input; always validate on server

### Section 8.3: Security Practices (ABSOLUTE REQUIREMENTS)

**Prohibited:**

- ❌ Secrets in code (use environment variables)
- ❌ Hardcoded credentials
- ❌ SQL injection vulnerabilities (use Firebase/ORM properly)
- ❌ XSS vulnerabilities (no `v-html` without sanitization)
- ❌ Disabling security features

**Mandatory:**

- ✅ HTTPS in production
- ✅ CORS properly configured (whitelist origins)
- ✅ Rate limiting on APIs (prevent abuse)
- ✅ Input sanitization (strip HTML tags)
- ✅ Secure session management
- ✅ Password hashing (bcrypt/argon2 via Firebase Auth)
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Regular dependency audits (`npm audit`)

**Security issues are P0 and block all other work.**

---

## Article IX: Accessibility Standards

### Section 9.1: WCAG 2.1 AA Compliance (NON-NEGOTIABLE)

**Mandatory Requirements:**

1. **Color Contrast**: Ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
2. **Keyboard Navigation**: All interactive elements keyboard accessible (tab, enter, escape)
3. **Focus Indicators**: Visible focus indicators on all focusable elements
4. **ARIA Labels**: Proper ARIA labels where semantic HTML insufficient
5. **Semantic HTML**: Use correct elements (`<button>` not `<div onclick>`)
6. **Screen Reader Support**: All content and functionality accessible via screen reader
7. **Responsive Text**: Text resizable up to 200% without loss of functionality

### Section 9.2: Accessibility Testing (REQUIRED)

**Tests Required:**

1. Automated testing with axe-core (in component tests)
2. Keyboard navigation testing for all features
3. Screen reader testing on key flows (NVDA/JAWS on Windows, VoiceOver on Mac/iOS)
4. Color contrast verification (automated + manual spot checks)
5. Focus management verification (modals, route changes)

**Accessibility violations block merge.**

### Section 9.3: Accessibility Checklist

**Every UI component must:**

- [ ] Work with keyboard only
- [ ] Have visible focus indicators
- [ ] Have proper ARIA labels/roles
- [ ] Pass automated accessibility tests
- [ ] Be tested with screen reader
- [ ] Meet color contrast requirements

---

## Article X: Documentation Standards

### Section 10.1: Required Documentation

**Code Documentation (MANDATORY):**

1. JSDoc/TSDoc for all public functions and classes
2. README in each workspace (`front/`, `back/`, `common/`)
3. API documentation (OpenAPI/Swagger for backend)
4. Component documentation (props, events, slots, usage examples)

**Project Documentation (MANDATORY):**

1. **Architecture Decision Records (ADRs)**: Document all major decisions in `docs/adr/`
2. **Feature Specifications**: In `.specify/specs/[###-feature-name]/spec.md`
3. **Design Specifications**: In `docs/design/` (design system, components)
4. **Deployment Guides**: In `docs/deployment/`
5. **Onboarding Guide**: For new contributors

### Section 10.2: Documentation Updates

**Documentation MUST be updated when:**

- APIs change (update OpenAPI spec)
- Features are added (update README, specs)
- Architectural decisions are made (create ADR)
- Deployment process changes (update deployment guide)
- Dependencies change (update README)

**Outdated documentation is a bug (P2 severity).**

### Section 10.3: ADR Format

**Architecture Decision Records must include:**

1. **Title**: Short descriptive name
2. **Status**: Proposed/Accepted/Deprecated/Superseded
3. **Context**: Problem statement and constraints
4. **Decision**: What was decided
5. **Consequences**: Trade-offs and implications
6. **Alternatives Considered**: What else was evaluated

---

## Article XI: Continuous Integration

### Section 11.1: CI Pipeline Requirements (MANDATORY)

**All PRs must pass (green build mandatory):**

1. **Linting**: ESLint, Prettier (0 errors, 0 warnings)
2. **Type Checking**: TypeScript compilation (0 errors)
3. **Unit Tests**: All unit tests passing
4. **Integration Tests**: All integration tests passing
5. **E2E Tests**: All E2E tests passing (on main branch merges)
6. **Build Process**: Successful build for all workspaces
7. **Security Scanning**: No high/critical vulnerabilities (`npm audit`, Snyk)
8. **Bundle Size Check**: No regressions beyond budget

**CI must complete in under 10 minutes.**

### Section 11.2: Deployment Requirements

**Pre-Deployment Checklist:**

- [ ] All tests pass in CI
- [ ] Code review approved
- [ ] No known security vulnerabilities
- [ ] Performance benchmarks pass
- [ ] Database migrations tested on staging
- [ ] Rollback plan documented
- [ ] Monitoring and alerting configured
- [ ] Changelog updated
- [ ] Version bumped (semantic versioning)

**Deployment Workflow:**

1. Merge to `main` triggers staging deployment
2. Automated smoke tests on staging
3. Manual approval for production deployment
4. Blue-green deployment to production
5. Post-deployment health checks

---

## Article XII: GitHub Project Board (MANDATORY)

### Section 12.1: Project Board Structure

**Required Columns (Status field values)**:

1. **Backlog** - All new issues and tasks start here
2. **In progress** - Currently being worked on
3. **Testing** - Implementation complete, testing in progress
4. **Review** - PR created, awaiting code review and approval
5. **Done** - Completed and merged

### Section 12.2: Issue Movement Rules (MANDATORY)

**Parent Spec Issue Movement:**

1. **Backlog** → Issue created immediately when spec is defined (during `/specify`)
2. **In progress** → Moved after spec approval (when starting `/plan`)
3. **Testing** → Moved after all task sub-issues are complete
4. **Review** → Moved when final PR created (spec branch → main)
5. **Done** → Moved when final PR merged to main

**Task Sub-Issue Movement:**

1. **Backlog** → Sub-issue created after tasks approval (post `/tasks` approval)
2. **In progress** → Moved when task implementation begins (create task branch)
3. **Testing** → Moved after implementation complete, before requesting commit approval (Step 4: tests passing, coverage met)
4. **Review** → Moved when task PR created (task branch → spec branch)
5. **Done** → Moved when task PR merged to spec branch

**Automation Rules:**

- All issues/sub-issues created → Start in "Backlog"
- Issue must be moved through columns during development (MANDATORY)
- Cannot skip columns (must go: Backlog → In progress → Testing → Review → Done)

### Section 12.3: Label Requirements

**Every issue/PR MUST have**:

- Type label: `feature`, `bug`, `tech-debt`, `docs`, `security`, `spec`
- Priority label: `P0-critical`, `P1-high`, `P2-medium`, `P3-low`
- Agent label: `agent:backend`, `agent:frontend`, `agent:common`, `agent:testing`, `agent:devops`, `agent:design`, `agent:architecture`

**Optional labels**:

- Status: `in-progress`, `blocked`, `review`

## Article XIII: Communication Protocols

### Section 13.1: Agent Handoffs

**Handoff Document Requirements:**

1. Complete agent-specific checklist
2. All deliverables linked (files, PRs, issues)
3. Next steps clearly defined with acceptance criteria
4. Blockers documented with suggested resolutions
5. Open questions highlighted

### Section 12.2: Issue Communication

**Issue Update Requirements:**

- **In-Progress Issues**: Daily updates or status comment
- **Blocked Issues**: Immediately flag if stuck >4 hours, tag relevant agents
- **Completed Issues**: Close with summary of work done, link to PR

**Issue Labels (STANDARD):**

- Type: `feature`, `bug`, `tech-debt`, `docs`, `security`
- Priority: `P0-critical`, `P1-high`, `P2-medium`, `P3-low`
- Status: `backlog`, `in-progress`, `blocked`, `review`, `done`
- Agent: `agent:backend`, `agent:frontend`, `agent:design`, etc.

### Section 12.3: PR Communication

**PR Description Template (MANDATORY):**

```markdown
## What Changed

[Description of changes and why]

## How to Test

[Step-by-step testing instructions]

## Screenshots

[For UI changes - before/after if applicable]

## Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Accessibility verified
- [ ] Performance tested
```

---

## Article XIII: Violation Handling

### Section 13.1: Violation Severity Levels

**P0 - Critical (BLOCKS EVERYTHING)**

- Security vulnerabilities (high/critical)
- Production-breaking bugs
- Data loss risks
- Authentication/authorization failures

**P1 - High (BLOCKS MERGE)**

- ESLint errors
- TypeScript compilation errors
- Test failures
- Accessibility violations (WCAG AA)
- Design system violations
- Coverage below minimum
- Agent delegation violations (complex tasks done directly without agents)

**P2 - Medium (MUST FIX IN SPRINT)**

- Missing tests for new code
- Incomplete documentation
- Performance issues (not regressions)
- Code duplication

**P3 - Low (SHOULD FIX)**

- Minor optimizations
- Style improvements
- Refactoring opportunities

### Section 13.2: Violation Response Protocol

**P0 Violations:**

1. Immediate stop of all work
2. Root cause analysis required (5 Whys)
3. Prevention plan documented
4. Incident report created
5. Constitution review if systemic

**P1 Violations:**

1. PR rejected immediately
2. Must be fixed before resubmission
3. No exceptions (Architecture Agent cannot override)

**P2/P3 Violations:**

1. Create follow-up issue with appropriate label
2. Schedule for current/next sprint
3. Document as technical debt in backlog

---

## Article XIV: Constitution Amendments

### Section 14.1: Amendment Process

**To Amend This Constitution:**

1. **Proposal**: Document proposed change with rationale in GitHub issue
2. **Discussion**: Team reviews and comments; minimum 48-hour review period
3. **Impact Analysis**: Assess effect on existing code, templates, workflows
4. **Approval**: Requires consensus from project maintainers
5. **Migration**: If existing code violates new rule, create migration plan before ratification
6. **Documentation**: Update constitution version, templates, agent guidance files

### Section 14.2: Versioning Policy

**Constitution uses semantic versioning (MAJOR.MINOR.PATCH):**

- **MAJOR**: Backward-incompatible changes (removing principle, changing NON-NEGOTIABLE rule)
- **MINOR**: New principles/sections added, material expansions
- **PATCH**: Clarifications, wording improvements, typo fixes

### Section 14.3: Living Document

This constitution is a **living document**. It should be reviewed and updated as the project evolves.

**Review Schedule:**

- **Quarterly**: Review all sections, update if needed
- **After Major Milestones**: Retrospective and lessons learned
- **When Problems Arise**: Immediate review of relevant sections

---

## Article XV: Enforcement & Authority

### Section 15.1: Contributor Responsibility

**All contributors are responsible for:**

- Reading and understanding this constitution
- Following all standards and processes
- Calling out violations when seen (respectfully)
- Proposing improvements via amendment process
- Maintaining quality culture

### Section 15.2: Final Authority

**Architecture Agent has final authority on:**

- Technical disputes
- Exception requests
- Constitutional interpretation
- Cross-agent conflicts

**No one may override (NON-NEGOTIABLE):**

- Security requirements
- Accessibility requirements (WCAG 2.1 AA)
- Quality gates (ESLint, tests, coverage)
- Test coverage minimums
- Specification-first workflow

### Section 15.3: Exception Process

**Justified exceptions to principles:**

1. Must be documented in `plan.md` Complexity Tracking table
2. Explain what simpler alternative was rejected and why
3. Include plan to refactor toward compliance when feasible
4. **Exceptions expire after 6 months**; must be re-justified or resolved
5. Architecture Agent approval required

---

## Appendix A: Quick Reference

### ✅ Non-Negotiables (ABSOLUTE REQUIREMENTS)

- **Code Quality**: ESLint 0 errors, TypeScript strict mode, 0 warnings
- **Testing**: All tests passing, coverage >80% (85% backend, 80% frontend, 90% common)
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- **Security**: No high/critical vulnerabilities, input validation, secure auth
- **Design**: Follow design system, no custom CSS without approval
- **Specification**: Required before any code is written
- **Performance**: <200ms API p95, <1s TTI, no regressions >5%
- **Agent Delegation**: Use agents for multi-file searches, complex debugging, parallel tasks

### ❌ Prohibited (NEVER ALLOWED)

- `any` types without justification
- Disabling ESLint rules
- Skipping tests or coverage
- Custom CSS without Design Agent approval
- Secrets/credentials in code
- Breaking changes without migration plan
- Merge without code review approval
- Code without specification
- `v-html` without security review
- Direct Firebase calls in controllers (use service layer)
- Complex multi-file tasks without using agents

### 📋 Quality Gates Checklist

Before merge, ALL must be ✅:

- [ ] ESLint: 0 errors, 0 warnings
- [ ] TypeScript: 0 compilation errors
- [ ] Tests: All passing (unit, integration, E2E)
- [ ] Coverage: Backend >85%, Frontend >80%, Common >90%, Critical paths 100%
- [ ] Build: Successful
- [ ] Design: Compliant with design system
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Performance: No regressions >5%
- [ ] Security: No high/critical vulnerabilities
- [ ] Documentation: Updated
- [ ] Code Review: At least 1 approval

### 🔧 Technology Stack (Immutable)

- **Frontend**: Vue 3 + TypeScript + Vite + Pinia + Tailwind CSS
- **Backend**: NestJS + TypeScript + Firebase
- **Testing**: Vitest (FE), Jest (BE), Playwright (E2E)
- **Tooling**: ESLint + Prettier + Husky

---

## Appendix B: Version History

- **v2.10.0** (2025-10-08) - **MANDATORY branch naming convention**: Changed prefix from "feature/" to "spec/", made hierarchical structure absolute requirement, violation = PR rejection (Article IV, Section 4.4)
- **v2.9.4** (2025-10-07) - Clarified workflow: Explicitly move parent spec issue to "Done" status after PR merge confirmed (Article III, Section 3.1, step 6)
- **v2.9.3** (2025-10-07) - Added MANDATORY documentation step: Call documentation-writer agent after all tasks complete, before final PR (Article III, Section 3.1, step 6)
- **v2.9.2** (2025-10-07) - Added cleanup step: Request user approval to delete sub-issues from project board after spec PR merge (Article III, Section 3.1, step 6)
- **v2.9.1** (2025-10-07) - Added cleanup step: Request user approval to delete remote task branches after final PR approval (Article III, Section 3.1, step 6)
- **v2.9.0** (2025-10-07) - Added MANDATORY spec size evaluation to prevent large specs and big code changes (Article III, Section 3.1)
- **v2.8.0** (2025-10-07) - Updated GitHub workflow: Spec = parent issue (Backlog), Tasks = sub-issues created after approval (Article III, Section 3.1, 3.4)
- **v2.7.0** (2025-10-05) - Corrected git workflow (single spec branch), sequential tasks, Husky handling
- **v2.6.0** (2025-10-05) - Added Storybook integration for Design Agent workflow (Article V, Section 5.3)
- **v2.5.0** (2025-10-05) - Added git workflow, agent assignment, GitHub project board (Article XII)
- **v2.4.0** (2025-10-05) - Added individual task files in tasks/ folder with detailed tracking
- **v2.3.0** (2025-10-05) - Added MANDATORY approval gates after /specify, /plan, /tasks commands
- **v2.2.0** (2025-10-05) - Added GitHub integration workflow, branch strategy, user approval gates
- **v2.1.0** (2025-10-05) - Added Agent-Based Task Delegation principle (Article I.7, Article III.6)
- **v2.0.0** (2025-10-04) - Merged constitutions; added agent responsibilities, expanded standards
- **v1.0.0** (2025-10-04) - Initial constitution established

---

**End of Constitution**

_By contributing to this project, you agree to uphold this constitution._
