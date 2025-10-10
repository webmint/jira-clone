# Component API Model: UiButton

**Feature**: 004-uibutton-component-you
**Component**: `UiButton.vue`
**Location**: `front/src/components/atoms/Button/UiButton.vue`

## Component API Overview

The UiButton component is a reusable, accessible button component that adapts to the design system's 10 palette variations (5 palettes × 2 modes). It supports three visual variants, five sizes, flexible content, and comprehensive interaction states.

---

## Props Interface

### TypeScript Definition

```typescript
interface Props {
  /**
   * Button label text
   * @description Alternative to default slot for simple text-only buttons
   * @optional Can be omitted if using default slot
   */
  label?: string;

  /**
   * Visual style variant
   * @default 'filled'
   * @values 'filled' | 'outline' | 'text'
   */
  variant?: 'filled' | 'outline' | 'text';

  /**
   * Button size
   * @default 'medium'
   * @values 'xs' | 'small' | 'medium' | 'large' | 'xl'
   */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';

  /**
   * Disabled state
   * @default false
   * @description When true, button is not interactive and shows 50% opacity
   */
  disabled?: boolean;

  /**
   * ARIA label for screen readers
   * @optional Use when button has no text content (icon-only buttons)
   */
  ariaLabel?: string;

  /**
   * HTML button type attribute
   * @default 'button'
   * @values 'button' | 'submit' | 'reset'
   */
  type?: 'button' | 'submit' | 'reset';
}
```

### Prop Validation Rules

| Prop        | Type                                             | Required | Default     | Validation              |
| ----------- | ------------------------------------------------ | -------- | ----------- | ----------------------- |
| `label`     | `string`                                         | No       | `undefined` | Any string              |
| `variant`   | `'filled' \| 'outline' \| 'text'`                | No       | `'filled'`  | One of 3 allowed values |
| `size`      | `'xs' \| 'small' \| 'medium' \| 'large' \| 'xl'` | No       | `'medium'`  | One of 5 allowed values |
| `disabled`  | `boolean`                                        | No       | `false`     | Boolean                 |
| `ariaLabel` | `string`                                         | No       | `undefined` | Any string              |
| `type`      | `'button' \| 'submit' \| 'reset'`                | No       | `'button'`  | One of 3 allowed values |

---

## Events (Emits)

### TypeScript Definition

```typescript
const emit = defineEmits<{
  /**
   * Emitted when button is clicked
   * @param event - Native MouseEvent from button click
   */
  click: [event: MouseEvent];
}>();
```

### Event Details

| Event   | Payload      | Description    | When Emitted                                   |
| ------- | ------------ | -------------- | ---------------------------------------------- |
| `click` | `MouseEvent` | Button clicked | User clicks button (not emitted when disabled) |

---

## Slots

### Slot Definitions

| Slot Name    | Description                 | Usage                                              | Fallback                 |
| ------------ | --------------------------- | -------------------------------------------------- | ------------------------ |
| `default`    | Main button content (text)  | `<UiButton>Save</UiButton>`                        | `{{ label }}` prop value |
| `icon-left`  | Icon positioned before text | `<template #icon-left><SaveIcon /></template>`     | Empty                    |
| `icon-right` | Icon positioned after text  | `<template #icon-right><ChevronIcon /></template>` | Empty                    |

### Slot Usage Patterns

```vue
<!-- Text only (via prop) -->
<UiButton label="Save" />

<!-- Text only (via slot) -->
<UiButton>Save Changes</UiButton>

<!-- Icon only -->
<UiButton aria-label="Save">
  <template #icon-left><SaveIcon /></template>
</UiButton>

<!-- Icon + text (left) -->
<UiButton>
  <template #icon-left><SaveIcon /></template>
  Save Changes
</UiButton>

<!-- Icon + text (right) -->
<UiButton>
  Delete
  <template #icon-right><TrashIcon /></template>
</UiButton>

<!-- Both icons -->
<UiButton>
  <template #icon-left><LeftIcon /></template>
  Navigate
  <template #icon-right><RightIcon /></template>
</UiButton>
```

