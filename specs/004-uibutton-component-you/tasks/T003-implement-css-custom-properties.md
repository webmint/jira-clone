# T003: Implement CSS custom properties styling

**Feature**: 004-uibutton-component-you
**Task ID**: T003
**Type**: Implementation
**Parallel**: No (sequential)
**Agent**: Frontend Agent
**Priority**: P1 (High)
**Estimated Effort**: 2-3 hours

## Description

Replace all hardcoded Tailwind utility classes with CSS custom properties from the design system. This enables automatic adaptation to all 10 palette variations (5 palettes × 2 modes).

## Files to Edit

- `front/src/components/atoms/Button/UiButton.vue` (template and style sections)

## Dependencies

- T002 (Props interface updated)

## Design System Tokens Reference

Located in: `front/src/designSystem/styles/tokens.css`

### Color Tokens by Variant

**Filled Variant**:

- Background: `var(--color-primary-500)`
- Background hover: `var(--color-primary-600)`
- Background active: `var(--color-primary-700)`
- Text: `var(--color-text-inverse)`

**Outline Variant**:

- Background: `transparent`
- Background hover: `var(--color-surface-raised)`
- Border: `1px solid var(--color-border-default)`
- Text: `var(--color-text-primary)`

**Text Variant**:

- Background: `transparent`
- Background hover: `var(--color-primary-50)`
- Text: `var(--color-primary-500)`
- Border: `none`

### Spacing Tokens by Size

| Size   | Padding                               | Font Size               | Border Radius             |
| ------ | ------------------------------------- | ----------------------- | ------------------------- |
| xs     | `var(--spacing-1) var(--spacing-2)`   | `var(--font-size-xs)`   | `var(--border-radius-sm)` |
| small  | `var(--spacing-1_5) var(--spacing-3)` | `var(--font-size-sm)`   | `var(--border-radius-md)` |
| medium | `var(--spacing-2) var(--spacing-4)`   | `var(--font-size-base)` | `var(--border-radius-lg)` |
| large  | `var(--spacing-3) var(--spacing-6)`   | `var(--font-size-lg)`   | `var(--border-radius-lg)` |
| xl     | `var(--spacing-4) var(--spacing-8)`   | `var(--font-size-xl)`   | `var(--border-radius-xl)` |

### State Tokens

- Focus outline: `2px solid var(--color-border-focus)`
- Focus offset: `2px`
- Disabled opacity: `0.5` (50% from specification)
- Transition: `var(--transition-duration-fast) var(--transition-timing-ease-out)`

## Implementation Steps

### Step 1: Remove Tailwind Classes

Remove all hardcoded Tailwind utility classes from template:

- Remove classes like: `bg-blue-600`, `text-white`, `hover:bg-blue-700`, etc.
- Keep only semantic class names: `btn`, `btn-filled`, `btn-medium`, etc.

### Step 2: Add Scoped Styles

Add `<style scoped>` section with CSS custom properties:

```vue
<style scoped>
/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-duration-fast) var(--transition-timing-ease-out);
  cursor: pointer;
  white-space: nowrap;
}

/* Filled variant */
.btn-filled {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: 1px solid transparent;
}

.btn-filled:hover {
  background-color: var(--color-primary-600);
}

.btn-filled:active {
  background-color: var(--color-primary-700);
}

/* Outline variant */
.btn-outline {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.btn-outline:hover {
  background-color: var(--color-surface-raised);
}

/* Text variant */
.btn-text {
  background-color: transparent;
  color: var(--color-primary-500);
  border: none;
}

.btn-text:hover {
  background-color: var(--color-primary-50);
}

/* Size: xs */
.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  border-radius: var(--border-radius-sm);
}

/* Size: small */
.btn-small {
  padding: var(--spacing-1_5) var(--spacing-3);
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-md);
}

/* Size: medium */
.btn-medium {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius-lg);
}

/* Size: large */
.btn-large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
  border-radius: var(--border-radius-lg);
}

/* Size: xl */
.btn-xl {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-xl);
  border-radius: var(--border-radius-xl);
}

/* Focus state */
.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Disabled state */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
```

### Step 3: Update Template Classes

Update template to use semantic classes:

```vue
<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>
```

### Step 4: Verify Palette Adaptation

Test in Storybook that button colors change when palette is switched:

- Corporate Trust (blue)
- Creative Energy (purple)
- Natural Harmony (green)
- Warm Welcome (orange)
- Minimalist (gray)

## Acceptance Criteria

- [ ] All Tailwind utility classes removed from template
- [ ] CSS custom properties used for all colors
- [ ] Filled variant styled (background, hover, active)
- [ ] Outline variant styled (border, hover)
- [ ] Text variant styled (transparent, hover)
- [ ] All 5 sizes styled with correct padding/font-size
- [ ] Hover state implemented (`:hover`)
- [ ] Active state implemented (`:active`)
- [ ] Focus state implemented (`:focus-visible` with 2px outline)
- [ ] Disabled state implemented (50% opacity)
- [ ] Transitions smooth (150ms)
- [ ] Button expands to fit text content (no truncation)
- [ ] Component visually adapts when palette switched
- [ ] All 10 palette variations tested (5 palettes × 2 modes)
- [ ] Styling tests now pass
- [ ] TypeScript/ESLint/Prettier passes

## Manual Testing

Test in Storybook:

1. Switch between variants → styles change correctly
2. Switch between sizes → proportions correct
3. Switch palettes → colors adapt automatically
4. Switch light/dark mode → colors adapt
5. Hover over button → background darkens
6. Tab to button → focus outline visible
7. Disabled button → 50% opacity, no hover effect

## Test Status After Completion

Expected test results:

- ✅ Props tests pass
- ✅ Styling tests START passing
- ✅ State tests (hover, disabled) pass
- ❌ Icon slot tests still fail (slots not added yet - T004)

## Next Task

After completion: T004 (Add icon slot support)

## Notes

- Use `:focus-visible` not `:focus` (better UX)
- Use `pointer-events: none` on disabled buttons
- White-space: nowrap prevents text wrapping
- Transition applies to all properties for smooth palette switching
- CSS custom properties automatically inherit palette context
