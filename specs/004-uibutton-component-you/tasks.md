# Tasks: UI Button Component

**Feature**: 004-uibutton-component-you
**Branch**: `004-uibutton-component-you`
**Input**: Design documents from `specs/004-uibutton-component-you/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Summary

Refactor the existing UiButton component to use design system tokens (CSS custom properties) instead of hardcoded Tailwind classes. Component must support 3 variants (filled, outline, text) × 5 sizes (xs-xl) = 15 variations, adapt to 10 palette variations (5 palettes × 2 modes), meet WCAG 2.1 AAA standards, and include comprehensive Storybook stories.

**Total Tasks**: 12
**Estimated Effort**: 8-12 hours
**Parallelizable**: 6 tasks marked [P]

---

## Task List

### T001: Write component unit tests (TDD) [P]

**Description**: Create comprehensive unit test file for UiButton component following TDD approach.

**Files**:

- **Create**: `front/src/components/atoms/Button/UiButton.spec.ts`

**Dependencies**: None (first task - TDD)

**Agent**: Testing Agent

**Details**:
Write unit tests covering:

1. Props rendering (label, variant, size, disabled, ariaLabel, type)
2. Event emissions (click event, disabled prevents click)
3. Slot rendering (default, icon-left, icon-right)
4. Computed classes (correct CSS classes for each variant/size)
5. Accessibility attributes (aria-label, role, disabled)

Tests should FAIL initially (no implementation yet).

**Acceptance Criteria**:

- [X] Test file created with all test cases
- [X] Tests cover all props
- [X] Tests cover click event
- [X] Tests cover all 3 slots
- [X] Tests verify accessibility attributes
- [X] All tests initially FAIL (RED phase of TDD)
- [X] Test coverage structure ready for 80%+ target

---

### T002: Refactor component props interface

**Description**: Update UiButton props interface to match specification (add xs/xl sizes, change variant names).

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.vue`

**Dependencies**: T001 (tests written first)

**Agent**: Frontend Agent

**Details**:

1. Update Props interface:
   - Change variant type: `'primary' | 'secondary' | 'danger' | 'ghost'` → `'filled' | 'outline' | 'text'`
   - Change size type: `'sm' | 'md' | 'lg'` → `'xs' | 'small' | 'medium' | 'large' | 'xl'`
   - Add `ariaLabel?: string` prop
   - Update default values: `variant: 'filled'`, `size: 'medium'`
2. Update `withDefaults()` to match new interface
3. DO NOT update template or styles yet (next tasks)

**Acceptance Criteria**:

- [ ] Props interface updated with correct types
- [ ] Defaults updated (variant='filled', size='medium')
- [ ] ariaLabel prop added
- [ ] TypeScript compiles without errors
- [ ] Some tests pass (props structure correct)

---

### T003: Implement CSS custom properties styling

**Description**: Replace hardcoded Tailwind utility classes with CSS custom properties from design system tokens.

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.vue` (style section)

**Dependencies**: T002 (props updated)

**Agent**: Frontend Agent

**Details**:

1. Remove existing Tailwind utility classes from template
2. Add `<style scoped>` section with CSS custom properties:
   - Filled variant: `--color-primary-500/600/700`, `--color-text-inverse`
   - Outline variant: `--color-border-default`, `--color-text-primary`, `--color-surface-raised`
   - Text variant: `--color-primary-500/50`
   - Sizes: `--spacing-*`, `--font-size-*`, `--border-radius-*`
   - States: hover (`:hover`), active (`:active`), focus (`:focus-visible`), disabled (`:disabled`)
3. Implement 50% opacity for disabled state
4. Add focus ring: `outline: 2px solid var(--color-border-focus)`
5. Update computed `buttonClasses` to return semantic class names

**Acceptance Criteria**:

- [ ] All Tailwind utility classes removed
- [ ] CSS custom properties used for all colors
- [ ] All 3 variants styled (filled, outline, text)
- [ ] All 5 sizes styled (xs, small, medium, large, xl)
- [ ] Hover, active, focus, disabled states implemented
- [ ] Disabled state shows 50% opacity
- [ ] Focus ring visible (2px solid outline)
- [ ] Component visually adapts to palette changes
- [ ] More tests pass (styling correct)

---

### T004: Add icon slot support

**Description**: Add icon-left and icon-right slots to support flexible button content (text, icons, or both).

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.vue` (template section)

