# Tasks: Design System Foundation - Styles

**Input**: Design documents from `/specs/002-design-system/`
**Prerequisites**: plan.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓

## Summary

This task breakdown implements a comprehensive design system foundation with 5 professional color palettes, typography (Roboto), spacing, and additional style categories. All colors meet WCAG 2.1 AAA standards (7:1 contrast for normal text). The system supports light/dark themes and integrates with Tailwind CSS 4.0 using the `@theme` directive.

**Total Tasks**: 32
**Estimated Duration**: 8-10 days
**Agent Assignment**: All tasks → `agent:frontend` (design system is frontend-focused)

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Setup & Foundation (Sequential)

- [x] **T001** Create project structure for design system (front/src/designSystem/ with tokens/, palettes/, storybook/, composables/, styles/ subdirectories)
- [x] **T002** Install and configure dependencies (Tailwind CSS 4.0, Zod 4.x, @vueuse/core, storybook-design-token v3.3.0)
- [x] **T003** Configure Tailwind CSS 4.0 with @theme directive support in tailwind.config.ts
- [ ] **T004** Configure Storybook 8.x with design token addon and theme switching in .storybook/main.ts and .storybook/preview.ts

## Phase 3.2: Token Definitions (Parallel Execution)

**IMPORTANT**: All token definition tasks can run in parallel as they create separate files.

- [ ] **T005 [P]** Create reference tokens file with typography primitives (font family, sizes, weights, line heights) in src/tokens/reference.tokens.ts
- [ ] **T006 [P]** Create reference tokens for spacing scale (rem-based, base-8 pattern) in src/tokens/reference.tokens.ts
- [ ] **T007 [P]** Create reference tokens for shadows (5 levels: SM, BASE, MD, LG, XL) in src/tokens/reference.tokens.ts
- [ ] **T008 [P]** Create reference tokens for border radius (7 values: NONE to FULL) in src/tokens/reference.tokens.ts
- [ ] **T009 [P]** Create reference tokens for z-index scale (8 levels: HIDE to TOOLTIP) in src/tokens/reference.tokens.ts
- [ ] **T010 [P]** Create reference tokens for opacity values (8 steps: 0 to 100) in src/tokens/reference.tokens.ts
- [ ] **T011 [P]** Create reference tokens for transitions (duration + timing functions) in src/tokens/reference.tokens.ts

## Phase 3.3: Color Palettes (Parallel Execution)

**IMPORTANT**: Each palette is independent and can be created in parallel. All must pass WCAG 2.1 AAA validation (7:1 contrast for normal text, 4.5:1 for large text).

- [ ] **T012 [P]** Generate Corporate Trust palette (Blue-Gray neutral, professional) with WCAG AAA validation in src/palettes/corporate-trust.palette.ts
- [ ] **T013 [P]** Generate Modern Tech palette (Teal-Slate, innovative) with WCAG AAA validation in src/palettes/modern-tech.palette.ts
- [ ] **T014 [P]** Generate Sophisticated Luxury palette (Charcoal-Gold, premium) with WCAG AAA validation in src/palettes/sophisticated-luxury.palette.ts
- [ ] **T015 [P]** Generate Clean Minimal palette (Pure neutrals, timeless) with WCAG AAA validation in src/palettes/clean-minimal.palette.ts
- [ ] **T016 [P]** Generate Vibrant Professional palette (Purple-Green, energetic) with WCAG AAA validation in src/palettes/vibrant-professional.palette.ts

## Phase 3.4: Type System & Validation (Parallel Execution)

- [ ] **T017 [P]** Create TypeScript type definitions for design tokens with deep key extraction in src/tokens/types.ts
- [ ] **T018 [P]** Create Zod validation schemas for all token categories (colors, spacing, shadows, etc.) in src/tokens/validation.ts
- [ ] **T019 [P]** Create system tokens with semantic mappings (PRIMARY, BACKGROUND, SURFACE, TEXT, etc.) in src/tokens/system.tokens.ts

## Phase 3.5: CSS Generation & Theme Support

**IMPORTANT**: Sequential tasks as they build on each other.

- [ ] **T020** Create tokens.css with @theme directive and CSS variable definitions in src/assets/styles/tokens.css
- [ ] **T021** Implement light theme CSS variables (background, surface, text colors) in tokens.css
- [ ] **T022** Implement dark theme CSS variables with WCAG AAA contrast validation in tokens.css
- [ ] **T023** Create token utility functions (getToken, resolveToken) in src/tokens/utils.ts

## Phase 3.6: Vue Composables (Parallel Execution)

- [ ] **T024 [P]** Create useTheme composable for theme switching (light/dark/system) with localStorage persistence in src/composables/useTheme.ts
- [ ] **T025 [P]** Create useTokens composable for type-safe token access in components in src/composables/useTokens.ts

## Phase 3.7: Storybook Documentation (Parallel Execution)

