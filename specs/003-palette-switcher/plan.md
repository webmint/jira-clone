# Implementation Plan: Palette Switcher

**Branch**: `003-palette-switcher` | **Date**: 2025-10-07 | **Spec**: [specs/003-palette-switcher/spec.md](spec.md)
**Input**: Feature specification from `specs/003-palette-switcher/spec.md`

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

Update the design system to support 5 switchable color palettes (Corporate Trust/blue, Creative Energy/purple, Natural Harmony/green, Warm Welcome/orange, Minimalist/gray), each with light and dark modes, totaling 10 variations. The design system will use 2-dimensional CSS class-based switching (palette class + mode class, e.g., `.corporate-trust.light`) on the root element, with all components using semantic design tokens that automatically resolve to the active palette and mode. This infrastructure enables applications to implement dynamic theme switching without modifying component code. Includes Storybook integration for previewing components in all 10 variations and documentation for creating palette-aware components.

## Technical Context

**Language/Version**: TypeScript 5.2+
**Primary Dependencies**: Vue 3.5, Vite 7.x, Tailwind CSS 4.0, Storybook 8.x
**Storage**: N/A (design system tokens stored in CSS/TypeScript files)
**Testing**: Vitest (component tests), accessibility tests (axe-core)
**Target Platform**: Web browsers (modern evergreen browsers)
**Project Type**: web (frontend-focused design system)
**Performance Goals**: Instant theme switching (<16ms frame time for 60fps), no layout shifts during palette changes
**Constraints**: WCAG AA compliance (4.5:1 contrast for text, 3:1 for large text), semantic token names must remain consistent across all variations, 2-dimensional CSS class system (palette + mode)
**Scale/Scope**: 5 palettes × 2 modes = 10 total variations, ~50-100 design tokens per variation, applies to all existing and future components in the design system

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Article I: Fundamental Values Alignment

- [x] Specification-first workflow confirmed (spec approved before planning)
- [x] Quality over speed prioritized (focus on complete token coverage and accessibility)
- [x] Architecture decisions documented (palette structure, switching mechanism decided)
- [x] Consistency patterns identified (semantic token naming, universal components)

### Article II: Code Quality Standards

- [x] TypeScript strict mode enabled (existing project configuration)
- [x] ESLint (Airbnb style) + Prettier configured with pre-commit hooks (existing)
- [x] Code review process defined (min 1 approval per constitution)
- [x] Documentation standards clear (token documentation, usage guidelines to be added)
- [x] Vue 3: `<script setup lang="ts">` with type-based props/emits (for any new components)
- [N/A] NestJS: Not applicable (frontend-only feature)
- [N/A] Common: Not applicable (design system tokens, no shared runtime validation needed)

### Article VI: Testing Discipline (NON-NEGOTIABLE)

- [x] TDD workflow confirmed (write tests for palette token validation and accessibility)
- [x] Coverage targets: Frontend 80% (token validation, accessibility contrast tests)
- [x] Test categories: Unit tests (token validation), Accessibility tests (WCAG contrast)
- [x] CI/CD gates: All tests must pass before merge
- [x] Test quality: AAA pattern, fast execution, no flaky tests

### Article V: Design System Compliance

- [x] Design system documented (will update palette documentation)
- [x] Component library uses design system tokens (existing components to be validated)
- [x] Tailwind CSS only (tokens.css uses @theme directive for Tailwind CSS 4.0)
- [x] Responsive: Mobile-first with standard breakpoints (existing structure maintained)

### Article IX: Accessibility (WCAG 2.1 AA)