**Dependencies**: T003 (styling complete)

**Agent**: Frontend Agent

**Details**:

1. Update template to include slots:
   ```vue
   <button>
     <slot name="icon-left" />
     <span v-if="$slots.default || label">
       <slot>{{ label }}</slot>
     </span>
     <slot name="icon-right" />
   </button>
   ```
2. Add CSS for icon spacing (gap between icon and text)
3. Ensure icons align vertically with text (`align-items: center`)
4. Handle icon-only buttons (no text)

**Acceptance Criteria**:

- [ ] icon-left slot added and functional
- [ ] icon-right slot added and functional
- [ ] Default slot for text content
- [ ] Icons align vertically with text
- [ ] Icon-only buttons work (no text)
- [ ] Proper spacing between icons and text
- [ ] All slot tests pass

---

### T005: Create Storybook variant stories [P]

**Description**: Create Storybook stories demonstrating all button variants (filled, outline, text).

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.stories.ts`

**Dependencies**: T004 (component complete)

**Agent**: Design Agent

**Details**:

1. Update meta configuration:
   - Title: `'Atoms/UiButton'`
   - Component: `UiButton`
   - Tags: `['autodocs']`
   - ArgTypes for variant, size, disabled
2. Create variant stories:
   - `Filled`: variant='filled'
   - `Outline`: variant='outline'
   - `Text`: variant='text'
3. Each story should show default size (medium)
4. Use CSF3 format with TypeScript

**Acceptance Criteria**:

- [ ] Meta configuration updated
- [ ] Filled story created
- [ ] Outline story created
- [ ] Text story created
- [ ] Stories render correctly in Storybook
- [ ] All variants visible and functional

---

### T006: Create Storybook size stories [P]

**Description**: Create Storybook stories demonstrating all button sizes (xs, small, medium, large, xl).

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.stories.ts`

**Dependencies**: T004 (component complete)

**Agent**: Design Agent

**Details**:

1. Create size stories:
   - `ExtraSmall`: size='xs'
   - `Small`: size='small'
   - `Medium`: size='medium'
   - `Large`: size='large'
   - `ExtraLarge`: size='xl'
2. Each story should use filled variant (default)
3. Show proportional scaling of padding and font size

**Acceptance Criteria**:

- [ ] xs size story created
- [ ] small size story created
- [ ] medium size story created
- [ ] large size story created
- [ ] xl size story created
- [ ] All sizes render with correct proportions
- [ ] Visual progression from xs to xl is clear

---

### T007: Create Storybook state stories [P]

**Description**: Create Storybook stories demonstrating button states (disabled, hover, active, focus).

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.stories.ts`

**Dependencies**: T004 (component complete)

**Agent**: Design Agent

**Details**:

1. Create state stories:
   - `Disabled`: disabled=true (shows 50% opacity)
   - `WithIcon`: Shows icon + text combination
   - `IconOnly`: Icon-only button with ariaLabel
2. Document hover/active/focus states in story descriptions
3. Add notes explaining each state

**Acceptance Criteria**:

- [ ] Disabled story created
- [ ] Icon + text story created
- [ ] Icon-only story created
- [ ] Disabled state shows 50% opacity
- [ ] Icon stories demonstrate slot usage
- [ ] State documentation clear

---

### T008: Create palette demonstration story [P]

**Description**: Create comprehensive story demonstrating palette switching with all button variants.

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.stories.ts`

**Dependencies**: T004 (component complete)

**Agent**: Design Agent

**Details**:

1. Create `PaletteSwitching` story with custom render function
2. Display all 3 variants (filled, outline, text) in one view
3. Include instructions to use Storybook toolbar for palette switching
4. Show that colors adapt automatically to palette changes
5. Add descriptive text explaining 10 palette variations (5 palettes × 2 modes)

**Acceptance Criteria**:

- [ ] PaletteSwitching story created
- [ ] All 3 variants shown together
- [ ] Instructions for palette switching included
- [ ] Story demonstrates automatic color adaptation
- [ ] Clear explanation of palette system
- [ ] Story works with all 10 palette variations

---

### T009: Add interaction tests to stories