**IMPORTANT**: All Storybook stories are independent and can be created in parallel.

- [ ] **T026 [P]** Create Colors.stories.mdx showcasing all 5 color palettes with interactive selection in src/design-system/Colors.stories.mdx
- [ ] **T027 [P]** Create Typography.stories.mdx with Roboto font showcase (all weights, sizes, line heights) in src/design-system/Typography.stories.mdx
- [ ] **T028 [P]** Create Spacing.stories.mdx with spacing scale visualization in src/design-system/Spacing.stories.mdx
- [ ] **T029 [P]** Create Shadows.stories.mdx, BorderRadius.stories.mdx, ZIndex.stories.mdx, Opacity.stories.mdx, Transitions.stories.mdx for additional style categories in src/design-system/

## Phase 3.8: Testing & Validation

- [ ] **T030** Write token validation tests using Zod schemas in tests/unit/tokens/validation.spec.ts
- [ ] **T031** Write WCAG contrast ratio tests for all 5 color palettes (verify 7:1 for normal text) in tests/unit/tokens/contrast.spec.ts
- [ ] **T032** Write theme switching integration tests (light/dark mode, CSS variable updates) in tests/unit/composables/useTheme.spec.ts

## Dependencies

```
Foundation Layer (Sequential):
  T001 → T002 → T003 → T004

Token Layer (Parallel after T004):
  T005, T006, T007, T008, T009, T010, T011 [All parallel]

Palette Layer (Parallel after T004):
  T012, T013, T014, T015, T016 [All parallel]

Type System Layer (Parallel after T005-T011):
  T017, T018 [Parallel]
  T019 depends on T005-T011

CSS Layer (Sequential after T012-T016, T019):
  T020 → T021 → T022 → T023

Composables Layer (Parallel after T020-T023):
  T024, T025 [Both parallel]

Storybook Layer (Parallel after T020-T023):
  T026, T027, T028, T029 [All parallel]

Testing Layer (Sequential after T024-T029):
  T030 → T031 → T032
```

## Parallel Execution Examples

### Example 1: Reference Token Creation (Phase 3.2)

After T004 completes, launch all reference token tasks in parallel:

```bash
# All these tasks modify the same file (reference.tokens.ts) but add independent sections
# Execute sequentially despite being conceptually parallel
Task T005: Typography primitives
Task T006: Spacing scale
Task T007: Shadow definitions
Task T008: Border radius values
Task T009: Z-index scale
Task T010: Opacity values
Task T011: Transition definitions
```

**Note**: While these are marked [P], they modify the same file. Implement them in sequence but treat them as independent units of work.

### Example 2: Color Palette Generation (Phase 3.3)

After T004 completes, launch all palette tasks truly in parallel (different files):

```bash
# Each task creates a separate file - true parallel execution
Task T012: Corporate Trust palette (corporate-trust.palette.ts)
Task T013: Modern Tech palette (modern-tech.palette.ts)
Task T014: Sophisticated Luxury palette (sophisticated-luxury.palette.ts)
Task T015: Clean Minimal palette (clean-minimal.palette.ts)
Task T016: Vibrant Professional palette (vibrant-professional.palette.ts)
```

### Example 3: Storybook Stories (Phase 3.7)

After T023 completes, launch all story tasks in parallel (different files):

```bash
# Each story is a separate MDX file - true parallel execution
Task T026: Colors.stories.mdx
Task T027: Typography.stories.mdx
Task T028: Spacing.stories.mdx
Task T029: Additional style stories (Shadows, BorderRadius, etc.)
```

## Branch Strategy

**Spec Branch**: `spec/002-design-system` (created from `main`, contains spec + plan + tasks)

**Task Sub-branches**: Each task gets its own branch from spec branch

- Format: `spec/002-design-system/T###-task-name`
- Example: `spec/002-design-system/T012-corporate-trust-palette`

**Workflow for Each Task (SEQUENTIAL - MANDATORY)**:

1. **BEFORE starting new task**: Verify previous task PR merged to spec branch
2. Pull latest from spec branch: `git checkout spec/002-design-system && git pull origin spec/002-design-system`
3. Create task sub-branch: `git checkout -b spec/002-design-system/T###-task-name`
4. Link branch to GitHub issue: `gh issue develop #[issue-number] --branch spec/002-design-system/T###-task-name`
5. Move issue to "In Progress" column: Based on agent assignment (all tasks → "🎨 Frontend Dev")
6. Implement task on sub-branch (TDD workflow: write tests → get approval → implement)
7. Run quality gates (tests, linting, type checking, build)
8. Attempt git commit:
   - If Husky pre-commit hooks FAIL:
     - **STOP** - display errors to user
     - Ask: "Pre-commit hooks failed. Approve fixes for: [errors]?"
     - **WAIT FOR USER APPROVAL** (MANDATORY)
     - Fix errors after approval
     - Retry commit
   - If hooks PASS: commit succeeds
