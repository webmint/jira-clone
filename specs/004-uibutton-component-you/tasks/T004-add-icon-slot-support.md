# T004: Add icon slot support

**Feature**: 004-uibutton-component-you
**Task ID**: T004
**Type**: Implementation
**Parallel**: No (sequential)
**Agent**: Frontend Agent
**Priority**: P1 (High)
**Estimated Effort**: 1-1.5 hours

## Description

Add Vue slot support for icon-left and icon-right slots to enable flexible icon positioning. Update template to render slots with proper spacing between icons and text.

## Files to Edit

- `front/src/components/atoms/Button/UiButton.vue` (template section only)

## Dependencies

- T003 (CSS custom properties implemented)

## Implementation Requirements

### Slot Structure

The button should support three slots:

1. **icon-left**: Icon positioned before text
2. **default**: Main button text content (fallback to label prop)
3. **icon-right**: Icon positioned after text

### Template Structure

```vue
<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span v-if="$slots['icon-left']" class="btn-icon-left">
      <slot name="icon-left" />
    </span>
    <span v-if="$slots.default || label" class="btn-content">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="$slots['icon-right']" class="btn-icon-right">
      <slot name="icon-right" />
    </span>
  </button>
</template>
```

### Spacing Styles

Add these styles to `<style scoped>` section:

```css
/* Icon spacing */
.btn-icon-left {
  display: inline-flex;
  margin-right: var(--spacing-2);
}

.btn-icon-right {
  display: inline-flex;
  margin-left: var(--spacing-2);
}

.btn-content {
  display: inline-flex;
  align-items: center;
}

/* Icon-only button (no text) */
.btn:has(.btn-icon-left):not(:has(.btn-content)),
.btn:has(.btn-icon-right):not(:has(.btn-content)) {
  padding: var(--spacing-2);
}
```

## Slot Usage Examples

### Text + Left Icon

```vue
<UiButton label="Save">
  <template #icon-left>
    <SaveIcon />
  </template>
</UiButton>
```

### Text + Right Icon

```vue
<UiButton label="Next">
  <template #icon-right>
    <ChevronRightIcon />
  </template>
</UiButton>
```

### Text + Both Icons

```vue
<UiButton>
  <template #icon-left>
    <SearchIcon />
  </template>
  Search Files
  <template #icon-right>
    <ChevronDownIcon />
  </template>
</UiButton>
```

### Icon-Only Button

```vue
<UiButton aria-label="Close">
  <template #icon-left>
    <CloseIcon />
  </template>
</UiButton>
```

## Accessibility Requirements

### Icon-Only Buttons MUST Have aria-label

When button has no text content (icon-only), `ariaLabel` prop is **required**:

```vue
<!-- ✅ CORRECT: aria-label provided -->
<UiButton aria-label="Delete item">
  <template #icon-left><TrashIcon /></template>
</UiButton>

<!-- ❌ INCORRECT: No aria-label for icon-only button -->
<UiButton>
  <template #icon-left><TrashIcon /></template>
</UiButton>
```

### Icon Sizing

Icons should be sized appropriately for button size:

- xs/small: 16px icons
- medium: 20px icons
- large/xl: 24px icons

(This is handled by parent passing appropriately sized icons)

## Acceptance Criteria

- [ ] icon-left slot renders before text
- [ ] icon-right slot renders after text
- [ ] default slot renders between icons
- [ ] label prop used as fallback when no default slot
- [ ] Icon spacing correct (8px / var(--spacing-2))
- [ ] Icon-only buttons have square padding
- [ ] Icon-only button requires aria-label (enforced by tests)
- [ ] Multiple icons can coexist (left + right)
- [ ] Slots work with all variants (filled, outline, text)
- [ ] Slots work with all sizes (xs through xl)
- [ ] Icon slot tests START passing
- [ ] TypeScript/ESLint/Prettier passes

## Manual Testing

Test in Storybook:

1. Render button with icon-left → icon appears before text
2. Render button with icon-right → icon appears after text
3. Render button with both icons → spacing correct
4. Render icon-only button → no extra spacing
5. Tab to icon-only button → focus visible, accessible
6. Hover icon button → hover state works
7. Switch palettes → icons visible in all palettes

## Test Status After Completion

Expected test results:

- ✅ Props tests pass
- ✅ Styling tests pass
- ✅ Icon slot tests START passing
- ✅ Accessibility tests pass (with aria-label)

## Next Task

After completion: T005 (Create Storybook variant stories)

## Notes

- Use `v-if="$slots['icon-left']"` syntax (bracket notation for hyphenated names)
- Don't hardcode icon sizes - let parent control via icon component size prop
- Icon alignment uses `inline-flex` for vertical centering
- `:has()` selector used for icon-only detection (modern CSS)
- ariaLabel enforcement happens in tests, not component validation
