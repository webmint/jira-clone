# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

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

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Article I: Fundamental Values Alignment

- [ ] Specification-first workflow confirmed (no code before spec)
- [ ] Quality over speed prioritized in timeline
- [ ] Architecture decisions will be documented in ADRs
- [ ] Consistency patterns identified and documented

### Article II: Code Quality Standards

- [ ] TypeScript strict mode enabled (no `any` without justification)
- [ ] ESLint (Airbnb style) + Prettier configured with pre-commit hooks
- [ ] Code review process defined (min 1 approval)
- [ ] Documentation standards clear (JSDoc for public APIs)
- [ ] Vue 3: `<script setup lang="ts">` with type-based props/emits
- [ ] NestJS: DTOs + validation pipes + service layer abstraction
- [ ] Common: Zod schemas for runtime validation

### Article VI: Testing Discipline (NON-NEGOTIABLE)

- [ ] TDD workflow confirmed (RED → user approval → GREEN → REFACTOR)
- [ ] Coverage targets: Backend 85%, Frontend 80%, Common 90%, Critical 100%
- [ ] Test categories: Contract, Integration, Unit, E2E (all planned)
- [ ] CI/CD gates: All tests must pass before merge
- [ ] Test quality: AAA pattern, <5min execution, no flaky tests

### Article V: Design System Compliance

- [ ] Design system documented in `docs/design/DESIGN_SYSTEM.md`
- [ ] Component library planned (no custom CSS without approval)
- [ ] Tailwind CSS only (utility classes, defined palette/spacing/typography)
- [ ] Responsive: Mobile-first with standard breakpoints (640/768/1024/1280)

### Article IX: Accessibility (WCAG 2.1 AA)

- [ ] Color contrast ≥4.5:1 planned
- [ ] Keyboard navigation for all interactions
- [ ] ARIA labels and semantic HTML
- [ ] Screen reader testing planned for key flows
- [ ] Focus management strategy defined

### Article VII: Performance Budgets

- [ ] Frontend: <3s page load (3G), <1s TTI (desktop), >90 Lighthouse, <200KB bundle
- [ ] Backend: <200ms p95 (simple), <500ms p95 (complex), <100ms DB queries
- [ ] Optimizations: Code splitting, lazy loading, debouncing, pagination
- [ ] Monitoring: Performance metrics, alerting on >20% p95 degradation

### Article VIII: Security Standards

- [ ] Firebase Auth with JWT (24h expiration) + refresh tokens
- [ ] Input validation: class-validator (BE), VeeValidate+Zod (FE), Zod (common)
- [ ] Security practices: HTTPS, CORS whitelist, rate limiting, no secrets in code
- [ ] RBAC planned with route guards (FE) and authorization checks (BE)

### Article X: Documentation Requirements

- [ ] ADRs planned for architectural decisions (`docs/adr/`)
- [ ] Feature specs in `.specify/specs/[###-feature-name]/spec.md`
- [ ] API docs (OpenAPI/Swagger), component docs, deployment guides
- [ ] README per workspace with onboarding guide

### Article III.5: Agent Delegation Requirements

- [ ] Multi-file searches planned to use general-purpose agents
- [ ] Complex debugging tasks delegated to specialized agents
- [ ] Research tasks (>3 files) assigned to agent execution
- [ ] Parallel execution opportunities identified for agent usage
- [ ] Direct implementation justified only for single-file trivial edits

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

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

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

- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P]
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:

- TDD order: Tests before implementation
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**GitHub Integration**:

- Create feature branch: `feature/[###-feature-name]` from `main`
- Create GitHub issue for EACH task
- Assign tasks to responsible agents
- Label tasks with: `feature`, agent label, priority

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md + GitHub issues

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

- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented
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