---

## Computed Properties (Internal)

### buttonClasses

**Type**: `ComputedRef<string>`
**Purpose**: Dynamically generate CSS class names based on props
**Dependencies**: `variant`, `size`, `disabled`

**Example Output**:

```javascript
// variant="filled", size="medium", disabled=false
'btn btn-filled btn-medium';

// variant="outline", size="large", disabled=true
'btn btn-outline btn-large';
```

---

## Component States

### Visual States Matrix

| State        | Description          | CSS Class            | User Trigger           |
| ------------ | -------------------- | -------------------- | ---------------------- |
| **Default**  | Normal resting state | `.btn`               | None (initial)         |
| **Hover**    | Mouse over button    | `.btn:hover`         | Mouse enter            |
| **Active**   | Button being pressed | `.btn:active`        | Mouse down             |
| **Focus**    | Keyboard focus       | `.btn:focus-visible` | Tab navigation         |
| **Disabled** | Not interactive      | `.btn:disabled`      | `disabled` prop = true |

### State Transitions

```
Default → Hover → Active → Default
   ↓
Focus → (keyboard interaction) → Default
   ↓
Disabled (no transitions allowed)
```

---

## CSS Custom Properties Used

### Color Tokens

| Usage             | Token                    | Example Value                   |
| ----------------- | ------------------------ | ------------------------------- |
| Filled background | `--color-primary-500`    | #3B82F6 (Corporate Trust)       |
| Filled hover      | `--color-primary-600`    | #2563EB                         |
| Filled active     | `--color-primary-700`    | #1D4ED8                         |
| Filled text       | `--color-text-inverse`   | #FFFFFF (light), #0F172A (dark) |
| Outline border    | `--color-border-default` | #E2E8F0                         |
| Outline text      | `--color-text-primary`   | #0F172A (light), #F8FAFC (dark) |
| Outline hover bg  | `--color-surface-raised` | #F8FAFC                         |
| Text color        | `--color-primary-500`    | #3B82F6                         |
| Text hover bg     | `--color-primary-50`     | #EFF6FF                         |
| Focus outline     | `--color-border-focus`   | Same as primary-500             |
| Disabled opacity  | `0.5`                    | Fixed value (50% from spec)     |

### Spacing Tokens

| Size   | Padding            | Token                       |
| ------ | ------------------ | --------------------------- |
| xs     | `0.25rem 0.5rem`   | `--spacing-1 --spacing-2`   |
| small  | `0.375rem 0.75rem` | `--spacing-1_5 --spacing-3` |
| medium | `0.5rem 1rem`      | `--spacing-2 --spacing-4`   |
| large  | `0.75rem 1.5rem`   | `--spacing-3 --spacing-6`   |
| xl     | `1rem 2rem`        | `--spacing-4 --spacing-8`   |

### Typography Tokens

| Size   | Font Size         | Token              |
| ------ | ----------------- | ------------------ |
| xs     | `0.75rem` (12px)  | `--font-size-xs`   |
| small  | `0.875rem` (14px) | `--font-size-sm`   |
| medium | `1rem` (16px)     | `--font-size-base` |
| large  | `1.125rem` (18px) | `--font-size-lg`   |
| xl     | `1.25rem` (20px)  | `--font-size-xl`   |

### Other Tokens

| Property                   | Token                          | Value                      |
| -------------------------- | ------------------------------ | -------------------------- |
| Font weight                | `--font-weight-medium`         | 500                        |
| Border radius (xs, sm, md) | `--border-radius-sm`           | 0.25rem                    |
| Border radius (md)         | `--border-radius-md`           | 0.375rem                   |
| Border radius (lg, xl)     | `--border-radius-lg`           | 0.5rem                     |
| Transition duration        | `--transition-duration-fast`   | 150ms                      |
| Transition timing          | `--transition-timing-ease-out` | cubic-bezier(0, 0, 0.2, 1) |

---

## Component Variations

### Total Combinations

**Base Variations**: 3 variants × 5 sizes = **15 combinations**