**Description**: Add interaction tests to Storybook stories using @storybook/test for click and keyboard navigation.

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.stories.ts`

**Dependencies**: T005, T006, T007, T008 (stories created)

**Agent**: Testing Agent

**Details**:

1. Import testing utilities: `import { within, userEvent, expect, fn } from '@storybook/test'`
2. Create `ClickInteraction` story:
   - Use `play` function to simulate click
   - Verify click event emitted
3. Create `KeyboardNavigation` story:
   - Use `play` function to Tab to button
   - Verify focus
   - Press Enter/Space
   - Verify click event
4. Add `onClick: fn()` to args for event tracking

**Acceptance Criteria**:

- [ ] ClickInteraction story created
- [ ] KeyboardNavigation story created
- [ ] Click test verifies event emission
- [ ] Keyboard test verifies Tab focus
- [ ] Keyboard test verifies Enter activation
- [ ] Keyboard test verifies Space activation
- [ ] All interaction tests pass in Storybook

---

### T010: Update component JSDoc documentation [P]

**Description**: Add comprehensive JSDoc comments to component for developer documentation.

**Files**:

- **Edit**: `front/src/components/atoms/Button/UiButton.vue`

**Dependencies**: T004 (component implementation complete)

**Agent**: Documentation Writer Agent

**Details**:

1. Add JSDoc comments to:
   - Component file header (description, usage examples)
   - Each prop (description, default, values)
   - Each emit event (description, payload)
   - Each slot (description, usage example)
2. Include usage examples for:
   - Text-only button
   - Icon-only button
   - Icon + text button
3. Document accessibility requirements (ariaLabel for icon-only)

**Acceptance Criteria**:

- [ ] Component file header documented
- [ ] All props documented with JSDoc
- [ ] Emits documented
- [ ] Slots documented with examples
- [ ] Usage examples provided
- [ ] Accessibility notes included
- [ ] Documentation renders correctly in IDE tooltips

---

### T011: Verify WCAG 2.1 AAA accessibility compliance [P]

**Description**: Verify button component meets WCAG 2.1 Level AAA accessibility standards using Storybook a11y addon.

**Files**: N/A (validation task)

**Dependencies**: T004, T005, T006, T007, T008 (component and stories complete)

**Agent**: Testing Agent

**Details**:

1. Run Storybook and open Accessibility panel
2. Check each story for violations (should be 0)
3. Verify color contrast:
   - Normal text: ≥ 7:1 (AAA standard)
   - Large text (18px+): ≥ 4.5:1 (AAA standard)
4. Test keyboard navigation:
   - Tab to button
   - Enter activates
   - Space activates
   - Disabled buttons cannot be focused
5. Test in all 10 palette variations
6. Verify focus indicators visible (2px outline)
7. Verify ARIA attributes present (aria-label for icon-only)

**Acceptance Criteria**:

- [ ] 0 accessibility violations in Storybook a11y addon
- [ ] Contrast ratio ≥ 7:1 for normal text (all palettes)
- [ ] Contrast ratio ≥ 4.5:1 for large text (all palettes)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus indicators visible
- [ ] Disabled buttons not focusable
- [ ] Icon-only buttons have aria-label
- [ ] Compliance verified in all 10 palette variations

---

### T012: Run full test suite and verify coverage

**Description**: Run complete test suite, verify 80%+ coverage, and ensure all tests pass.

**Files**: N/A (validation task)

**Dependencies**: T001, T002, T003, T004, T009 (all tests written and component complete)

**Agent**: Testing Agent

**Details**:

1. Run unit tests: `npm run test` in `front/` directory
2. Verify all tests pass
3. Check coverage report: Must be ≥ 80% for UiButton.vue
4. Run Storybook tests: `npm run test-storybook`
5. Verify interaction tests pass
6. Run linting: `npm run lint`
7. Fix any linting errors
8. Generate coverage badge/report

**Acceptance Criteria**:

- [ ] All unit tests pass (UiButton.spec.ts)
- [ ] Test coverage ≥ 80% for UiButton.vue
- [ ] All Storybook interaction tests pass
- [ ] 0 ESLint errors
- [ ] 0 TypeScript compilation errors
- [ ] Coverage report generated
- [ ] All quality gates passed

---

## Dependency Graph

```
T001 (Write tests) [P] ─────────────────────────┐
                                                  ↓
T002 (Refactor props) ───────────────────────→ T004 (Add icon slots) ────┐
         ↓                                                                  ↓
