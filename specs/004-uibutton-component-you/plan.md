# Implementation Plan: UI Button Component

**Branch**: `004-uibutton-component-you` | **Date**: 2025-10-08 | **Spec**: `specs/004-uibutton-component-you/spec.md`
**Input**: Feature specification from `specs/004-uibutton-component-you/spec.md`

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

Create a standardized, reusable UI Button component for the Jira Clone design system. The component must support three visual variants (filled, outline, text), five size options (xs, small, medium, large, xl), flexible content (text, icons, or both), and full integration with the palette switcher system. The button must meet WCAG 2.1 Level AAA accessibility standards and be documented in Storybook for design review.

## Technical Context

**Language/Version**: TypeScript 5.2+
**Primary Dependencies**: Vue 3.5, Vite 7.x, Tailwind CSS 4.0, Storybook 8.x
**Storage**: N/A (component library, no backend storage)
**Testing**: Vitest (unit and component tests), Storybook (visual testing)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
**Project Type**: web (frontend component library)
**Performance Goals**: 60 fps interactions, <16ms render time, instant palette switching
**Constraints**: Must use design system tokens only, no custom CSS, WCAG 2.1 AAA compliance (7:1 contrast for normal text, 4.5:1 for large text), 50% opacity for disabled state
**Scale/Scope**: Single reusable component with 3 variants × 5 sizes = 15 variations plus states (hover, active, disabled, focus)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Article I: Fundamental Values Alignment

- [x] Specification-first workflow confirmed (no code before spec) - Spec approved, now in planning
- [x] Quality over speed prioritized in timeline - Component will be fully tested and accessible
- [x] Architecture decisions will be documented in ADRs - Component design patterns documented
- [x] Consistency patterns identified and documented - Follows existing design system patterns

### Article II: Code Quality Standards

- [x] TypeScript strict mode enabled (no `any` without justification) - Project configured
- [x] ESLint (Airbnb style) + Prettier configured with pre-commit hooks - Project configured
- [x] Code review process defined (min 1 approval) - Standard workflow applies
- [x] Documentation standards clear (JSDoc for public APIs) - Component props/emits documented
- [x] Vue 3: `<script setup lang="ts">` with type-based props/emits - Component pattern confirmed
- [x] NestJS: DTOs + validation pipes + service layer abstraction - N/A (frontend only)
- [x] Common: Zod schemas for runtime validation - Will use if prop validation needed

### Article VI: Testing Discipline (NON-NEGOTIABLE)

- [x] TDD workflow confirmed (RED → user approval → GREEN → REFACTOR) - Tests written first
- [x] Coverage targets: Backend 85%, Frontend 80%, Common 90%, Critical 100% - Frontend 80% target
- [x] Test categories: Contract, Integration, Unit, E2E (all planned) - Component + unit tests planned
- [x] CI/CD gates: All tests must pass before merge - Standard gates apply
- [x] Test quality: AAA pattern, <5min execution, no flaky tests - Component tests fast and reliable

### Article V: Design System Compliance

- [x] Design system documented in `docs/design/DESIGN_SYSTEM.md` - Exists, will follow
- [x] Component library planned (no custom CSS without approval) - Using Tailwind + tokens only
- [x] Tailwind CSS only (utility classes, defined palette/spacing/typography) - Confirmed approach
- [x] Responsive: Mobile-first with standard breakpoints (640/768/1024/1280) - Button responsive

### Article IX: Accessibility (WCAG 2.1 AA)

- [x] Color contrast ≥4.5:1 planned - WCAG 2.1 AAA (7:1 for normal, 4.5:1 for large) per spec
- [x] Keyboard navigation for all interactions - Native button element ensures keyboard access
- [x] ARIA labels and semantic HTML - Semantic `<button>` element with proper ARIA
- [x] Screen reader testing planned for key flows - Storybook accessibility addon testing
- [x] Focus management strategy defined - Browser native focus + visible indicators

### Article VII: Performance Budgets

- [x] Frontend: <3s page load (3G), <1s TTI (desktop), >90 Lighthouse, <200KB bundle - Component minimal impact
- [x] Backend: <200ms p95 (simple), <500ms p95 (complex), <100ms DB queries - N/A (frontend only)
- [x] Optimizations: Code splitting, lazy loading, debouncing, pagination - N/A (single component)
- [x] Monitoring: Performance metrics, alerting on >20% p95 degradation - N/A (component library)