**State Multiplier**: 5 states (default, hover, active, focus, disabled)

**Palette Multiplier**: 10 palette variations (5 palettes × 2 modes)

**Total Testable States**: 15 × 5 × 10 = **750 visual states**

### Variation Matrix

| Variant   | Sizes | States | Palettes | Total   |
| --------- | ----- | ------ | -------- | ------- |
| filled    | 5     | 5      | 10       | 250     |
| outline   | 5     | 5      | 10       | 250     |
| text      | 5     | 5      | 10       | 250     |
| **TOTAL** |       |        |          | **750** |

---

## Accessibility Attributes

### Required ARIA Attributes

| Attribute       | When Used         | Value      | Purpose                          |
| --------------- | ----------------- | ---------- | -------------------------------- |
| `role`          | Always            | `"button"` | Implicit from `<button>` element |
| `aria-label`    | Icon-only buttons | Prop value | Screen reader label              |
| `aria-disabled` | Disabled state    | `"true"`   | Announces disabled state         |
| `tabindex`      | Always            | `0`        | Implicit from `<button>` element |

### Keyboard Interactions

| Key           | Action          | Behavior                   |
| ------------- | --------------- | -------------------------- |
| `Tab`         | Focus           | Moves focus to/from button |
| `Shift + Tab` | Focus (reverse) | Moves focus in reverse     |
| `Enter`       | Activate        | Emits `click` event        |
| `Space`       | Activate        | Emits `click` event        |

### Focus Management

- **Focus indicator**: 2px solid outline using `--color-border-focus`
- **Focus offset**: 2px gap between button and outline
- **Disabled focus**: Disabled buttons cannot receive focus

---

## Component Lifecycle

### Mount

1. Props validated
2. Default values applied
3. Computed classes generated
4. Component rendered

### Update (Reactive)

1. Prop change detected
2. Computed classes regenerated
3. DOM updated (Vue reactivity)

### Unmount

1. Event listeners cleaned up (Vue automatic)
2. No manual cleanup needed (stateless component)

---

## Error Handling

### Invalid Props

TypeScript prevents invalid prop values at compile time. No runtime validation needed.

### Missing Content

If no `label` prop and no default slot provided, button renders empty. Recommend using `ariaLabel` for icon-only buttons.

### Disabled Interaction

Disabled buttons prevent:

- Click events (via `disabled` attribute)
- Focus (via `disabled` attribute)
- Hover effects (via CSS `:disabled` pseudo-class)

---

## Performance Characteristics

### Bundle Size Impact

- Component: ~2-3KB (Vue SFC)
- No external dependencies
- CSS: ~1-2KB (scoped styles)

### Render Performance

- Simple component (no complex logic)
- Computed properties cached
- No watchers or side effects
- Expected render time: <1ms

### Re-render Triggers

Component re-renders when:

- Any prop changes
- Slot content changes
- Parent component re-renders (Vue default behavior)

---

## Component API Contract

```typescript
/**
 * UiButton - Reusable, accessible button component
 *
 * @example
 * <UiButton variant="filled" size="medium" @click="handleClick">
 *   Save Changes
 * </UiButton>
 *
 * @example Icon-only button
 * <UiButton variant="outline" aria-label="Delete">
 *   <template #icon-left><TrashIcon /></template>
 * </UiButton>
 */
declare const UiButton: DefineComponent<
  {
    label?: string;
    variant?: 'filled' | 'outline' | 'text';
    size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
    disabled?: boolean;
    ariaLabel?: string;
    type?: 'button' | 'submit' | 'reset';
  },
  {
    // No exposed methods
  },
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {
    click: (event: MouseEvent) => void;
  },
  string,
  VNodeProps,
  {
    variant: 'filled';
    size: 'medium';
    disabled: false;
    type: 'button';
  },
  {},
  {
    default: (props: {}) => VNode[];
    'icon-left': (props: {}) => VNode[];
    'icon-right': (props: {}) => VNode[];
  }
>;

export default UiButton;
```

---

**Component API Model Complete**
**Status**: Ready for implementation
