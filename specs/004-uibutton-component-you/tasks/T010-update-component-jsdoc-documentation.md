# T010: Update component JSDoc documentation

**Feature**: 004-uibutton-component-you
**Task ID**: T010
**Type**: Documentation
**Parallel**: Yes [P] (with T009)
**Agent**: Documentation Agent
**Priority**: P2 (Medium)
**Estimated Effort**: 45 minutes - 1 hour

## Description

Add comprehensive JSDoc documentation to UiButton component including component description, prop documentation, event documentation, and usage examples. Documentation should support IDE intellisense and Storybook autodocs.

## Files to Edit

- `front/src/components/atoms/Button/UiButton.vue` (add JSDoc comments)

## Dependencies

- T004 (Component implementation complete)
- Can run in parallel with T009

## JSDoc Structure

### Component-Level Documentation

Add to top of `<script setup lang="ts">` section:

````typescript
/**
 * UiButton - Flexible button component with design system integration
 *
 * A versatile button component that automatically adapts to all 10 palette variations
 * (5 palettes × 2 modes). Supports three visual variants, five sizes, and flexible
 * content composition with icon slots.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <UiButton label="Click me" variant="filled" />
 *
 * <!-- With icon -->
 * <UiButton label="Save">
 *   <template #icon-left><SaveIcon /></template>
 * </UiButton>
 *
 * <!-- Icon-only (requires aria-label) -->
 * <UiButton aria-label="Close">
 *   <template #icon-left><CloseIcon /></template>
 * </UiButton>
 * ```
 */
````

### Props Documentation

Document each prop with JSDoc:

```typescript
interface Props {
  /**
   * Button text label
   * @optional Can be omitted if using default slot
   * @example "Save Changes"
   */
  label?: string;

  /**
   * Visual style variant
   * - `filled`: Solid background with primary color (default)
   * - `outline`: Transparent background with border
   * - `text`: No background or border, text only
   * @default 'filled'
   */
  variant?: 'filled' | 'outline' | 'text';

  /**
   * Button size affecting padding, font-size, and border-radius
   * - `xs`: Extra small (compact UIs, table actions)
   * - `small`: Small (dense layouts, toolbars)
   * - `medium`: Medium (default, most common)
   * - `large`: Large (prominent actions)
   * - `xl`: Extra large (hero CTAs, landing pages)
   * @default 'medium'
   */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';

  /**
   * Disabled state
   * When true, button shows 50% opacity and is not interactive
   * @default false
   */
  disabled?: boolean;

  /**
   * ARIA label for screen readers
   * **Required** for icon-only buttons to meet WCAG 2.1 AAA standards
   * @optional Required only when button has no text content
   * @example "Close dialog"
   */
  ariaLabel?: string;

  /**
   * HTML button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
}
```

### Emits Documentation

```typescript
/**
 * Events emitted by UiButton component
 */
const emit = defineEmits<{
  /**
   * Emitted when button is clicked
   * @param event - Native MouseEvent from button click
   * @note Not emitted when button is disabled
   */
  click: [event: MouseEvent];
}>();
```

### Computed Properties Documentation

```typescript
/**
 * Computed CSS classes for button element
 * Combines base class, variant class, and size class
 * @returns Space-separated class string (e.g., "btn btn-filled btn-medium")
 */
const buttonClasses = computed(() => {
  return ['btn', `btn-${props.variant}`, `btn-${props.size}`].join(' ');
});
```

### Method Documentation

```typescript
/**
 * Handles button click events
 * Emits 'click' event with native MouseEvent
 * @param event - Native MouseEvent from button click
 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
```

## Slots Documentation

Add slot documentation in template comments:

```vue
<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <!--
      @slot icon-left - Icon positioned before text
      @example <template #icon-left><SaveIcon /></template>
    -->
    <span v-if="$slots['icon-left']" class="btn-icon-left">
      <slot name="icon-left" />
    </span>

    <!--
      @slot default - Main button content (text)
      Falls back to `label` prop if not provided
    -->
    <span v-if="$slots.default || label" class="btn-content">
      <slot>{{ label }}</slot>
    </span>

    <!--
      @slot icon-right - Icon positioned after text
      @example <template #icon-right><ChevronIcon /></template>
    -->
    <span v-if="$slots['icon-right']" class="btn-icon-right">
      <slot name="icon-right" />
    </span>
  </button>
</template>
```

## Usage Examples

