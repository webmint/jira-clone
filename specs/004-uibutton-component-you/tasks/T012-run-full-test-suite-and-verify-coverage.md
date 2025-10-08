# T012: Run full test suite and verify coverage

**Feature**: 004-uibutton-component-you
**Task ID**: T012
**Type**: Test (Verification)
**Parallel**: No (sequential - final task)
**Agent**: Testing Agent
**Priority**: P1 (High)
**Estimated Effort**: 1-1.5 hours

## Description

Run complete test suite (unit tests, interaction tests, TypeScript compilation, linting) and verify code coverage meets 80%+ target. Document test results and create final verification report.

## Files to Test

- `front/src/components/atoms/Button/UiButton.vue`
- `front/src/components/atoms/Button/UiButton.spec.ts`
- `front/src/components/atoms/Button/UiButton.stories.ts`

## Dependencies

- T011 (Accessibility verified)
- ALL previous tasks (T001-T011)

## Test Suite Commands

### 1. Run Unit Tests

```bash
# Run Vitest unit tests
npm test -- UiButton.spec.ts

# Run with coverage
npm test -- UiButton.spec.ts --coverage
```

**Expected Output**:

```
✓ UiButton.spec.ts (25 tests)
  Props
    ✓ renders label prop correctly
    ✓ applies filled variant styling
    ✓ applies outline variant styling
    ✓ applies text variant styling
    ✓ applies xs size styling
    ✓ applies small size styling
    ✓ applies medium size styling (default)
    ✓ applies large size styling
    ✓ applies xl size styling
    ✓ applies disabled state
    ✓ sets aria-label attribute
    ✓ sets type attribute
  Events
    ✓ emits click event when clicked
    ✓ does not emit click when disabled
  Slots
    ✓ renders default slot content
    ✓ renders icon-left slot
    ✓ renders icon-right slot
    ✓ renders both icon slots
    ✓ falls back to label prop when no slot
  Computed Classes
    ✓ generates correct class string
  Accessibility
    ✓ has button role (implicit)
    ✓ is keyboard accessible (Tab)
    ✓ is keyboard accessible (Enter)
    ✓ is keyboard accessible (Space)
    ✓ icon-only button requires aria-label

Test Files  1 passed (1)
     Tests  25 passed (25)
```

### 2. Run TypeScript Compilation

```bash
# Check TypeScript types
npm run type-check

# Or
npx tsc --noEmit
```

**Expected Output**:

```
No TypeScript errors found.
```

### 3. Run ESLint

```bash
# Lint component files
npm run lint

# Or specific file
npx eslint front/src/components/atoms/Button/
```

**Expected Output**:

```
✔ No ESLint errors found.
```

### 4. Run Prettier

```bash
# Check formatting
npm run format:check

# Or auto-fix
npm run format
```

**Expected Output**:

```
All files formatted correctly.
```

### 5. Build Storybook

```bash
# Build Storybook (production)
npm run build-storybook

# Run Storybook (development)
npm run storybook
```

**Expected Output**:

```
info => Storybook build successful
info => Output directory: storybook-static
```

### 6. Run Storybook Interaction Tests

```bash
# Run interaction tests (if configured)
npm run test-storybook
```

**Expected Output**:

```
✓ Atoms/Button/ClickInteraction
✓ Atoms/Button/DisabledInteraction
✓ Atoms/Button/KeyboardNavigation
✓ Atoms/Button/AccessibilityAttributes
✓ Atoms/Button/CSSClassesValidation
✓ Atoms/Button/HoverStateTest

6 passed
```

## Coverage Requirements

### Target Coverage: 80%+

```
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
UiButton.vue        |   100   |    100   |   100   |   100   |
```

### Coverage Metrics

- **Statements**: 100% (all code lines executed)
- **Branches**: 100% (all if/else paths tested)
- **Functions**: 100% (all functions called)
- **Lines**: 100% (all lines covered)

### Generate Coverage Report

```bash
# Generate HTML coverage report
npm test -- UiButton.spec.ts --coverage --coverage.reporter=html

# Open coverage report
open coverage/index.html
```

## Verification Checklist

### Unit Tests

- [ ] All 25+ unit tests pass
- [ ] Props tests pass
- [ ] Event emission tests pass
- [ ] Slot rendering tests pass
- [ ] Computed class tests pass
- [ ] Accessibility tests pass
- [ ] No test failures or warnings

### Integration Tests

- [ ] Storybook interaction tests pass (6 tests)
- [ ] Click interaction works
- [ ] Disabled state prevents interaction
- [ ] Keyboard navigation works
- [ ] ARIA attributes correct
- [ ] CSS classes applied correctly

### Type Safety

- [ ] TypeScript compilation successful
- [ ] No type errors
- [ ] Contract types exported correctly
- [ ] Props interface correct

### Code Quality

- [ ] ESLint passes (0 errors, 0 warnings)
- [ ] Prettier formatting correct
- [ ] No console errors in Storybook
- [ ] No console warnings in Storybook

### Coverage

