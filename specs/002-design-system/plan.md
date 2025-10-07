# Implementation Plan: Design System Foundation - Styles

**Branch**: `002-design-system` | **Date**: 2025-10-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/Users/mykolakudlyk/Projects/private/jira-clone/specs/002-design-system/spec.md`

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

Establish a foundational design system for the application with comprehensive style definitions including typography (Roboto font), color palettes (light/dark themes), spacing scales (rem units), and additional style categories (border radius, shadows, transitions, z-index, opacity). The system will provide 5 professional color palette proposals for selection, meeting WCAG 2.1 AAA accessibility standards. No UI components are required in this phase - focus is exclusively on design tokens and style foundations that will serve as the single source of truth for visual consistency.

## Technical Context

**Language/Version**: TypeScript 5.2+, CSS/Tailwind CSS 4.0
**Primary Dependencies**: Vue 3.5, Vite 7.x, Tailwind CSS 4.0, Storybook 8.x
**Storage**: Design token files (JSON/TypeScript), CSS variable definitions, documentation
**Testing**: Vitest (token validation), Storybook (visual testing), accessibility tests (axe-core)
**Target Platform**: Web browsers (modern, ES2022+)
**Project Type**: Web application (frontend-focused design system)
**Performance Goals**: Minimal runtime overhead, optimized CSS output, tree-shakeable tokens
**Constraints**: WCAG 2.1 AAA contrast ratios (7:1 normal text, 4.5:1 large text), Roboto font with fallbacks, rem-based spacing
**Scale/Scope**: Foundation for entire application UI, reusable across all future components

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Article I: Fundamental Values Alignment

- [x] Specification-first workflow confirmed (no code before spec) - Spec completed with clarifications
- [x] Quality over speed prioritized in timeline - Focus on creating reusable, well-designed foundation
- [x] Architecture decisions will be documented in ADRs - Design token structure decisions will be documented
- [x] Consistency patterns identified and documented - Design system itself establishes consistency patterns

### Article II: Code Quality Standards

- [x] TypeScript strict mode enabled (no `any` without justification) - Token definitions will use strict TypeScript
- [x] ESLint (Airbnb style) + Prettier configured with pre-commit hooks - Existing project configuration applies
- [x] Code review process defined (min 1 approval) - Standard PR process
- [x] Documentation standards clear (JSDoc for public APIs) - Design tokens will be documented
- [N/A] Vue 3: `<script setup lang="ts">` with type-based props/emits - No components in this phase
- [N/A] NestJS: DTOs + validation pipes + service layer abstraction - No backend in this feature
- [x] Common: Zod schemas for runtime validation - Token validation schemas

### Article VI: Testing Discipline (NON-NEGOTIABLE)

- [x] TDD workflow confirmed (RED → user approval → GREEN → REFACTOR) - Token validation tests first
- [x] Coverage targets: Backend 85%, Frontend 80%, Common 90%, Critical 100% - Design tokens target 90% (common-like)
- [x] Test categories: Contract, Integration, Unit, E2E (all planned) - Unit tests for token validation, visual regression in Storybook
- [x] CI/CD gates: All tests must pass before merge - Standard gates apply
- [x] Test quality: AAA pattern, <5min execution, no flaky tests - Token tests are fast and deterministic

### Article V: Design System Compliance

- [x] Design system documented in `docs/design/DESIGN_SYSTEM.md` - This feature CREATES the design system documentation
- [N/A] Component library planned (no custom CSS without approval) - Components come later, this defines the foundation
- [x] Tailwind CSS only (utility classes, defined palette/spacing/typography) - Design tokens will integrate with Tailwind config
- [x] Responsive: Mobile-first with standard breakpoints (640/768/1024/1280) - Tokens will support responsive design patterns

### Article IX: Accessibility (WCAG 2.1 AAA - Enhanced)

- [x] Color contrast ≥7:1 for normal text, ≥4.5:1 for large text (WCAG AAA) - All color palettes will be validated
- [N/A] Keyboard navigation for all interactions - No interactive components in this phase
- [N/A] ARIA labels and semantic HTML - No markup in this phase
- [N/A] Screen reader testing planned for key flows - No UI components in this phase
- [N/A] Focus management strategy defined - Foundational styles only, no interaction patterns yet

### Article VII: Performance Budgets

- [x] Frontend: <3s page load (3G), <1s TTI (desktop), >90 Lighthouse, <200KB bundle - Tokens add minimal overhead, optimized CSS output
- [N/A] Backend: <200ms p95 (simple), <500ms p95 (complex), <100ms DB queries - No backend in this feature
- [x] Optimizations: Code splitting, lazy loading, debouncing, pagination - Tree-shakeable token exports
- [x] Monitoring: Performance metrics, alerting on >20% p95 degradation - CSS bundle size monitored in CI

### Article VIII: Security Standards

- [N/A] Firebase Auth with JWT (24h expiration) + refresh tokens - No authentication in design tokens
- [x] Input validation: class-validator (BE), VeeValidate+Zod (FE), Zod (common) - Zod schemas for token structure validation
- [x] Security practices: HTTPS, CORS whitelist, rate limiting, no secrets in code - Static design tokens, no secrets
- [N/A] RBAC planned with route guards (FE) and authorization checks (BE) - No access control for design tokens

### Article X: Documentation Requirements

- [x] ADRs planned for architectural decisions (`docs/adr/`) - ADR for design token structure and Tailwind integration
- [x] Feature specs in `.specify/specs/[###-feature-name]/spec.md` - Completed with clarifications
- [x] API docs (OpenAPI/Swagger), component docs, deployment guides - Design system documentation, token usage guide
- [x] README per workspace with onboarding guide - Design tokens README with examples

### Article III.5: Agent Delegation Requirements

- [x] Multi-file searches planned to use general-purpose agents - Research for design token best practices
- [x] Complex debugging tasks delegated to specialized agents - Will use agents for token validation debugging if needed
- [x] Research tasks (>3 files) assigned to agent execution - Color palette research, Tailwind CSS integration patterns
- [x] Parallel execution opportunities identified for agent usage - 5 palette proposals can be generated in parallel
- [x] Direct implementation justified only for single-file trivial edits - Token files are well-scoped, can be created directly

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

**Structure Decision**: Web application structure (frontend-focused design system). No backend needed for this feature.

```
src/
├── assets/
│   └── styles/
│       ├── tokens.css          # Main @theme definitions
│       └── global.css          # Global styles
├── tokens/
│   ├── reference.tokens.ts     # Layer 1: Primitives
│   ├── system.tokens.ts        # Layer 2: Semantic tokens
│   ├── types.ts                # TypeScript types
│   ├── utils.ts                # Token helper functions
│   └── validation.ts           # Zod validation schemas
├── palettes/
│   ├── corporate-trust.palette.ts
│   ├── modern-tech.palette.ts
│   ├── sophisticated-luxury.palette.ts
│   ├── clean-minimal.palette.ts
│   └── vibrant-professional.palette.ts
├── design-system/
│   ├── Colors.stories.mdx
│   ├── Typography.stories.mdx
│   ├── Spacing.stories.mdx
│   ├── Shadows.stories.mdx
│   ├── BorderRadius.stories.mdx
│   ├── ZIndex.stories.mdx
│   ├── Opacity.stories.mdx
│   └── Transitions.stories.mdx
├── composables/
│   ├── useTheme.ts             # Theme switching logic
│   └── useTokens.ts            # Token access helpers
└── main.ts

tests/
└── unit/
    └── tokens/
        ├── validation.spec.ts  # Zod schema tests
        ├── contrast.spec.ts    # WCAG validation tests
        └── types.spec.ts       # TypeScript type tests
```

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

The `/tasks` command will generate implementation tasks based on the design system data model and research findings:

1. **Foundation Tasks** (infrastructure, configuration):
   - Setup TypeScript project structure for tokens
   - Install and configure dependencies (Tailwind CSS 4.0, Zod, Storybook 8.x)
   - Create base file structure (tokens/, palettes/, design-system/)
   - Configure Vite and Tailwind with @theme support

2. **Token Definition Tasks** (parallel execution):
   - Create reference tokens file with all primitives [P]
   - Create system tokens with semantic mappings [P]
   - Generate TypeScript types from token structure [P]
   - Create Zod validation schemas [P]

3. **Color Palette Tasks** (parallel execution):
   - Generate Corporate Trust palette with WCAG validation [P]
   - Generate Modern Tech palette with WCAG validation [P]
   - Generate Sophisticated Luxury palette with WCAG validation [P]
   - Generate Clean Minimal palette with WCAG validation [P]
   - Generate Vibrant Professional palette with WCAG validation [P]

4. **CSS Generation Tasks**:
   - Create tokens.css with @theme directive
   - Implement light theme CSS variables
   - Implement dark theme CSS variables
   - Test Tailwind utility class generation

5. **Composable Tasks** (parallel execution):
   - Create useTheme composable for theme switching [P]
   - Create useTokens composable for type-safe token access [P]

6. **Storybook Documentation Tasks** (parallel execution):
   - Create Colors.stories.mdx with all 5 palettes [P]
   - Create Typography.stories.mdx with Roboto showcase [P]
   - Create Spacing.stories.mdx with spacing scale [P]
   - Create Shadows.stories.mdx [P]
   - Create BorderRadius.stories.mdx [P]
   - Create additional style category stories [P]

7. **Testing Tasks**:
   - Write Zod validation tests
   - Write WCAG contrast ratio tests for all palettes
   - Write theme switching tests
   - Write visual regression tests (Storybook)

8. **Documentation Tasks**:
   - Create ADR for design token architecture
   - Create design system README
   - Document token usage examples
   - Update project documentation

**Ordering Strategy**:

- **Layer 1 (Foundation)**: Setup tasks must complete first (not parallel)
- **Layer 2 (Tokens & Palettes)**: All token and palette tasks can run in parallel [P]
- **Layer 3 (Integration)**: CSS, composables, Storybook (depends on Layer 2)
- **Layer 4 (Validation)**: Tests (depends on Layer 3)
- **Layer 5 (Documentation)**: Docs (can run in parallel with testing)

**Agent Assignment**:

- **agent:frontend** - All tasks (design system is frontend-focused)
- No backend agent needed (no API/database in this feature)

**GitHub Integration**:

- Create feature branch: `feature/002-design-system` from `main`
- Create GitHub issue for EACH task with labels:
  - `feature` (type)
  - `agent:frontend` (assignment)
  - `P1-high` (priority - foundational feature)
- Add all issues to project board "📋 Backlog" column

**Estimated Output**: 30-35 numbered, ordered tasks in tasks.md + GitHub issues

Tasks will be grouped by:

- Foundation (1-4)
- Tokens (5-8)
- Palettes (9-13)
- CSS & Composables (14-17)
- Storybook Stories (18-25)
- Testing (26-30)
- Documentation (31-35)

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
- [x] Complexity deviations documented (none)
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
