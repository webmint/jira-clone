# T001: Write component unit tests (TDD)

**Feature**: 004-uibutton-component-you
**Task ID**: T001
**Type**: Test
**Parallel**: Yes [P]
**Agent**: Testing Agent
**Priority**: P1 (High)
**Estimated Effort**: 1.5-2 hours

## Description

Create comprehensive unit test file for UiButton component following TDD (Test-Driven Development) approach. Tests should be written BEFORE implementation and will initially FAIL (RED phase). Tests will pass once component is refactored (GREEN phase).

## Files to Create

- `front/src/components/atoms/Button/UiButton.spec.ts`

## Dependencies

None (first task - TDD approach)

## Test Coverage Requirements

Write tests covering:

### 1. Props Rendering

- [ ] Label prop renders correctly
- [ ] Variant prop changes button style
- [ ] Size prop changes button size
- [ ] Disabled prop makes button non-interactive
- [ ] AriaLabel prop sets aria-label attribute
- [ ] Type prop sets button type attribute
- [ ] Default values applied (variant='filled', size='medium', type='button')

### 2. Event Emissions

- [ ] Click event emitted when button clicked
- [ ] Click event NOT emitted when button disabled
- [ ] Event payload includes MouseEvent

### 3. Slot Rendering

- [ ] Default slot renders text content
- [ ] Icon-left slot renders before text
- [ ] Icon-right slot renders after text
- [ ] Label prop used as fallback when no default slot
- [ ] Icon-only button (no text) renders correctly

### 4. Computed Classes

- [ ] Correct CSS class for filled variant
- [ ] Correct CSS class for outline variant
- [ ] Correct CSS class for text variant
- [ ] Correct CSS class for each size (xs, small, medium, large, xl)
- [ ] Disabled class applied when disabled=true

### 5. Accessibility Attributes

- [ ] Role="button" implicit from <button> element
- [ ] Aria-label attribute set when ariaLabel prop provided
- [ ] Aria-disabled="true" when disabled=true
- [ ] Button is keyboard accessible (Tab, Enter, Space)

## Test Template Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import UiButton from './UiButton.vue';

describe('UiButton', () => {
  let wrapper: VueWrapper;

  describe('Props', () => {
    it('renders label prop correctly', () => {
      // Test implementation
    });

    it('applies filled variant styling', () => {
      // Test implementation
    });

    // ... more prop tests
  });

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      // Test implementation
    });

    it('does not emit click when disabled', async () => {
      // Test implementation
    });
  });

  describe('Slots', () => {
    it('renders default slot content', () => {
      // Test implementation
    });

    it('renders icon-left slot before text', () => {
      // Test implementation
    });

    // ... more slot tests
  });

  describe('Accessibility', () => {
    it('sets aria-label when provided', () => {
      // Test implementation
    });

    it('is keyboard accessible', async () => {
      // Test implementation
    });

    // ... more accessibility tests
  });
});
```

## Expected Initial Result

All tests should FAIL initially because:

- Props interface not yet updated (still has old variant/size names)
- CSS custom properties not implemented
- Icon slots not added
- This is expected and correct for TDD RED phase

## Acceptance Criteria

- [ ] Test file created at correct location
- [ ] All required test cases written (25+ tests)
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Tests use Vue Test Utils correctly
- [ ] Tests check accessibility attributes
- [ ] Tests verify all props, events, and slots
- [ ] Coverage structure supports 80%+ target
- [ ] Tests initially FAIL (RED phase confirmed)
- [ ] Test code follows ESLint/Prettier standards

## Next Task

After completion: T002 (Refactor component props)

## Notes

- Use `@vue/test-utils` for mounting component
- Use `vitest` for test runner (not Jest)
- Follow AAA pattern: Arrange, Act, Assert
- Keep tests simple and focused (one assertion per test when possible)
- Test behavior, not implementation details
- This is the RED phase of TDD - tests failing is correct!
