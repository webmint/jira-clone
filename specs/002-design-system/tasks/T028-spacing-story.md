# Task T028: Create Spacing.stories.mdx with Spacing Scale Visualization

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T020, T021, T022

## Description

Create Storybook documentation for the spacing system showcasing the base-8 scale with visual representations and usage examples for padding, margin, and gap properties.

## Files to Create/Modify

- `src/design-system/Spacing.stories.mdx` - Spacing documentation

## Dependencies

**Blocks**: None (documentation task)
**Blocked By**: T020-T022 (CSS theme definitions with spacing tokens must exist)

## Acceptance Criteria

- [ ] Full spacing scale visualized (0-24)
- [ ] Semantic spacing tokens displayed (XS-XL)
- [ ] Visual size comparison for each spacing value
- [ ] Usage examples for padding, margin, gap
- [ ] Rem unit conversion table (to px)
- [ ] Base-8 system explanation
- [ ] ESLint: 0 errors
- [ ] Storybook renders spacing scale correctly

## Implementation Notes

**Spacing Story** (`src/design-system/Spacing.stories.mdx`):

````mdx
import { Meta } from '@storybook/blocks';

<Meta title="Design System/Spacing" />

# Spacing System

Our spacing system uses a **base-8 scale** with rem units for consistency and accessibility. All spacing values are multiples of 0.25rem (4px at default font size).

## Base-8 Scale

Base-8 provides:

- Mathematical harmony (powers of 2)
- Easy mental math (4px increments)
- Sufficient granularity for most UI needs
- Industry standard (iOS, Android, Material Design)

## Spacing Scale

<div style="display: grid; gap: 1rem;">
  {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((size) => (
    <div key={size} style="display: flex; align-items: center; gap: 1rem;">
      <div style="width: 5rem; font-weight: 500;">spacing-{size}</div>
      <div
        style={`width: ${size * 0.25}rem; height: 2rem; background: var(--color-primary-500);`}
      ></div>
      <div style="color: var(--color-text-secondary);">
        {size * 0.25}rem ({size * 4}px)
      </div>
    </div>
  ))}
</div>

## Semantic Spacing Tokens

Layer 2 semantic tokens provide named spacing values for common use cases:

<div style="display: grid; gap: 1rem; margin-top: 2rem;">
  {[
    { name: 'XS', value: 2, usage: 'Tight spacing, icon gaps' },
    { name: 'SM', value: 4, usage: 'Small padding, compact layouts' },
    { name: 'MD', value: 6, usage: 'Default spacing, card padding' },
    { name: 'LG', value: 8, usage: 'Section spacing, generous padding' },
    { name: 'XL', value: 12, usage: 'Large gaps, page margins' },
  ].map(({ name, value, usage }) => (
    <div
      key={name}
      style="border: 1px solid var(--color-border); border-radius: var(--radius-base); padding: var(--spacing-md);"
    >
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
        <div style="font-weight: 600;">spacing-{name.toLowerCase()}</div>
        <div
          style={`width: ${value * 0.25}rem; height: 1.5rem; background: var(--color-primary-500); border-radius: var(--radius-sm);`}
        ></div>
        <div style="color: var(--color-text-secondary);">
          {value * 0.25}rem ({value * 4}px)
        </div>
      </div>
      <div style="font-size: var(--text-sm); color: var(--color-text-tertiary);">{usage}</div>
    </div>
  ))}
</div>

## Spacing Reference Table

