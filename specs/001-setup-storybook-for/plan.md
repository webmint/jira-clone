# Implementation Plan: Storybook Setup for Design Preview

**Branch**: `001-setup-storybook-for` | **Date**: 2025-10-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/Users/mykolakudlyk/Projects/private/jira-clone/specs/001-setup-storybook-for/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. Commit plan files to git:
   → Ensure on spec branch: spec/[###-feature-name]
   → git add .specify/specs/[###-feature-name]/plan.md
   → git add .specify/specs/[###-feature-name]/research.md
   → git add .specify/specs/[###-feature-name]/data-model.md
   → git add .specify/specs/[###-feature-name]/contracts/
   → git add .specify/specs/[###-feature-name]/quickstart.md
   → git commit -m "docs: add implementation plan for [feature-name]"
   → Do NOT push yet (wait for tasks approval)
10. ⚠️ STOP and WAIT FOR USER APPROVAL (MANDATORY)
    → Display: "Plan completed. Review deliverables:"
    → Display: "  - plan.md (implementation strategy)"
    → Display: "  - research.md (technical decisions)"
    → Display: "  - data-model.md (database schema)"
    → Display: "  - contracts/ (API contracts)"
    → Display: "  - Files committed to spec branch (not pushed yet)"
    → Display: "WAITING FOR APPROVAL to proceed to /tasks"
    → User must explicitly approve before /tasks can run
11. After approval:
    → Stay on spec branch (do NOT push yet)
    → Proceed to /tasks command
12. Return: SUCCESS (plan approved, ready for /tasks)
```

**IMPORTANT**: The /plan command STOPS at step 10 and waits for user approval. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md (AFTER user approves plan)
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Set up Storybook for the Jira Clone project to enable the design subagent to create and preview UI component designs in isolation before the frontend development subagent implements them in the main application. This will provide an isolated environment for viewing component states, variants, and interactive behaviors with mobile-first responsive design support and detailed documentation capabilities.

## Technical Context

**Language/Version**: TypeScript 5.2+, Node.js (latest LTS)
**Primary Dependencies**: Storybook 8.x, Vue 3.5, Vite 7.x, Tailwind CSS 4.0
**Storage**: N/A (static component documentation)
**Testing**: Vitest (frontend), Storybook test runner, axe-core (accessibility)
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
**Project Type**: Web application (frontend + backend monorepo)
**Performance Goals**: <2s Storybook build time, <500ms component story load, 60fps interactions
**Constraints**: Must integrate with existing Vue 3 + Tailwind setup, mobile-first responsive (320px-1920px), WCAG 2.1 AA compliant previews
**Scale/Scope**: Support 50+ component stories initially, scalable to 200+ components, multiple viewport configurations

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Article I: Fundamental Values Alignment

- [x] Specification-first workflow confirmed (no code before spec)
- [x] Quality over speed prioritized in timeline
- [x] Architecture decisions will be documented in ADRs
- [x] Consistency patterns identified and documented

### Article II: Code Quality Standards

- [x] TypeScript strict mode enabled (no `any` without justification)
- [x] ESLint (Airbnb style) + Prettier configured with pre-commit hooks
- [x] Code review process defined (min 1 approval)
- [x] Documentation standards clear (JSDoc for public APIs)
- [x] Vue 3: `<script setup lang="ts">` with type-based props/emits
- [x] NestJS: DTOs + validation pipes + service layer abstraction (not applicable for Storybook setup)
- [x] Common: Zod schemas for runtime validation (not applicable for Storybook setup)

### Article VI: Testing Discipline (NON-NEGOTIABLE)

- [x] TDD workflow confirmed (RED → user approval → GREEN → REFACTOR)
- [x] Coverage targets: Backend 85%, Frontend 80%, Common 90%, Critical 100%
- [x] Test categories: Contract, Integration, Unit, E2E (all planned - Storybook tests, interaction tests, accessibility tests)
- [x] CI/CD gates: All tests must pass before merge
- [x] Test quality: AAA pattern, <5min execution, no flaky tests

### Article V: Design System Compliance

- [x] Design system documented in `docs/design/DESIGN_SYSTEM.md` (will be accessible via Storybook)
- [x] Component library planned (no custom CSS without approval)
- [x] Tailwind CSS only (utility classes, defined palette/spacing/typography)
- [x] Responsive: Mobile-first with standard breakpoints (640/768/1024/1280)

### Article IX: Accessibility (WCAG 2.1 AA)

- [x] Color contrast ≥4.5:1 planned (enforced via Storybook axe addon)
- [x] Keyboard navigation for all interactions
- [x] ARIA labels and semantic HTML
- [x] Screen reader testing planned for key flows (via Storybook testing tools)
- [x] Focus management strategy defined

### Article VII: Performance Budgets

- [x] Frontend: <3s page load (3G), <1s TTI (desktop), >90 Lighthouse, <200KB bundle (Storybook build optimization)
- [x] Backend: <200ms p95 (simple), <500ms p95 (complex), <100ms DB queries (not applicable for Storybook)
- [x] Optimizations: Code splitting, lazy loading, debouncing, pagination (Storybook lazy loading)
- [x] Monitoring: Performance metrics, alerting on >20% p95 degradation (Storybook build monitoring)

### Article VIII: Security Standards

- [x] Firebase Auth with JWT (24h expiration) + refresh tokens (not applicable for Storybook setup)
- [x] Input validation: class-validator (BE), VeeValidate+Zod (FE), Zod (common) (not applicable for Storybook setup)
- [x] Security practices: HTTPS, CORS whitelist, rate limiting, no secrets in code
- [x] RBAC planned with route guards (FE) and authorization checks (BE) (not applicable for Storybook setup)

### Article X: Documentation Requirements

- [x] ADRs planned for architectural decisions (`docs/adr/` - ADR for Storybook adoption)
- [x] Feature specs in `.specify/specs/[###-feature-name]/spec.md`
- [x] API docs (OpenAPI/Swagger), component docs, deployment guides (Storybook provides component docs)
- [x] README per workspace with onboarding guide (Storybook setup guide)

### Article III.5: Agent Delegation Requirements

- [x] Multi-file searches planned to use general-purpose agents
- [x] Complex debugging tasks delegated to specialized agents
- [x] Research tasks (>3 files) assigned to agent execution
- [x] Parallel execution opportunities identified for agent usage
- [x] Direct implementation justified only for single-file trivial edits

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
jira-clone/
├── front/                      # Vue 3 frontend workspace
│   ├── .storybook/            # Storybook configuration (NEW)
│   │   ├── main.ts            # Storybook main config
│   │   ├── preview.ts         # Global decorators, parameters
│   │   └── manager.ts         # Storybook UI customization
│   ├── src/
│   │   ├── components/        # Vue components
│   │   │   └── *.stories.ts   # Component stories (NEW)
│   │   ├── pages/
│   │   └── services/
│   ├── public/                # Static assets
│   ├── package.json           # Updated with Storybook deps
│   └── vite.config.ts         # Vite config (may need updates)
├── back/                       # NestJS backend (unchanged)
├── common/                     # Shared types (unchanged)
└── docs/
    └── adr/
        └── 001-storybook-adoption.md  # NEW ADR
```

**Structure Decision**: Web application monorepo. Storybook will be installed in the `front/` workspace as it's a frontend development tool. Configuration files go in `front/.storybook/`, and component stories will be co-located with components as `*.stories.ts` files.

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/\*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

The /tasks command will generate implementation tasks based on:

1. **Configuration Tasks** (from contracts/storybook-config-contract.ts):
   - Install Storybook and required dependencies
   - Create and configure `.storybook/main.ts`
   - Create and configure `.storybook/preview.ts`
   - Configure Tailwind CSS integration
   - Add npm scripts to package.json

2. **Documentation Tasks** (from research.md):
   - Create ADR for Storybook adoption
   - Update front/README.md with Storybook usage guide
   - Document story creation conventions

3. **Example Component Tasks** (from quickstart.md):
   - Create example Button component with stories
   - Demonstrate all story patterns (variants, states, interaction tests)
   - Set up accessibility testing example

4. **Testing & Validation Tasks**:
   - Configure Storybook test runner
   - Add accessibility checks to CI/CD
   - Validate all quickstart scenarios pass

**Task Sizing**:

- Configuration tasks: 1-2 files each (focused, single responsibility)
- Example components: Co-located files (component + story + test)
- Documentation: Single files
- Estimated: 12-15 tasks total

**Ordering Strategy**:

1. **Phase 1**: Dependencies and core configuration
   - Install dependencies [P]
   - Create main.ts [P]
   - Create preview.ts [P]

2. **Phase 2**: Integration and setup
   - Configure Tailwind import (depends on preview.ts)
   - Add npm scripts (depends on installation)
   - Create ADR documentation [P]

3. **Phase 3**: Example and validation
   - Create example Button component with stories
   - Add interaction tests
   - Configure test runner
   - Validate quickstart scenarios

**Agent Assignment**:

- DevOps Agent: Storybook installation, CI/CD configuration
- Design Agent: Example component stories, documentation
- Frontend Agent: Component implementation
- Testing Agent: Test runner setup, validation

**GitHub Integration**:

The /tasks command will:

- Create spec branch: `spec/001-setup-storybook-for` (if not exists)
- Create GitHub issue for EACH task
- Assign to responsible agent
- Labels: `feature`, `agent:devops`/`agent:design`/`agent:frontend`, `P1-high`
- Link all tasks to parent spec issue

**Estimated Output**: 12-15 numbered, dependency-ordered tasks in tasks.md + individual task files in tasks/ folder + GitHub issues

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task generation (/tasks command creates tasks.md + GitHub issues + feature branch)
**Phase 4**: Implementation workflow for EACH task:

1. Create sub-branch from feature branch: `feature/[###-name]/T###-task`
2. Implement task following TDD and constitutional principles
3. **WAIT FOR USER APPROVAL** (MANDATORY)
4. Create PR from sub-branch → feature branch (closes task issue)
5. Merge after review and CI passing

**Phase 5**: Final integration:

1. After all task PRs merged to feature branch
2. Run full test suite and validation
3. **WAIT FOR USER APPROVAL** (MANDATORY)
4. Create PR from feature branch → main (closes spec issue)
5. Merge after final review

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none - no violations)
- [ ] ⚠️ User approval obtained for plan

## ⚠️ APPROVAL GATE

**MANDATORY**: User must review and approve this implementation plan before proceeding to /tasks.

**Review Checklist for User**:

- [ ] Technical approach makes sense
- [ ] Research decisions are sound
- [ ] Data model is appropriate
- [ ] API contracts are well-defined
- [ ] No major concerns about architecture

**Deliverables to Review**:

- `plan.md` - This file (implementation strategy)
- `research.md` - Technical research and decisions
- `data-model.md` - Database schema and entities
- `contracts/` - API contract definitions
- `quickstart.md` - Manual testing guide

**After Review**:

- ✅ **APPROVED**: Respond with "Approved, proceed with /tasks"
- ❌ **CHANGES NEEDED**: Comment with required changes

**Next Step**: After user approval, run `/tasks` command

---

_Based on Constitution v2.2.0 - See `.specify/memory/constitution.md`_