### Article VIII: Security Standards

- [x] Firebase Auth with JWT (24h expiration) + refresh tokens - N/A (UI component, no auth)
- [x] Input validation: class-validator (BE), VeeValidate+Zod (FE), Zod (common) - Props validated via TypeScript
- [x] Security practices: HTTPS, CORS whitelist, rate limiting, no secrets in code - No security concerns
- [x] RBAC planned with route guards (FE) and authorization checks (BE) - N/A (UI component)

### Article X: Documentation Requirements

- [x] ADRs planned for architectural decisions (`docs/adr/`) - Design decisions in research.md
- [x] Feature specs in `.specify/specs/[###-feature-name]/spec.md` - Completed
- [x] API docs (OpenAPI/Swagger), component docs, deployment guides - Storybook serves as component docs
- [x] README per workspace with onboarding guide - Design system README updated if needed

### Article III.5: Agent Delegation Requirements

- [x] Multi-file searches planned to use general-purpose agents - Will research existing patterns
- [x] Complex debugging tasks delegated to specialized agents - Standard approach
- [x] Research tasks (>3 files) assigned to agent execution - Palette switcher research via agent
- [x] Parallel execution opportunities identified for agent usage - Component + tests + stories parallel
- [x] Direct implementation justified only for single-file trivial edits - Will use proper workflow

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
front/                          # Vue 3 frontend workspace
├── src/
│   ├── designSystem/           # Design system components (target location)
│   │   ├── components/         # UI components
│   │   │   └── UiButton/       # Button component (NEW)
│   │   │       ├── UiButton.vue
│   │   │       ├── UiButton.stories.ts
│   │   │       └── UiButton.spec.ts
│   │   ├── tokens/             # Design tokens (existing - will use for colors)
│   │   └── composables/        # Design system composables (may add usePalette if needed)
│   ├── components/             # Application components (not design system)
│   └── assets/
├── .storybook/                 # Storybook configuration (existing)
└── tests/                      # Test utilities

common/                         # Shared TypeScript types (if needed for props validation)
└── src/
    └── types/

back/                           # Backend (not used for this feature)
```

**Structure Decision**: Web application structure selected. This is a frontend-only feature creating a Vue 3 component in the `front/src/designSystem/components/` directory with Storybook stories and Vitest tests. No backend changes required. Component will integrate with existing design system tokens and palette switcher.

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

1. **Component Implementation** (TDD approach):
   - Write component test file first (UiButton.spec.ts)
   - Implement component to pass tests (UiButton.vue)
   - Create Storybook stories (UiButton.stories.ts)

2. **Design System Integration**:
   - Refactor existing button to use CSS custom properties
   - Replace Tailwind utility classes with design tokens
   - Ensure palette adaptation

3. **Accessibility Implementation**:
   - WCAG 2.1 AAA compliance
   - Keyboard navigation
   - Focus indicators
   - ARIA attributes

**Task Categories**:

1. **Test Tasks** [P]:
   - Create component test file
   - Write unit tests (props, events, slots)
   - Write accessibility tests
   - Write interaction tests

2. **Implementation Tasks**:
   - Refactor component props (add xs/xl sizes, change variant names)
   - Implement CSS custom property styling
   - Add icon slot support
   - Update component logic

3. **Storybook Tasks** [P]:
   - Create variant stories
   - Create size stories
   - Create state stories
   - Create palette demonstration story
   - Add interaction tests

4. **Documentation Tasks** [P]:
   - Update component JSDoc
   - Create usage examples
   - Update design system README

**Ordering Strategy**:

1. Tests first (TDD)
2. Component implementation
3. Storybook stories (can run parallel with component)
4. Documentation (after implementation)

**Estimated Tasks**: 8-12 tasks

**Agent Assignment**:

- Frontend agent: Component implementation
- Design agent: Storybook stories, visual validation
- Testing agent: Test coverage verification

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
- [x] All NEEDS CLARIFICATION resolved (via /clarify)
- [x] Complexity deviations documented (none - all checks passed)
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