| Token        | Semantic     | Value   | px (16px base) | Common Usage                  |
| ------------ | ------------ | ------- | -------------- | ----------------------------- |
| `spacing-0`  | -            | 0px     | 0px            | Reset spacing                 |
| `spacing-1`  | -            | 0.25rem | 4px            | Micro spacing, borders        |
| `spacing-2`  | `spacing-xs` | 0.5rem  | 8px            | Icon gaps, tight layouts      |
| `spacing-3`  | -            | 0.75rem | 12px           | Small gaps                    |
| `spacing-4`  | `spacing-sm` | 1rem    | 16px           | Button padding, input spacing |
| `spacing-5`  | -            | 1.25rem | 20px           | Medium gaps                   |
| `spacing-6`  | `spacing-md` | 1.5rem  | 24px           | Card padding, default gaps    |
| `spacing-8`  | `spacing-lg` | 2rem    | 32px           | Section spacing, large gaps   |
| `spacing-10` | -            | 2.5rem  | 40px           | Generous spacing              |
| `spacing-12` | `spacing-xl` | 3rem    | 48px           | Page margins, hero sections   |
| `spacing-16` | -            | 4rem    | 64px           | Large section spacing         |
| `spacing-20` | -            | 5rem    | 80px           | Extra large spacing           |
| `spacing-24` | -            | 6rem    | 96px           | Maximum spacing               |

## Usage Examples

### Padding

<div style="display: grid; gap: 2rem; margin-top: 2rem;">
  <div>
    <h4>Small Padding (spacing-sm)</h4>
    <div style="background: var(--color-surface-variant); padding: var(--spacing-sm); border-radius: var(--radius-base);">
      Content with small padding (1rem / 16px)
    </div>
  </div>

<div>
  <h4>Medium Padding (spacing-md)</h4>
  <div style="background: var(--color-surface-variant); padding: var(--spacing-md); border-radius: var(--radius-base);">
    Content with medium padding (1.5rem / 24px)
  </div>
</div>

  <div>
    <h4>Large Padding (spacing-lg)</h4>
    <div style="background: var(--color-surface-variant); padding: var(--spacing-lg); border-radius: var(--radius-base);">
      Content with large padding (2rem / 32px)
    </div>
  </div>
</div>

### Margin & Gap

<div style="margin-top: 2rem;">
  <h4>Flexbox Gap (spacing-md)</h4>
  <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        style="background: var(--color-primary-500); color: white; padding: var(--spacing-sm); border-radius: var(--radius-base);"
      >
        Item {i}
      </div>
    ))}
  </div>
</div>

### In Code

#### Tailwind Utilities (Arbitrary Values)

```vue
<template>
  <!-- Padding -->
  <div class="p-[--spacing-md]">Medium padding</div>

  <!-- Margin -->
  <div class="mt-[--spacing-lg]">Large top margin</div>

  <!-- Gap (Flexbox/Grid) -->
  <div class="flex gap-[--spacing-sm]">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</template>
```
````

#### CSS Variables

```vue
<template>
  <div :style="{ padding: 'var(--spacing-md)' }">Content</div>
</template>
```

#### useTokens Composable

```vue
<script setup>
import { useTokens } from '@/composables/useTokens';
const { spacing } = useTokens();
</script>

<template>
  <div :style="{ padding: spacing('MD') }">Content</div>
</template>
```

## Component Spacing Patterns

### Card

- Padding: `spacing-md` (24px)
- Gap between elements: `spacing-sm` (16px)

### Button

- Horizontal padding: `spacing-md` (24px)
- Vertical padding: `spacing-sm` (16px)
- Icon gap: `spacing-xs` (8px)

### Form Input

- Padding: `spacing-sm` (16px)
- Label margin: `spacing-xs` (8px)

### Section

- Top/bottom margin: `spacing-lg` or `spacing-xl` (32-48px)
- Content gap: `spacing-md` (24px)

## Best Practices

1. **Use semantic tokens**: Prefer `spacing-md` over `spacing-6` for clarity
2. **Maintain consistency**: Use the same spacing for similar elements
3. **Respect hierarchy**: Larger spacing for major sections, smaller for components
4. **Use rem units**: Respects user font-size preferences
5. **Follow base-8**: Stick to defined values, avoid arbitrary spacing

```

## Testing Requirements

- [ ] Verify spacing scale visualization renders correctly
- [ ] Test semantic token examples
- [ ] Check visual spacing representations
- [ ] Verify usage examples work
- [ ] Test in both light and dark Storybook themes
- [ ] Visual inspection of spacing consistency

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T028-spacing-story`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```
