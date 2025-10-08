# Tasks: Palette Switcher

**Input**: Design documents from `/specs/003-palette-switcher/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Summary

Extend the design system to support 5 color palettes (Corporate Trust/blue, Creative Energy/purple, Natural Harmony/green, Warm Welcome/orange, Minimalist/gray), each with light and dark modes, totaling 10 variations. Use 2-dimensional CSS class-based switching (palette + mode classes) with semantic design tokens. Includes Storybook integration, validation functions, and comprehensive accessibility testing.

**Total Tasks**: 14
**Estimated Duration**: 3-4 days
**Parallel Tasks**: 10 (marked with [P])

## Tech Stack

- **Frontend**: Vue 3.5, Vite 7.x, TypeScript 5.2+
- **Styling**: Tailwind CSS 4.0, CSS Custom Properties
- **Documentation**: Storybook 8.x
- **Testing**: Vitest, axe-core (accessibility)
- **Project Type**: Web (frontend-focused design system)

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.2

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [x] T001 [P] Write token completeness validation tests in `front/tests/unit/designSystem/tokens/validation.spec.ts`
- [x] T002 [P] Write WCAG contrast validation tests in `front/tests/unit/designSystem/tokens/contrast.spec.ts`

## Phase 3.2: Core Implementation (ONLY after tests are failing)

**Validation Functions**:

- [x] T003 Implement helper functions in `front/src/designSystem/tokens/utils.ts` (getCSSVariable, getContrastRatio)
- [x] T004 Implement validateTokenCompleteness in `front/src/designSystem/tokens/validation.ts` (depends on T003)
- [x] T005 Implement validateContrastRatios in `front/src/designSystem/tokens/validation.ts` (depends on T003)

**Palette Definitions** (can run in parallel after T003):

- [x] T006 [P] Define Creative Energy palette (light + dark) in `front/src/designSystem/styles/tokens.css`
- [x] T007 [P] Define Natural Harmony palette (light + dark) in `front/src/designSystem/styles/tokens.css`
- [x] T008 [P] Define Warm Welcome palette (light + dark) in `front/src/designSystem/styles/tokens.css`
- [x] T009 [P] Define Minimalist palette (light + dark) in `front/src/designSystem/styles/tokens.css`

## Phase 3.3: Storybook Integration

- [x] T010 Configure dual globalTypes (palette + mode) in `front/.storybook/preview.ts`
- [x] T011 Create withTheme decorator in `front/.storybook/preview.ts` (depends on T010)

## Phase 3.4: Documentation & Polish

- [x] T012 [P] Document 2-dimensional palette system in `front/src/designSystem/README.md`
- [x] T013 [P] Create usage guide in `front/src/designSystem/docs/palette-guide.md`
- [x] T014 Add palette switching examples to Button story in `front/src/components/atoms/Button/UiButton.stories.ts` (depends on T010-T011)

## Dependencies

**Sequential Dependencies**:

- T001-T002 (tests) → MUST fail first
- T003 (helpers) → T004, T005 (validation functions use helpers)
- T010 (globalTypes) → T011 (decorator uses globalTypes)
- T010-T011 (Storybook config) → T014 (examples use Storybook controls)

**Parallel Groups**:

- Group 1 [P]: T001, T002 (different test files)
- Group 2 [P]: T006, T007, T008, T009 (same file but different CSS selectors, non-conflicting)
- Group 3 [P]: T012, T013 (different documentation files)

**Blocking Relationships**:

- T003 blocks: T004, T005
- T010 blocks: T011, T014
- T011 blocks: T014

## Parallel Execution Examples

### Group 1: Write Tests (T001-T002)

```bash
# Launch T001 and T002 together:
# Both create different test files
cd front
npm run test:unit -- tokens/validation.spec.ts --watch &
npm run test:unit -- tokens/contrast.spec.ts --watch &
```

### Group 2: Define Palettes (T006-T009)

```bash
# These modify same file (tokens.css) but different sections
# Can be done in parallel by different developers or sequentially
# If parallel: use git merge to combine changes
```

### Group 3: Documentation (T012-T013)

```bash
# Different files, fully parallel
```

## Branch Strategy

**Spec Branch**: `spec/003-palette-switcher` (already created, contains spec + plan + tasks)

**Task Sub-branches**: Each task gets its own branch from spec branch

- Format: `spec/003-palette-switcher/T###-task-name`
- Example: `spec/003-palette-switcher/T001-token-completeness-tests`

**Workflow for Each Task**:

1. Pull latest from spec branch
2. Create task sub-branch
3. Implement task (TDD workflow)
4. Run quality gates (tests, linting)
5. Commit changes
6. **WAIT FOR USER APPROVAL** (MANDATORY)
7. Push and create PR to spec branch
8. Merge PR
9. Move to next task

**Final PR**: After all 14 tasks merged to spec branch

- Create PR: `spec/003-palette-switcher` → `main`
- Closes parent spec issue #88

## GitHub Integration

**Parent Spec Issue**: #88
**Spec Branch**: `spec/003-palette-switcher`
**Task Issues**: Will be created for each task (T001-T014)

## Validation Checklist

- [x] All contracts have corresponding tests (validation contracts → T001-T002)
- [x] All tests come before implementation (T001-T002 before T003-T009)
- [x] Parallel tasks are independent (verified: different files or non-conflicting sections)
- [x] Each task specifies exact file path
- [x] Dependencies correctly identified (T003→T004/T005, T010→T011→T014)

## Notes

- Design tokens defined using CSS custom properties (CSS variables)
- 2-dimensional class system: `.palette-name.mode` (e.g., `.creative-energy.dark`)
- All 10 variations must pass WCAG AA contrast requirements (4.5:1 for text, 3:1 for large text)
- Storybook allows previewing components in all 10 variations via toolbar controls
- Token completeness validated: all 10 variations define identical token names
- Components remain unchanged (universal via semantic tokens)