- [x] Color contrast ≥4.5:1 for text, ≥3:1 for large text (automated validation tests planned)
- [x] Keyboard navigation maintained (palette switching via class doesn't affect keyboard nav)
- [x] ARIA labels and semantic HTML (no new interactive elements, documentation only)
- [x] Screen reader testing not required (design system tokens, no UI changes)
- [x] Focus management not affected (CSS-only palette switching)

### Article VII: Performance Budgets

- [x] Frontend: Instant theme switching (<16ms), no layout shifts, minimal CSS property updates
- [N/A] Backend: Not applicable (frontend-only feature)
- [x] Optimizations: CSS custom properties enable efficient palette switching without re-rendering
- [x] Monitoring: Visual regression testing in Storybook to verify palette switching performance

### Article VIII: Security Standards

- [N/A] Firebase Auth: Not applicable (design system infrastructure, no auth changes)
- [N/A] Input validation: Not applicable (no user input, CSS/TypeScript tokens only)
- [N/A] Security practices: Not applicable (no API endpoints or data handling)
- [N/A] RBAC: Not applicable (design system available to all components)

### Article X: Documentation Requirements

- [x] ADRs planned (palette structure decision, CSS class switching approach)
- [x] Feature specs completed (specs/003-palette-switcher/spec.md)
- [x] Component docs (Storybook stories, usage guidelines for palette-aware components)
- [x] Design system documentation (token documentation, palette switching guide)

### Article III.5: Agent Delegation Requirements

- [x] Multi-file searches for existing component token usage (use general-purpose agents)
- [x] Storybook configuration research (use research agents)
- [x] Token validation across multiple files (use agents for parallel execution)
- [x] Direct implementation for individual file updates (token documentation, simple edits)
- [x] Parallel execution for token validation tests across palettes

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
front/                                    # Frontend application
├── src/
│   ├── designSystem/
│   │   ├── styles/
│   │   │   └── tokens.css               # CSS custom properties (palettes defined here)
│   │   ├── tokens/
│   │   │   ├── reference.tokens.ts      # Base design tokens
│   │   │   ├── system.tokens.ts         # Semantic token mappings
│   │   │   ├── types.ts                 # Token type definitions
│   │   │   ├── utils.ts                 # Token utilities
│   │   │   └── validation.ts            # Token validation
│   │   └── components/                  # Design system components
│   ├── components/                      # Application components
│   └── assets/
│       └── styles/
│           └── tailwind.css             # Tailwind CSS configuration
└── tests/
    └── unit/
        └── designSystem/
            └── tokens/
                ├── contrast.spec.ts     # Accessibility contrast tests
                └── validation.spec.ts   # Token validation tests

.storybook/                              # Storybook configuration
└── preview.ts                           # Storybook preview config (theme switching will be added here)
```

**Structure Decision**: This is a **web application** (frontend-focused). The design system is located in `front/src/designSystem/`. Token definitions are split between CSS (`tokens.css`) for runtime CSS custom properties and TypeScript (`tokens/*.ts`) for compile-time token usage. This feature will primarily modify the design system structure to ensure both light and dark palettes are complete, add Storybook theme switching controls, and provide documentation for palette-aware component development.

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
- Generate tasks from Phase 1 design docs (data-model.md, contracts, quickstart.md)
- **Token definition tasks**: Create CSS definitions for 4 new palettes (Creative Energy, Natural Harmony, Warm Welcome, Minimalist) in both light and dark modes
- **Validation tasks**: Implement token validation functions from contracts
- **Test tasks**: Write accessibility contrast tests for all 10 variations
- **Storybook tasks**: Configure dual toolbar controls for palette + mode switching
- **Documentation tasks**: Create usage guidelines for palette-aware component development

**Task Breakdown by Area**:

1. **Design Tokens (CSS)** - 4 tasks (1 per new palette):
   - T001: Define Creative Energy palette (light + dark modes) in tokens.css [Frontend Agent]
   - T002: Define Natural Harmony palette (light + dark modes) in tokens.css [Frontend Agent]
   - T003: Define Warm Welcome palette (light + dark modes) in tokens.css [Frontend Agent]
   - T004: Define Minimalist palette (light + dark modes) in tokens.css [Frontend Agent]

2. **Token Validation** - 3 tasks:
   - T005: Implement validateTokenCompleteness function [Frontend Agent]
   - T006: Implement validateContrastRatios function with WCAG calculation [Frontend Agent]
   - T007: Implement getCSSVariable and getContrastRatio helper functions [Frontend Agent]

3. **Automated Tests** - 2 tasks:
   - T008: Write token completeness tests for all 10 variations [Testing Agent]
   - T009: Write WCAG contrast tests for all 10 variations (50 test cases: 10 variations × 5 token pairs) [Testing Agent]

4. **Storybook Integration** - 2 tasks:
   - T010: Configure dual globalTypes (palette dropdown + mode toggle) in preview.ts [Frontend Agent]
   - T011: Create withTheme decorator to apply both palette and mode classes [Frontend Agent]

5. **Documentation** - 3 tasks:
   - T012: Document 2-dimensional palette system in design system docs [Documentation Agent]
   - T013: Create usage guide for palette-aware component development [Documentation Agent]
   - T014: Add palette switching examples to Storybook stories [Frontend Agent]

**Ordering Strategy**:

- **Phase 1**: Token definitions (T001-T004) - Can run in parallel [P]
- **Phase 2**: Validation functions (T005-T007) - Sequential (T007 is helper for T005-T006)
- **Phase 3**: Tests (T008-T009) - Depends on T001-T007 complete
- **Phase 4**: Storybook (T010-T011) - Depends on T001-T004 complete
- **Phase 5**: Documentation (T012-T014) - Can run in parallel after all implementation complete

**Agent Assignments**:

- **Frontend Agent**: T001-T007, T010-T011, T014 (token implementation, validation, Storybook)
- **Testing Agent**: T008-T009 (automated test suites)
- **Documentation Agent**: T012-T013 (documentation and guides)

**Estimated Output**: 14 numbered, ordered tasks in tasks.md + 14 GitHub sub-issues

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

No constitutional violations or complexity exceptions required. This feature:

- Works within existing design system structure
- Uses standard CSS custom properties and classes
- Follows established TypeScript and testing patterns
- No new dependencies or architectural changes needed

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
- [x] Complexity deviations documented (none - follows existing design system patterns)
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
