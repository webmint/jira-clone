# T002: Refactor component props interface

**Feature**: 004-uibutton-component-you
**Task ID**: T002
**Type**: Implementation
**Parallel**: No (sequential)
**Agent**: Frontend Agent
**Priority**: P1 (High)
**Estimated Effort**: 30-45 minutes

## Description

Update UiButton component props interface to match specification requirements. Changes include adding xs/xl sizes, renaming variants to semantic names (filled/outline/text), and adding ariaLabel prop.

## Files to Edit

- `front/src/components/atoms/Button/UiButton.vue`

## Dependencies

- T001 (Tests written first - TDD approach)

## Changes Required

### 1. Update Props Interface

**Current (Old)**:

```typescript
interface Props {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}
```

**New (Required)**:

```typescript
interface Props {
  label?: string;
  variant?: 'filled' | 'outline' | 'text';
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

### 2. Update withDefaults

```typescript
const props = withDefaults(defineProps<Props>(), {
  variant: 'filled', // Changed from 'primary'
  size: 'medium', // Changed from 'md'
  disabled: false,
  type: 'button',
});
```

### 3. Remove Unused Props

- Remove `loading` prop (not in specification)
- Remove `danger` variant (not in specification)

### 4. Update Computed Classes

Update `buttonClasses` computed property to use new variant/size names:

```typescript
const buttonClasses = computed(() => {
  return [
    'btn',
    `btn-${props.variant}`, // filled, outline, text
    `btn-${props.size}`, // xs, small, medium, large, xl
  ].join(' ');
});
```

## Breaking Changes

This task introduces breaking changes:

- `variant="primary"` → `variant="filled"`
- `variant="secondary"` → `variant="outline"`
- `variant="ghost"` → `variant="text"`
- `variant="danger"` → removed (not in spec)
- `size="sm"` → `size="small"`
- `size="md"` → `size="medium"`
- `size="lg"` → `size="large"`
- Added: `size="xs"` and `size="xl"`

## Acceptance Criteria

- [ ] Props interface updated with correct types
- [ ] Variant options: 'filled' | 'outline' | 'text'
- [ ] Size options: 'xs' | 'small' | 'medium' | 'large' | 'xl'
- [ ] ariaLabel prop added
- [ ] type prop added with default 'button'
- [ ] label prop is optional (can use slot instead)
- [ ] withDefaults updated (variant='filled', size='medium')
- [ ] Computed buttonClasses uses new names
- [ ] Loading prop and danger variant removed
- [ ] TypeScript compiles without errors
- [ ] Some unit tests now pass (props structure correct)
- [ ] ESLint/Prettier passes

## Test Status After Completion

Expected test results:

- ✅ Props tests should START passing
- ❌ Styling tests still fail (CSS not updated yet - T003)
- ❌ Slot tests still fail (icon slots not added yet - T004)

## Next Task

After completion: T003 (Implement CSS custom properties)

## Notes

- DO NOT update template or styles yet (separate tasks)
- Focus only on TypeScript interface changes
- This makes tests start passing (GREEN phase begins)
- Breaking changes are expected and documented