Add comprehensive examples in component-level JSDoc:

````typescript
/**
 * @example Basic Variants
 * ```vue
 * <UiButton label="Primary" variant="filled" />
 * <UiButton label="Secondary" variant="outline" />
 * <UiButton label="Tertiary" variant="text" />
 * ```
 *
 * @example Sizes
 * ```vue
 * <UiButton label="XS" size="xs" />
 * <UiButton label="Small" size="small" />
 * <UiButton label="Medium" size="medium" />
 * <UiButton label="Large" size="large" />
 * <UiButton label="XL" size="xl" />
 * ```
 *
 * @example With Icons
 * ```vue
 * <!-- Icon left -->
 * <UiButton label="Save">
 *   <template #icon-left><SaveIcon :size="20" /></template>
 * </UiButton>
 *
 * <!-- Icon right -->
 * <UiButton label="Next">
 *   <template #icon-right><ChevronRightIcon :size="20" /></template>
 * </UiButton>
 *
 * <!-- Both icons -->
 * <UiButton label="Search Files">
 *   <template #icon-left><SearchIcon :size="20" /></template>
 *   <template #icon-right><ChevronDownIcon :size="20" /></template>
 * </UiButton>
 *
 * <!-- Icon-only (requires aria-label) -->
 * <UiButton aria-label="Delete item">
 *   <template #icon-left><TrashIcon :size="20" /></template>
 * </UiButton>
 * ```
 *
 * @example Form Buttons
 * ```vue
 * <UiButton label="Submit" type="submit" variant="filled" />
 * <UiButton label="Reset" type="reset" variant="outline" />
 * <UiButton label="Cancel" type="button" variant="text" />
 * ```
 *
 * @example Disabled State
 * ```vue
 * <UiButton label="Disabled Button" disabled />
 * ```
 *
 * @example Event Handling
 * ```vue
 * <UiButton
 *   label="Click me"
 *   @click="handleClick"
 * />
 *
 * <script setup>
 * const handleClick = (event: MouseEvent) => {
 *   console.log('Button clicked!', event);
 * };
 * </script>
 * ```
 */
````

## Accessibility Documentation

Add accessibility notes:

```typescript
/**
 * Accessibility Compliance: WCAG 2.1 Level AAA
 *
 * - **Keyboard Navigation**: Tab/Shift+Tab to focus, Enter/Space to activate
 * - **Focus Indicator**: 2px solid outline with 2px offset
 * - **ARIA Labels**: Required for icon-only buttons
 * - **Color Contrast**: 7:1 for normal text, 4.5:1 for large text (AAA)
 * - **Disabled State**: aria-disabled="true" and pointer-events: none
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/ WCAG 2.1 Guidelines}
 */
```

## Acceptance Criteria

- [ ] Component-level JSDoc with description and examples
- [ ] All props documented with type, default, and description
- [ ] Emit events documented with parameters
- [ ] Computed properties documented
- [ ] Methods documented with parameters and return types
- [ ] Slots documented with @slot tags and examples
- [ ] Usage examples provided (6+ examples)
- [ ] Accessibility compliance documented
- [ ] JSDoc follows TypeScript conventions
- [ ] Documentation appears in IDE intellisense
- [ ] Documentation appears in Storybook autodocs
- [ ] TypeScript/ESLint passes

## Manual Testing

Test documentation:

1. Open UiButton.vue in VS Code
2. Hover over `UiButton` import → JSDoc tooltip appears
3. Type `<UiButton` → prop suggestions with descriptions
4. View Storybook autodocs → documentation visible
5. Check all props have descriptions
6. Verify examples are correct and runnable
7. Test in IDE that JSDoc intellisense works

## Test Status After Completion

Expected results:

- ✅ JSDoc visible in IDE (VS Code, WebStorm)
- ✅ Storybook autodocs enhanced
- ✅ Developer experience improved
- ✅ Component fully documented

## Next Task

After completion: T011 (Verify WCAG accessibility compliance)

## Notes

- Use `@component` tag for component identification
- Use `@example` with code fences for syntax highlighting
- Include `@default` for props with default values
- Use `@optional` to clarify optional props
- Document edge cases (e.g., icon-only requiring aria-label)
- Keep examples concise and realistic
- Link to external docs with `@see` when relevant
- JSDoc comments should be above the code they document
- Use markdown formatting within JSDoc (code blocks, lists, etc.)