- [ ] Statements coverage ≥ 80%
- [ ] Branch coverage ≥ 80%
- [ ] Function coverage ≥ 80%
- [ ] Line coverage ≥ 80%
- [ ] HTML coverage report generated

### Build Verification

- [ ] Storybook builds successfully
- [ ] No build errors
- [ ] No build warnings
- [ ] All stories visible in Storybook

### Manual Testing

- [ ] All variants render correctly
- [ ] All sizes render correctly
- [ ] All 10 palettes tested
- [ ] Hover states work
- [ ] Focus states work
- [ ] Disabled state works
- [ ] Icon slots work

## Test Failure Remediation

### If Unit Tests Fail

1. **Identify failing test**:

   ```bash
   npm test -- UiButton.spec.ts --reporter=verbose
   ```

2. **Fix implementation** in UiButton.vue

3. **Re-run tests**:

   ```bash
   npm test -- UiButton.spec.ts
   ```

4. **Repeat until all pass**

### If Coverage Below 80%

1. **View coverage report**:

   ```bash
   npm test -- UiButton.spec.ts --coverage
   open coverage/index.html
   ```

2. **Identify uncovered lines** (red highlights)

3. **Add missing tests** in UiButton.spec.ts

4. **Re-run coverage**

### If TypeScript Errors

1. **View detailed errors**:

   ```bash
   npx tsc --noEmit --pretty
   ```

2. **Fix type issues** in component or contract

3. **Re-run type check**

### If Linting Errors

1. **View errors**:

   ```bash
   npx eslint front/src/components/atoms/Button/ --format=codeframe
   ```

2. **Auto-fix if possible**:

   ```bash
   npx eslint front/src/components/atoms/Button/ --fix
   ```

3. **Manually fix remaining issues**

## Final Verification Report

Create a summary report:

```markdown
# UiButton Component - Test Verification Report

**Date**: [DATE]
**Feature**: 004-uibutton-component-you
**Component**: UiButton.vue

## Test Results Summary

### Unit Tests

- Total Tests: 25
- Passed: 25
- Failed: 0
- Status: ✅ PASS

### Integration Tests (Storybook)

- Total Tests: 6
- Passed: 6
- Failed: 0
- Status: ✅ PASS

### Code Coverage

- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%
- Status: ✅ PASS (exceeds 80% target)

### Type Safety

- TypeScript Compilation: ✅ PASS
- Type Errors: 0
- Status: ✅ PASS

### Code Quality

- ESLint: ✅ PASS (0 errors, 0 warnings)
- Prettier: ✅ PASS
- Status: ✅ PASS

### Accessibility (WCAG 2.1 AAA)

- axe Violations: 0
- Contrast Ratios: All ≥ 7:1
- Keyboard Navigation: ✅ PASS
- Screen Reader: ✅ PASS
- Status: ✅ PASS

### Manual Testing

- All Variants: ✅ PASS
- All Sizes: ✅ PASS
- All 10 Palettes: ✅ PASS
- Interactive States: ✅ PASS
- Status: ✅ PASS

## Overall Status

**🎉 ALL TESTS PASSED - READY FOR PRODUCTION**

## Feature Requirements Verification

| Requirement                                  | Status           |
| -------------------------------------------- | ---------------- |
| Three button types (filled, outline, text)   | ✅ Implemented   |
| Palette switcher integration (10 variations) | ✅ Verified      |
| Size variability (5 sizes)                   | ✅ Implemented   |
| Icon support (left, right, both)             | ✅ Implemented   |
| Storybook documentation                      | ✅ Complete      |
| WCAG 2.1 AAA compliance                      | ✅ Verified      |
| Test coverage ≥ 80%                          | ✅ 100% coverage |

## Recommendations

- ✅ Component ready for merge to main branch
- ✅ Documentation complete
- ✅ No known issues
- Consider adding visual regression tests (Chromatic) in future
```

## Acceptance Criteria

- [ ] All unit tests pass (25+ tests)
- [ ] All interaction tests pass (6 tests)
- [ ] Code coverage ≥ 80% (target: 100%)
- [ ] TypeScript compilation successful
- [ ] ESLint passes (0 errors)
- [ ] Prettier formatting correct
- [ ] Storybook builds successfully
- [ ] All stories render correctly
- [ ] All 10 palettes tested manually
- [ ] Accessibility verified (WCAG 2.1 AAA)
- [ ] Test verification report created
- [ ] All feature requirements met

## Test Status After Completion

Expected results:

- ✅ Complete test suite passing
- ✅ 100% code coverage achieved
- ✅ All quality checks passing
- ✅ Feature ready for production
- ✅ Documentation complete

## Next Task

**FINAL TASK** - After completion:

- Commit all changes to feature branch
- Create pull request for code review
- Update feature status to "Complete"
- Celebrate! 🎉

## Notes

- This is the FINAL verification task
- All previous tasks must be complete
- Run tests in CI/CD environment if available
- Document any edge cases discovered
- Consider adding visual regression tests later (Chromatic, Percy)
- Keep test suite running in watch mode during development
- Coverage reports should be reviewed regularly
- Use `--bail` flag to stop on first failure for faster debugging
- Consider adding performance benchmarks in future iterations