T003 (CSS custom properties) ───────────────→ (Component Complete) ───→ T012 (Final validation)
                                                  ↓                         ↑
                        ┌────────────────────────┴──────────────────┐     │
                        ↓                        ↓                   ↓     │
                T005 (Variant stories) [P]  T006 (Size stories) [P]  T007 (State stories) [P]
                        ↓                        ↓                   ↓     │
                        └────────────────────────┴──────────────────┘     │
                                                  ↓                         │
                                    T008 (Palette demo) [P] ──────────────│
                                                  ↓                         │
                                    T009 (Interaction tests) ──────────────│
                                                  ↓                         │
                                    T010 (JSDoc) [P] ──────────────────────│
                                                  ↓                         │
                                    T011 (Accessibility) [P] ───────────────┘
```

---

## Parallel Execution Examples

### Phase 1: Testing Foundation (TDD)

```bash
# Run in parallel (independent file)
Task agent T001  # Write component tests
```

### Phase 2: Component Implementation (Sequential)

```bash
# Sequential (same file, dependent changes)
Task agent T002  # Update props
Task agent T003  # Update styling
Task agent T004  # Add icon slots
```

### Phase 3: Storybook Stories (Parallel)

```bash
# Run in parallel (independent stories, same file but different exports)
Task agent T005 &  # Variant stories
Task agent T006 &  # Size stories
Task agent T007 &  # State stories
Task agent T008 &  # Palette demo
wait
```

### Phase 4: Testing & Documentation (Parallel)

```bash
# Run in parallel (independent tasks)
Task agent T009 &  # Interaction tests
Task agent T010 &  # JSDoc
Task agent T011 &  # Accessibility verification
wait
```

### Phase 5: Final Validation (Sequential)

```bash
# Sequential (validates everything)
Task agent T012  # Final test suite and coverage
```

---

## Task Completion Checklist

### Setup

- [ ] All design documents reviewed
- [ ] Existing UiButton component located
- [ ] Development environment ready

### Implementation (Sequential)

- [ ] T001: Tests written ✓
- [ ] T002: Props refactored ✓
- [ ] T003: CSS custom properties implemented ✓
- [ ] T004: Icon slots added ✓

### Stories (Parallel)

- [ ] T005: Variant stories ✓
- [ ] T006: Size stories ✓
- [ ] T007: State stories ✓
- [ ] T008: Palette demo ✓

### Quality & Documentation (Parallel)

- [ ] T009: Interaction tests ✓
- [ ] T010: JSDoc complete ✓
- [ ] T011: Accessibility verified ✓

### Final Validation

- [ ] T012: All tests pass, 80%+ coverage ✓

---

## Success Criteria

Component is complete when:

1. ✅ All 12 tasks completed
2. ✅ All unit tests pass
3. ✅ Test coverage ≥ 80%
4. ✅ All Storybook stories render correctly
5. ✅ 0 accessibility violations (WCAG 2.1 AAA)
6. ✅ Component adapts to all 10 palette variations
7. ✅ 0 ESLint errors, 0 TypeScript errors
8. ✅ JSDoc documentation complete
9. ✅ All interaction tests pass
10. ✅ Manual testing checklist (quickstart.md) completed

---

## Agent Assignment Summary

| Agent                | Tasks                  | Effort    |
| -------------------- | ---------------------- | --------- |
| Testing Agent        | T001, T009, T011, T012 | 4-5 hours |
| Frontend Agent       | T002, T003, T004       | 3-4 hours |
| Design Agent         | T005, T006, T007, T008 | 2-3 hours |
| Documentation Writer | T010                   | 1 hour    |

**Total Estimated Effort**: 10-13 hours

---

## Notes

- **Breaking Changes**: Variant names change (`primary`→`filled`, `secondary`→`outline`, `ghost`→`text`). Consumers must update usage.
- **Migration**: Any existing usages of UiButton in the app will need to be updated to use new variant names.
- **Palette Switching**: Component automatically adapts to palette changes via CSS custom properties. No JavaScript needed.
- **Accessibility**: WCAG 2.1 Level AAA is stricter than project standard (AA). Extra attention needed for contrast ratios (7:1 vs 4.5:1).
- **Testing**: TDD approach means tests written before implementation. Some tests will fail initially (RED phase).

---

**Tasks generated**: 2025-10-08
**Ready for implementation**: ✅
**Next step**: Create individual task files in tasks/ folder, then create GitHub issues