9. **WAIT FOR USER APPROVAL** of completed task (MANDATORY)
10. After approval:
    - Push task branch: `git push -u origin spec/002-design-system/T###-task-name`
    - Create PR: `spec/002-design-system/T###-task` → `spec/002-design-system`
    - Move issue to "👀 Review" column
    - Wait for PR merge
11. After PR merged:
    - Move issue to "✅ Done" column and close issue
    - Switch to spec branch: `git checkout spec/002-design-system`
    - Pull latest changes: `git pull origin spec/002-design-system`
    - **ONLY THEN** proceed to next task

**Final PR**: After ALL tasks merged to spec branch

- Run full test suite on spec branch
- Run manual testing scenarios from quickstart.md
- **WAIT FOR USER APPROVAL** of entire feature (MANDATORY)
- Create PR: `spec/002-design-system` → `main`
- Closes parent spec issue

## GitHub Integration

**Parent Spec Issue**: #[spec-issue-number] (to be created)
**Spec Branch**: `spec/002-design-system`
**Task Issues**: Will be created for each task below

**Issue Labels**:

- `feature` (type)
- `agent:frontend` (assignment for all tasks)
- `P1-high` (priority - foundational feature)

**Project Board Columns**:

- Initial: "📋 Backlog"
- On start: "🎨 Frontend Dev"
- On PR: "👀 Review"
- On merge: "✅ Done"

## Task Summary by Category

| Category             | Tasks     | Parallel? | Agent          |
| -------------------- | --------- | --------- | -------------- |
| Setup & Foundation   | T001-T004 | No        | agent:frontend |
| Token Definitions    | T005-T011 | Pseudo\*  | agent:frontend |
| Color Palettes       | T012-T016 | Yes       | agent:frontend |
| Type System          | T017-T019 | Partial   | agent:frontend |
| CSS & Theme          | T020-T023 | No        | agent:frontend |
| Vue Composables      | T024-T025 | Yes       | agent:frontend |
| Storybook Stories    | T026-T029 | Yes       | agent:frontend |
| Testing & Validation | T030-T032 | No        | agent:frontend |

\*Pseudo-parallel: Tasks are conceptually independent but modify the same file, so must be executed sequentially.

## Validation Checklist

_GATE: Checked before proceeding to implementation_

- [x] All token categories have definition tasks (typography, spacing, shadows, border-radius, z-index, opacity, transitions)
- [x] All 5 color palettes have creation tasks (Corporate Trust, Modern Tech, Sophisticated Luxury, Clean Minimal, Vibrant Professional)
- [x] All palettes include WCAG AAA validation (7:1 contrast)
- [x] Type-safe token access implemented (TypeScript types + Zod validation)
- [x] Theme switching implemented (light/dark modes)
- [x] Storybook documentation for all token categories
- [x] Parallel tasks truly independent (different files)
- [x] Each task specifies exact file path
- [x] Dependencies correctly identified
- [x] Test coverage planned (token validation, WCAG contrast, theme switching)

## Notes

- **Roboto Font**: Loaded via Google Fonts CDN (link in index.html or Storybook preview)
- **WCAG AAA**: All color combinations must pass 7:1 contrast for normal text, 4.5:1 for large text
- **Tailwind CSS 4.0**: Uses `@theme` directive for CSS-first configuration
- **Token Architecture**: 3-layer system (Reference → System → Component)
- **Testing Strategy**: Unit tests for validation, integration tests for theme switching, visual regression in Storybook
- **No Components**: This phase focuses exclusively on design tokens and styles
- **User Approval Required**: After EACH task completion before creating PR
- **TDD Workflow**: Write tests first, get approval, then implement

## ⚠️ APPROVAL GATE

**MANDATORY**: User must review and approve task breakdown before implementation begins.

**Review Checklist for User**:

- [ ] Task breakdown is complete and logical
- [ ] All 5 color palettes are included
- [ ] Dependencies are correctly identified
- [ ] Parallel tasks are truly independent
- [ ] Task ordering makes sense (setup → tokens → palettes → CSS → composables → Storybook → tests)
- [ ] No tasks are missing or duplicated
- [ ] GitHub issue creation strategy is clear

**Deliverables to Review**:

- `tasks.md` - This file (complete task breakdown with 32 tasks)
- `tasks/` folder - Individual task files for each task (T001-T032)
- Spec branch: `spec/002-design-system` (already exists with spec + plan)
- GitHub issues: Will be created for each task after approval

**After Review**:

- ✅ **APPROVED**: Respond with "Approved, begin implementation"
- ❌ **CHANGES NEEDED**: Comment with required changes to task breakdown

**Next Step**: After user approval:

1. Create individual task files in `tasks/` folder
2. Create GitHub issues for all 32 tasks
3. Add all issues to "📋 Backlog" column
4. Commit tasks.md + tasks/ folder to spec branch
5. Begin implementing tasks one by one (starting with T001)
